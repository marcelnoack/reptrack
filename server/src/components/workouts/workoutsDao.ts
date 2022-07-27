import { QueryResult } from 'pg';
import { Api500Error } from '../../common/Api500Error';

import { query } from '../../db';
import { ExerciseDTO } from '../../interfaces/Exercise';
import { WorkoutDTO, WorkoutInputDTO } from './workoutsAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class WorkoutsDao {
  /* ---------------------------------------------------------------------------------------------- */
  public static async getAllWorkoutsByUser(
    userId: number
  ): Promise<WorkoutDTO[]> {
    try {
      const result: QueryResult<any> = await query(
        'SELECT * FROM workouts where userid=$1',
        [userId]
      );

      if (!result || !result.rows || !result.rows.length) {
        return Promise.resolve([]);
      }

      const workouts: WorkoutDTO[] = result.rows.map((row) => ({
        workoutId: row.workoutid,
        name: row.name,
        description: row.description,
        userId: row.userid,
        createdAt: row.createdat,
        createdBy: row.createdby,
        lastChangedAt: row.lastchangedat,
        lastChangedBy: row.lastchangedby,
        exercises: []
      }));

      return Promise.resolve(workouts);
    } catch (err) {
      throw new Api500Error('WorkoutsDao::getAllWorkoutsByUser');
    }
  }

  /* ---------------------------------------------------------------------------------------------- */
  public static async createWorkout(
    userId: number,
    workout: WorkoutInputDTO
  ): Promise<any> {
    try {
      // Create Workout DB-Entry
    } catch (err) {
      throw new Api500Error('WorkoutsDao::createWorkout');
    }
  }

  /* ---------------------------------------------------------------------------------------------- */
  public static async createExerciseInWorkout(
    workoutId: number,
    exercise: ExerciseDTO
  ): Promise<any> {
    try {
      // Create Exercise DB-Entry
    } catch (err) {
      throw new Api500Error('WorkoutsDao::createExerciseInWorkout');
    }
  }
}
