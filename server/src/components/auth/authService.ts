import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Api401Error, Api404Error, Api500Error } from '../../common/errors';
import { Api400Error } from '../../common/errors/Api400Error';

import config from '../../config';
import { UserDTO, UserInputDTO } from '../users/usersAPI';
import UsersDao from '../users/usersDao';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export interface TokenObject {
  accessToken: string;
  refreshToken: string;
}

export default class AuthService {
  // TODO: Should be cached in Redis Cache
  private _refreshTokens: string[] = [];
  private _usersDao: UsersDao;

  /* ---------------------------------------------------------------------------------------------- */
  constructor(usersDao?: UsersDao) {
    if (!usersDao) {
      this._usersDao = new UsersDao();
    } else {
      this._usersDao = usersDao;
    }
  }

  public signUp = async (user: UserInputDTO): Promise<string> => {
    // generate hashed password for user
    const hashedPassword: string = await hash(user.password, 10);
    const newUser: UserInputDTO = {
      ...user,
      password: hashedPassword,
      createdBy: user.username,
      lastChangedBy: user.username
    };
    // call dao to create user
    const userId: string = await this._usersDao.create(newUser);
    return userId;
  };

  /* ---------------------------------------------------------------------------------------------- */
  public signIn = async (
    email: string,
    password: string
  ): Promise<TokenObject> => {
    const dbUser: UserDTO = await this._usersDao.getByUniqueProperty(
      'email',
      email
    );

    if (!dbUser) {
      throw new Api401Error('User Credentials are not correct');
    }

    if (!password || !dbUser.password) {
      throw new Api500Error('Something went wrong while trying to sign you in');
    }

    const isValidPassword = await compare(password, dbUser.password);

    if (!isValidPassword) {
      throw new Api401Error('User credentials are not correct');
    }

    //! Delete sensitive information like the password inside the auth tokens
    delete dbUser['password'];
    const accessToken: string = this._generateAccessToken(dbUser);
    const refreshToken: string = this._generateRefreshToken(dbUser);

    return { accessToken, refreshToken };
  };

  /* ---------------------------------------------------------------------------------------------- */
  public renewToken = async (refreshToken: string): Promise<TokenObject> => {
    if (!this._isValidRefreshToken(refreshToken)) {
      throw new Api400Error('Invalid refresh token');
    }

    const user: UserDTO = this._getUserInfoFromToken(refreshToken);
    const newAccessToken: string = this._generateAccessToken(user);
    const newRefreshToken: string = this._generateRefreshToken(user);
    this._removeRefreshToken(refreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  };

  /* ---------------------------------------------------------------------------------------------- */
  private _isValidRefreshToken = (refreshToken: string): boolean => {
    return this._refreshTokens.includes(refreshToken);
  };

  /* ---------------------------------------------------------------------------------------------- */
  private _getUserInfoFromToken = (token: string): UserDTO => {
    const payload: any = jwt.decode(token);
    delete payload['password'];
    delete payload['iat'];
    delete payload['exp'];
    return payload as UserDTO;
  };

  /* ---------------------------------------------------------------------------------------------- */
  public getRefreshTokens = (): string[] => {
    return this._refreshTokens;
  };

  /* ---------------------------------------------------------------------------------------------- */
  private _removeRefreshToken = (refreshToken: string): void => {
    this._refreshTokens = this._refreshTokens.filter(
      (rT) => rT !== refreshToken
    );
  };

  /* ---------------------------------------------------------------------------------------------- */
  private _generateAccessToken = (user: UserDTO): string => {
    return jwt.sign(user, config.accessTokenSecret, {
      expiresIn: `${config.accessTokenExpiration}m`
    });
  };

  /* ---------------------------------------------------------------------------------------------- */
  private _generateRefreshToken = (user: UserDTO): string => {
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, {
      expiresIn: `${config.refreshTokenExpiration}m`
    });

    // TODO: Should be cached in Redis Cache, currently only in-memory
    this._refreshTokens.push(refreshToken);
    return refreshToken;
  };
}
