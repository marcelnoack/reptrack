import { NextFunction, Request, Response } from 'express';

import { SupportedHttpStatusCodes } from '../../common';
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
  public getAllWorkouts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user: UserDTO = (req as any).user;
    // const language: string | undefined = req.headers['accept-language']; // TODO

    try {
      const workouts: WorkoutDTO[] = await this._workoutsService.getAllWorkouts(
        user.userId,
        'en'
      );

      return res.status(SupportedHttpStatusCodes.OK).send(workouts);
    } catch (err) {
      next(err);
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  public getWorkoutById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user: UserDTO = (req as any).user;
    const workoutId: string = req.params.id;
    // const language: string | undefined = req.headers['accept-language']; // TODO

    try {
      const workout: WorkoutDTO = await this._workoutsService.getWorkoutById(
        user.userId,
        workoutId,
        'en'
      );

      return res.status(SupportedHttpStatusCodes.OK).send(workout);
    } catch (err) {
      next(err);
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  public createNewWorkout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user: UserDTO = (req as any).user;
    const newWorkout: WorkoutInputDTO = {
      ...req.body.workout
    };

    try {
      const newWorkoutId: string = await this._workoutsService.createNewWorkout(
        user,
        newWorkout
      );

      res
        .setHeader('Location', `/v1/workouts/${newWorkoutId}`)
        .sendStatus(SupportedHttpStatusCodes.CREATED);
    } catch (err) {
      next(err);
    }
  };
}
