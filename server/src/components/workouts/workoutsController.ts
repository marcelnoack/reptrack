import { NextFunction, Request, Response } from 'express';

import { UserDTO } from '../users/usersAPI';
import { WorkoutDTO, WorkoutInputDTO } from './workoutsAPI';
import WorkoutsService from './workoutsService';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class WorkoutsController {
  private _workoutsService: WorkoutsService;

  /* ---------------------------------------------------------------------------------------------- */
  constructor(workoutsService?: WorkoutsService) {
    if (!workoutsService) {
      this._workoutsService = new WorkoutsService();
    } else {
      this._workoutsService = workoutsService;
    }
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async getAllWorkouts(req: Request, res: Response, next: NextFunction) {
    // TODO: Correct user type
    const user: UserDTO = (req as any).token;

    try {
      const workouts: WorkoutDTO[] =
        await this._workoutsService.getAllWorkoutsByUser(user.userId);

      return res.status(200).send(workouts);
    } catch (err) {
      next(err);
    }
  }

  /* ---------------------------------------------------------------------------------------------- */
  // public static getWorkoutById(req: Request, res: Response) {}

  /* ---------------------------------------------------------------------------------------------- */
  public async createNewWorkout(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user: UserDTO = (req as any).token;
    const newWorkout: WorkoutInputDTO = req.body.workout;

    try {
      const workout: WorkoutDTO[] =
        await this._workoutsService.createNewWorkout(
          +user.userId,
          newWorkout,
          []
        );
    } catch (err) {
      next(err);
    }
  }
}
