import { Router } from 'express';

import AuthController from '../../components/auth/authController';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post('/signin', AuthController.signIn);
  route.post("/signup", AuthController.signUp);
  route.post("/renew", AuthController.renew);
};
