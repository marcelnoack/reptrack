import { Router } from 'express';

import authRoute from './routes/authRoute';
import workoutsRoute from './routes/workoutsRoute';
import healthCheckRoute from './routes/healthCheckRoute';
import profileRoute from './routes/profileRoute';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default () => {
  const app = Router();

  authRoute(app);
  workoutsRoute(app);
  healthCheckRoute(app);
  profileRoute(app);

  return app;
};
