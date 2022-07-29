import { Router } from 'express';

import { isAuth } from '../../common/middleware';
import WorkoutsController from '../../components/workouts/workoutsController';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/workouts', isAuth, route);

  const workoutsController: WorkoutsController = new WorkoutsController();
  route.get('/', workoutsController.getAllWorkouts);
  // route.get("/:id", WorkoutController.getWorkoutById);
  // route.post("/:id", WorkoutController.createNewWorkout); // TODO: body muss vollständiges workoutobjekt enthalten + exercises
};
