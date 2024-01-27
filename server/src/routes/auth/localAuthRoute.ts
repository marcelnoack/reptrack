import { Router } from 'express';
import passport from 'passport';
import cors from 'cors';

import AuthController from '../../components/auth/authController';
import { validateSignInCredentials, validateSignUp } from '../middleware';
import { corsDefaultHandler } from '../../utils';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/local', route);

  route.use(
    cors({
      origin: corsDefaultHandler,
      credentials: true
    })
  );

  const authController: AuthController = new AuthController();

  route.post('/signup', validateSignUp, authController.signUpLocal);
  route.post(
    '/login',
    validateSignInCredentials,
    passport.authenticate('local'),
    authController.signInLocal
  );
  route.post('/logout', authController.logout);
};
