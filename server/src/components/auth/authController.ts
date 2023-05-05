import { NextFunction, Request, Response } from 'express';

import { SupportedHttpStatusCodes } from '../../common';
import { Api400Error } from '../../common/errors/Api400Error';
import config from '../../config';
import { UserInputDTO } from '../users/usersAPI';
import AuthService, { TokenObject } from './authService';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class AuthController {
  private _authService: AuthService;

  /* ---------------------------------------------------------------------------------------------- */
  constructor(authService?: AuthService) {
    if (!authService) {
      this._authService = new AuthService();
    } else {
      this._authService = authService;
    }
  }

  /* ---------------------------------------------------------------------------------------------- */
  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body.user;

      const tokenObject: TokenObject = await this._authService.signIn(
        email,
        password
      );
      const cookie = JSON.stringify({
        httponly: true,
        samesite: 'None',
        maxage: config.accessTokenExpiration,
        jwt: tokenObject.accessToken
      });

      res.cookie('token', tokenObject.accessToken, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        // maxAge: config.accessTokenExpiration?.toString() || "",
        path: '/'
      });
      // res.set("set-cookie", "token=" + tokenObject.accessToken + ";Path=/;" + "HttpOnly; SameSite=None; Secure");
      res.set('X-CSRF-Token', tokenObject.csrfToken);
      return res.status(SupportedHttpStatusCodes.OK).send({});
      // return res.json(tokenObject);
    } catch (err) {
      next(err);
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, firstName, lastName, password } = req.body.user;
      const user: UserInputDTO = {
        username,
        email,
        firstName,
        lastName,
        password
      };

      const newUserId: string = await this._authService.signUp(user);
      res
        .set('Location', `/v1/users/${newUserId}`)
        .status(SupportedHttpStatusCodes.CREATED)
        .send({});
    } catch (err) {
      next(err);
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  public renew = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken: string = req.body.refreshToken;
      if (!refreshToken) {
        throw new Api400Error('No refresh token was provided');
      }

      const newToken: TokenObject = await this._authService.renewToken(
        refreshToken
      );
      return res.json(newToken);
    } catch (err) {
      next(err);
    }
  };
}
