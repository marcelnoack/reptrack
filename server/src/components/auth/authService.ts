import { compare, hash } from 'bcryptjs';
import { Profile } from 'passport';
import nodemailer from 'nodemailer';

import { Logger } from '../../common';
import { Language } from '../../common/i18n';
import { Api400Error, Api401Error, Api500Error } from '../../common/errors';
import {
  GENERAL_GOOGLE_SIGN_IN_ERROR,
  GENERAL_SIGN_IN_ERROR,
  INCORRECT_USER_CREDENTIALS,
  INVALID_EMAIL_VERIFICATION_CODE
} from '../../common/i18n/errors';
import config from '../../config';
import { UserDTO, UserInputDTO } from '../users/usersAPI';
import UsersDao from '../users/usersDao';
import { generateVerificationCode } from '../../utils';
import { UserVerificationDTO } from './authAPI';
import { EmailVerifyDao } from './emailVerifyDao';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class AuthService {
  private _usersDao: UsersDao;
  private _emailVerifyDao: EmailVerifyDao;

  /* ---------------------------------------------------------------------------------------------- */
  constructor(usersDao?: UsersDao) {
    if (!usersDao) {
      this._usersDao = new UsersDao();
    } else {
      this._usersDao = usersDao;
    }

    this._emailVerifyDao = new EmailVerifyDao();
  }

  public signUp = async (
    user: UserInputDTO,
    language: Language
  ): Promise<string> => {
    // generate hashed password for user
    const hashedPassword: string = await hash(user.password ?? '', 10);
    const newUser: UserInputDTO = {
      ...user,
      password: hashedPassword,
      createdBy: user.email,
      lastChangedBy: user.email
    };
    // call dao to create user
    const createdUser: UserDTO = await this._usersDao.create(newUser);

    // create 6-digit email verification code
    const newEmailVerificationCode: string = generateVerificationCode();

    const newEmailVerificationToken: UserVerificationDTO = {
      userId: createdUser.userId,
      emailVerificationToken: newEmailVerificationCode,
      emailVerificationTokenExpiresAt: new Date(
        Date.now() + 30 * 60 * 1000 // 30 minutes
      )
    };

    // store the token in the database
    await this._emailVerifyDao.create(newEmailVerificationToken);

    // use nodemailer to send hashedEmailVerificationToken to users email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.noReplyGmailAppEmail,
        pass: config.noReplyGmailAppPass
      }
    });

    const info = await transporter.sendMail({
      from: `"Reptrack" <${config.noReplyGmailAppEmail}>`,
      to: user.email,
      subject: 'Verify your email',
      text: 'Click the link to verify your email',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Confirm Your Email Address</title>
        </head>
        <body>
          <p>Hi ${createdUser.firstName},</p>
          <p>Thank you for signing up with Reptrack. To complete your registration, please click on the following link to verify your email address:</p>
          <p>
            <a href="${config.clientUrl}/email-verification?code=${newEmailVerificationToken.emailVerificationToken}">
            Verify Email
            </a>      
          </p>
          <p>If you did not sign up for Reptrack, please ignore this email.</p>
          <p>Thank you,<br>
          Reptrack Team</p>
        </body>
        </html>
      `
    });

    Logger.info(`Email sent: ${info.messageId}`);

    return createdUser.userId;
  };

  /* ---------------------------------------------------------------------------------------------- */
  public signInLocal = async (
    email: string,
    password: string
  ): Promise<UserDTO> => {
    const dbUser: UserDTO[] | undefined =
      await this._usersDao.getByUniqueProperty('email', email, 'en');

    if (!dbUser) {
      throw new Api401Error(INCORRECT_USER_CREDENTIALS);
    }

    if (!password || !dbUser[0].password) {
      throw new Api500Error(GENERAL_SIGN_IN_ERROR);
    }

    const isValidPassword = await compare(password, dbUser[0].password);

    if (!isValidPassword) {
      throw new Api401Error(INCORRECT_USER_CREDENTIALS);
    }

    //! Delete sensitive information like the password inside the auth tokens
    delete dbUser[0]['password'];
    return dbUser[0];
  };

  /* ---------------------------------------------------------------------------------------------- */
  public authenticateGoogle = async (
    profile: Profile
  ): Promise<UserDTO | undefined> => {
    const { emails, name, photos, displayName, id } = profile;

    if (!emails?.length || !photos?.length) {
      throw new Api500Error(GENERAL_GOOGLE_SIGN_IN_ERROR);
    }

    const dbUser: UserDTO[] | undefined =
      await this._usersDao.getByUniqueProperty('email', emails[0].value, 'en');

    if (dbUser && dbUser[0] && dbUser[0].provider) {
      return dbUser[0];
    }

    const userInputDTO: UserInputDTO = {
      email: emails[0].value,
      firstName: name?.givenName ?? '',
      middleName: name?.middleName,
      lastName: name?.familyName ?? '',
      provider: {
        providerName: 'google',
        googleId: id,
        picture: photos[0].value,
        displayName: displayName
      }
    };

    return await this._usersDao.create(userInputDTO);
  };

  /* ---------------------------------------------------------------------------------------------- */
  public verifyEmail = async (code: string): Promise<void> => {
    // validate the code to be a 6-digit number
    if (!/^\d{6}$/.test(code)) {
      throw new Api400Error(INVALID_EMAIL_VERIFICATION_CODE);
    }

    // call dao to get token
    const verifyCode = await this._emailVerifyDao.getByUniqueProperty(
      'token',
      code,
      'en'
    );

    console.log('token', code, verifyCode);
    if (!verifyCode?.length || verifyCode?.length > 1) {
      // reason token not found
      throw new Api400Error(INVALID_EMAIL_VERIFICATION_CODE);
    }

    if (verifyCode[0].emailVerificationTokenExpiresAt < new Date(Date.now())) {
      // reason token expired
      throw new Api400Error(INVALID_EMAIL_VERIFICATION_CODE);
    }

    // activate user
    await this._usersDao.update(verifyCode[0].userId, { active: true });

    // delete user verify token(s)
    await this._emailVerifyDao.delete(verifyCode[0].userId);

    return;
  };

  /* ---------------------------------------------------------------------------------------------- */
  public resendVerificationEmail = async (
    email: string,
    language: Language
  ): Promise<void> => {
    const dbUser: UserDTO[] | undefined =
      await this._usersDao.getByUniqueProperty('email', email, language);

    if (!dbUser || !dbUser[0] || dbUser[0].active) {
      // using general error message for security reasons
      throw new Api400Error('Error during email verification retry');
    }

    const verifyToken = await this._emailVerifyDao.getByUniqueProperty(
      'userid',
      dbUser[0].userId,
      language
    );

    if (!verifyToken || verifyToken.length === 0) {
      // using general error message for security reasons
      throw new Api400Error('Error during email verification retry');
    }

    const newEmailVerificationCode: string = generateVerificationCode();
    const newVerifyToken: UserVerificationDTO = {
      userId: dbUser[0].userId,
      emailVerificationToken: newEmailVerificationCode,
      emailVerificationTokenExpiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
    };

    await this._emailVerifyDao.update(dbUser[0].userId, newVerifyToken);

    // use nodemailer to send hashedEmailVerificationToken to users email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.noReplyGmailAppEmail,
        pass: config.noReplyGmailAppPass
      }
    });

    const info = await transporter.sendMail({
      from: `"Reptrack" <${config.noReplyGmailAppEmail}>`,
      to: dbUser[0].email,
      subject: 'Verify your email',
      text: 'Click the link to verify your email',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Confirm Your Email Address</title>
        </head>
        <body>
          <p>Hi ${dbUser[0].firstName},</p>
          <p>Thank you for signing up with Reptrack. To complete your registration, please click on the following link to verify your email address:</p>
          <p>
            <a href="${config.clientUrl}/auth/email-verification?code=${newVerifyToken.emailVerificationToken}">
            Verify Email
            </a>      
          </p>
          <p>If you did not sign up for Reptrack, please ignore this email.</p>
          <p>Thank you,<br>
          Reptrack Team</p>
        </body>
        </html>
      `
    });

    Logger.info(`Email sent: ${info.messageId}`);

    return;
  };

  /* ---------------------------------------------------------------------------------------------- */
  public fetchUserById = async (userId: string): Promise<UserDTO> => {
    const dbUser: UserDTO = await this._usersDao.getById(userId);

    return dbUser;
  };
}
