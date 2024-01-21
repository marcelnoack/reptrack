import { NextFunction, Request, Response } from 'express';

import { SupportedHttpStatusCodes } from '../../common';
import { Api500Error } from '../../common/errors';
import { UserInputDTO } from '../users/usersAPI';
import AuthService from './authService';

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

      const newUserId: string = await this._authService.signUp(user);
      res
        .set('Location', `/v1/users/${newUserId}`)
        .status(SupportedHttpStatusCodes.CREATED)
        .send({});
    } catch (err) {
      next(err);
    }
  };

  public logout = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
      if (err) throw new Api500Error('Something went wrong while logging out');

      res
        .clearCookie('connect.sid')
        .status(SupportedHttpStatusCodes.NO_CONTENT)
        .send();
    });
  };
}
