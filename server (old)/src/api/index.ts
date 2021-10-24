import { Router } from 'express';
import workout from './routes/workout';

export default () => {
  const app = Router();
  workout(app);

  return app;
};
