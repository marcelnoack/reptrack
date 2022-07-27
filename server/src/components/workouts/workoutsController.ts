import { NextFunction, Request, Response } from 'express';

import { UserDTO } from '../../interfaces/User';
import Logger from '../../loaders/logger';
import { WorkoutDTO, WorkoutInputDTO } from './workoutsAPI';
import WorkoutsService from './workoutsService';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class WorkoutsController {
  /* ---------------------------------------------------------------------------------------------- */
  public static async getAllWorkouts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // TODO: Correct user type
    const user: UserDTO = (req as any).token;

    try {
      const workouts: WorkoutDTO[] = await WorkoutsService.getAllWorkoutsByUser(
        user.userId
      );
      return res.status(200).send(workouts);
    } catch (err) {
      next(err);
    }
  }

  /* ---------------------------------------------------------------------------------------------- */
  // public static getWorkoutById(req: Request, res: Response) {}

  /* ---------------------------------------------------------------------------------------------- */
  public static async createNewWorkout(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user: UserDTO = (req as any).token;
    const newWorkout: WorkoutInputDTO = req.body.workout;

    try {
      const workout: WorkoutDTO[] = await WorkoutsService.createNewWorkout(
        user.userId,
        newWorkout,
        []
      );
    } catch (err) {
      next(err);
    }
  }
}
