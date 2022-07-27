import { ExerciseInputDTO } from '../../interfaces/Exercise';
import { WorkoutDTO, WorkoutInputDTO } from './workoutsAPI';
import WorkoutsDao from './workoutsDao';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class WorkoutsService {
  /* ---------------------------------------------------------------------------------------------- */
  public static async getAllWorkoutsByUser(
    userId: number
  ): Promise<WorkoutDTO[]> {
    return await WorkoutsDao.getAllWorkoutsByUser(userId);
  }

  /* ---------------------------------------------------------------------------------------------- */
  public static async createNewWorkout(
    userId: number,
    workout: WorkoutInputDTO,
    exercises: ExerciseInputDTO[]
  ): Promise<any> {
    // 1 Create the workout db-entry itself
    // 2 Create all the necessary db-entries for exercises in the workout
    // 3 Send correct http response message if successful
    // TODO:
    // Provide option to let the user add additional user-specific exercises if not provided by the application per default
    return null;
  }
}
