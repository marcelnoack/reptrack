import { Router } from 'express';

import {
  validateRenewToken,
  validateSignInCredentials,
  validateSignUp
} from '../middleware';
import AuthController from '../../components/auth/authController';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const authController: AuthController = new AuthController();
  route.post('/signin', validateSignInCredentials, authController.signIn);
  route.post('/signup', validateSignUp, authController.signUp);
  // route.post('/renew', validateRenewToken, authController.renew);
};
