import { ExerciseInputDTO } from '../exercises/exerciseAPI';
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
  public getAllWorkoutsByUser = async (
    userId: string
  ): Promise<WorkoutDTO[]> => {
    return await this._workoutsDao.getAll(userId);
  };

  /* ---------------------------------------------------------------------------------------------- */
  public createNewWorkout = async (
    userId: number,
    workout: WorkoutInputDTO,
    exercises: ExerciseInputDTO[]
  ): Promise<any> => {
    // 1 Create the workout db-entry itself
    // 2 Create all the necessary db-entries for exercises in the workout
    // 3 Send correct http response message if successful
    // TODO:
    // Provide option to let the user add additional user-specific exercises if not provided by the application per default
    return null;
  };
}
