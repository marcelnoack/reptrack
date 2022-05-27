import { Router } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/workouts', route);

  route.get('/', (req, res) => {
    return res.status(200).send('Hi from Workouts');
  });

  route.get("/:id", (req,res) => {
    return res.status(200).send("Hi from a Workout");
  });
};
