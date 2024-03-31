import { Router } from 'express';
import passport from 'passport';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

import AuthController from '../../components/auth/authController';
import { corsDefaultHandler } from '../../utils';
import {
  validateSignInCredentials,
  validateSignUp,
  isAuth
} from '../middleware';

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

  route.post(
    '/verify-email',
    isAuth,
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 5,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message: 'Cannot send any more requests'
    }),
    authController.verifyEmail
  );

  // in pure REST it could be a PUT request for the token resource
  // but for simplicity we are using a POST request to trigger the resend
  route.post(
    '/resend-verification-email',
    isAuth,
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 2,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message: 'Cannot send any more requests'
    }),
    authController.resendVerificationEmail
  );
};
