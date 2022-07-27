import { Router } from 'express';

import { isAuth } from '../middlewares';
import WorkoutController from '../../components/workouts/workoutsController';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/workouts', isAuth, route);

  route.get('/', WorkoutController.getAllWorkouts);
  // route.get("/:id", WorkoutController.getWorkoutById);
  // route.post("/:id", WorkoutController.createNewWorkout);
};
