import { Router } from 'express';

import authRoute from './routes/authRoute';
import workoutsRoute from './routes/workoutsRoute';
import healthCheckRoute from './routes/healthCheckRoute';
// import usersRoute from './routes/usersRoute';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default () => {
  const app = Router();

  authRoute(app);
  workoutsRoute(app);
  healthCheckRoute(app);
  // usersRoute(app);

  return app;
};
