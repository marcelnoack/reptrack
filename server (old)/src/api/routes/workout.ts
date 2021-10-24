import { Router } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/workouts', route);

  route.get('/', (req, res) => {
    console.log('Workouts GET');
    return res.json('Hi from Workouts').status(200);
  });
};
