import { Router } from 'express';

import AuthController from '../../components/auth/authController';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const authController: AuthController = new AuthController();
  route.post('/signin', authController.signIn); // TODO: body muss user mit username + password enthalten
  route.post('/signup', authController.signUp); // TODO: body muss vollständiges nutzerobjekt enthalten (+password richtlinie)
  route.post('/renew', authController.renew); // TODO: body muss refreshToken als string enthalten
};
