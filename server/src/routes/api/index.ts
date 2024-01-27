import { Router } from 'express';
import cors from 'cors';

import { corsDefaultHandler } from '../../utils';
import { isAuth } from '../middleware';
import healthCheckRoute from './healthCheckRoute';
import profileRoute from './profileRoute';
import workoutsRoute from './workoutsRoute';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/api', route);

  route.use(
    cors({
      origin: corsDefaultHandler,
      credentials: true
    })
    // isAuth
  );

  healthCheckRoute(route);
  profileRoute(route);
  workoutsRoute(route);
};
