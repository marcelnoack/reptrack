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

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const authController: AuthController = new AuthController();
  route.post('/signup', validateSignUp, authController.signUpLocal);
  route.post(
    '/login',
    validateSignInCredentials,
    passport.authenticate('local'),
    authController.signInLocal
  );
  route.post('/logout', authController.logout);

  route.get(
    '/google/login',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  route.get(
    '/google/callback',
    passport.authenticate('google', {
      successRedirect: config.clientUrl,
      failureRedirect: `/${config.api.prefix}/auth/google/callback/failure` // TODO: also redirect to client but with error code
    })
  );

  route.get('/google/callback/failure', isAuth, (req, res) => {
    res.status(401).send(GENERAL_GOOGLE_SIGN_IN_ERROR);
  });
};
