import { NextFunction, Request, Response } from 'express';
import { SupportedHttpStatusCodes } from '../../common';
import { Api400Error } from '../../common/errors/Api400Error';
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
      return res.json(tokenObject);
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
        .setHeader('Location', `/v1/users/${newUserId}`)
        .sendStatus(SupportedHttpStatusCodes.CREATED);
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
