import { NextFunction, Request, Response } from 'express';

import { SupportedHttpStatusCodes } from '../../common';
import { Language } from '../../common/i18n';
import { Api500Error } from '../../common/errors';
import { UserDTO, UserInputDTO } from '../users/usersAPI';
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
      const { code } = req.body;

      await this._authService.verifyEmail(code);

      // refetch user and attach to request
      const updatedUser = await this._authService.fetchUserById(
        (req.user as any)?.userId
      );
      req.login(updatedUser, (err) => {
        if (err) {
          throw new Api500Error('There was an error updating your account');
        }

        res.status(SupportedHttpStatusCodes.OK).send();
      });
    } catch (err) {
      next(err);
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  public resendVerificationEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.user as UserDTO;
      await this._authService.resendVerificationEmail(
        email,
        req.language as Language
      );

      return res.status(SupportedHttpStatusCodes.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };
}
