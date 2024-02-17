import { compare, genSaltSync, hash, hashSync } from 'bcryptjs';
import { Profile } from 'passport';
import nodemailer from 'nodemailer';

import { Api401Error, Api500Error } from '../../common/errors';
import {
  GENERAL_GOOGLE_SIGN_IN_ERROR,
  GENERAL_SIGN_IN_ERROR,
  INCORRECT_USER_CREDENTIALS
} from '../../common/i18n/errors';
import { UserDTO, UserInputDTO } from '../users/usersAPI';
import UsersDao from '../users/usersDao';
import config from '../../config';
import { Logger } from '../../common';
import { UserVerificationDTO } from './authAPI';
import { EmailVerifyDao } from './emailVerifyDao';
import { Language } from '../../common/i18n';

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

    // hash for email verification
    const hashedEmailVerificationToken: string = hashSync(
      (config.emailVerifyTokenSecret || '') + createdUser.userId,
      genSaltSync(10)
    );

    const newEmailVerificationToken: UserVerificationDTO = {
      userId: createdUser.userId,
      emailVerificationToken: hashedEmailVerificationToken,
      emailVerificationTokenExpiresAt: new Date(
        Date.now() + 60 * 60 * 1000 // 1 hour
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
            <a href="${config.host}/${
        config.api.prefix
      }/auth/local/email-verification/${encodeURIComponent(
        newEmailVerificationToken.emailVerificationToken
      )}">
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
  public verifyEmail = async (token: string): Promise<void> => {
    // call dao to get token
    const verifyToken = await this._emailVerifyDao.getByUniqueProperty(
      'token',
      token,
      'en'
    );

    if (!verifyToken?.length || verifyToken?.length > 1) {
      throw new Api401Error('No token found');
    }

    if (verifyToken[0].emailVerificationTokenExpiresAt < new Date(Date.now())) {
      throw new Api401Error('Token expired');
    }

    // activate user
    await this._usersDao.update(verifyToken[0].userId, { active: true });

    // delete user verify token(s)
    await this._emailVerifyDao.delete(verifyToken[0].userId);

    return;
  };
}
