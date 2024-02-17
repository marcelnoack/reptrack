import { NextFunction, Request, Response } from 'express';

import { SupportedHttpStatusCodes } from '../../common';
import { UserInputDTO } from '../users/usersAPI';
import AuthService from './authService';
import { Language } from '../../common/i18n';

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
  public signInLocal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.status(SupportedHttpStatusCodes.OK).send({});
    } catch (err) {
      next(err);
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  public signUpLocal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        email,
        firstName,
        middleName = '',
        lastName,
        password
      } = req.body.user;
      const user: UserInputDTO = {
        email,
        firstName,
        middleName,
        lastName,
        password
      };

      const newUserId: string = await this._authService.signUp(
        user,
        req.language as Language
      );
      res
        .set('Location', `/v1/users/${newUserId}`)
        .status(SupportedHttpStatusCodes.CREATED)
        .send({});
    } catch (err) {
      next(err);
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  public verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.params;
      await this._authService.verifyEmail(decodeURIComponent(token));

      return res.redirect(`${process.env.CLIENT_URL}?verified=true`);
    } catch (err) {
      next(err);
    }
  };
}
