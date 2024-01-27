import { Router } from 'express';

import googleAuthRoute from './googleAuthRoute';
import localAuthRoute from './localAuthRoute';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  localAuthRoute(route);
  googleAuthRoute(route);
};
