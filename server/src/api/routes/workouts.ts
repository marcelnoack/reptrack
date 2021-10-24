import { Router } from 'express';
import Logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
  app.use('/workouts', route);

  route.get('/', (req, res) => {
    Logger.info('Workouts GET');
    return res.status(200).send('Hi from Workouts');
  });
};
