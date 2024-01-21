import { Api403Error, Api404Error } from '../../common/errors';
import {
  GENERAL_PERMISSION_ERROR,
  GENERAL_RESOURCE_NOT_FOUND_ERROR
} from '../../common/i18n/errors';
import { UserDTO } from '../users/usersAPI';
import { WorkoutDTO, WorkoutInputDTO } from './workoutsAPI';
import WorkoutsDao from './workoutsDao';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class WorkoutsService {
  private _workoutsDao: WorkoutsDao;

  /* ---------------------------------------------------------------------------------------------- */
  constructor(workoutsDao?: WorkoutsDao) {
    if (!workoutsDao) {
      this._workoutsDao = new WorkoutsDao();
    } else {
      this._workoutsDao = workoutsDao;
    }
  }

  /* ---------------------------------------------------------------------------------------------- */
  public getAllWorkouts = async (
    userId: string,
    language = 'en'
  ): Promise<WorkoutDTO[]> => {
    return await this._workoutsDao.getAll(userId, language);
  };

  /* ---------------------------------------------------------------------------------------------- */
  public getWorkoutById = async (
    userId: string,
    workoutId: string,
    language = 'en'
  ): Promise<WorkoutDTO> => {
    const workout: WorkoutDTO | undefined = await this._workoutsDao.getById(
      workoutId,
      language
    );

    if (!workout) {
      throw new Api404Error(GENERAL_RESOURCE_NOT_FOUND_ERROR);
    }

    if (workout.userId !== userId) {
      throw new Api403Error(GENERAL_PERMISSION_ERROR);
    }

    return workout;
  };

  /* ---------------------------------------------------------------------------------------------- */
  public createNewWorkout = async (
    user: UserDTO,
    workout: WorkoutInputDTO
  ): Promise<string> => {
    // TODO: Provide option to let the user add additional user-specific exercises if not provided by the application per default
    // return await this._workoutsDao.create({
    //   ...workout,
    //   userId: user.userId,
    //   createdBy: user.email,
    //   lastChangedBy: user.email
    // });

    return '';
  };
}
