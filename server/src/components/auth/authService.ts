import jwt from 'jsonwebtoken';

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

  public async signUp(user: UserInputDTO) {
    // generate hashed password for user
    // call dao to create user
    // Optional: SignIn the user
  }

  /* ---------------------------------------------------------------------------------------------- */
  public signIn(user: UserDTO): TokenObject {
    const accessToken: string = this._generateAccessToken(user);
    const refreshToken: string = this._generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  /* ---------------------------------------------------------------------------------------------- */
  public getRefreshTokens(): string[] {
    return this._refreshTokens;
  }

  /* ---------------------------------------------------------------------------------------------- */
  public removeRefreshToken(refreshToken: string): void {
    this._refreshTokens = this._refreshTokens.filter(
      (rT) => rT !== refreshToken
    );
  }

  /* ---------------------------------------------------------------------------------------------- */
  public getUserInfoFromToken(token: string): UserDTO {
    const payload: any = jwt.decode(token);
    delete payload['iat'];
    delete payload['exp'];
    return payload as UserDTO;
  }

  /* ---------------------------------------------------------------------------------------------- */
  private _generateAccessToken(user: UserDTO): string {
    return jwt.sign(user, config.accessTokenSecret, {
      expiresIn: `${config.accessTokenExpiration}m`
    });
  }

  /* ---------------------------------------------------------------------------------------------- */
  private _generateRefreshToken(user: UserDTO): string {
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, {
      expiresIn: `${config.refreshTokenExpiration}m`
    });

    // TODO: Should be cached in Redis Cache
    this._refreshTokens.push(refreshToken);
    return refreshToken;
  }
}
