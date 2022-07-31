import { Router } from 'express';

import { isAuth, validateWorkoutId } from '../middleware';
import WorkoutsController from '../../components/workouts/workoutsController';
import { validateNewWorkout } from '../middleware/workouts';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/workouts', isAuth, route);

  const workoutsController: WorkoutsController = new WorkoutsController();
  route.get('/', workoutsController.getAllWorkouts);
  route.post('/', validateNewWorkout, workoutsController.createNewWorkout);
  route.get('/:id', validateWorkoutId, workoutsController.getWorkoutById);
  // TODO: returns a workouts exercises array(eid, name in language default english, targetRepCount, targetSetCount)
  // route.get("/:id/exercises", workoutsController.getWorkoutExercises);
};
