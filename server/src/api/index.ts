import { Router } from 'express';

import workoutsRoute from './routes/workouts';

export default () => {
  const app = Router();

  workoutsRoute(app);

  return app;
};
