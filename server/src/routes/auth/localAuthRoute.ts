import { Router } from 'express';
import passport from 'passport';

import { GENERAL_GOOGLE_SIGN_IN_ERROR } from '../../common/i18n/errors';
import AuthController from '../../components/auth/authController';
import config from '../../config';
import {
  isAuth,
  validateSignInCredentials,
  validateSignUp
} from '../middleware';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default (app: Router) => {
  const authController: AuthController = new AuthController();

  app.post('/signup', validateSignUp, authController.signUpLocal);
  app.post(
    '/login',
    validateSignInCredentials,
    passport.authenticate('local'),
    authController.signInLocal
  );
  app.post('/logout', authController.logout);
};
