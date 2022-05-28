import { Router } from 'express';

import authRoute from './routes/auth';
import workoutsRoute from './routes/workouts';
import usersRoute from './routes/users';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default () => {
  const app = Router();

  authRoute(app);
  workoutsRoute(app);
  usersRoute(app);

  return app;
};
