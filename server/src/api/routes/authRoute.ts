import { Router } from 'express';

import AuthController from '../../components/auth/authController';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const authController: AuthController = new AuthController();
  route.post('/signin', authController.signIn);
  route.post('/signup', authController.signUp);
  route.post('/renew', authController.renew);
};
