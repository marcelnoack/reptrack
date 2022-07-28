import { QueryResult } from 'pg';

import { BaseDAO } from '../../common';
import { query } from '../../common/db';
import { Api500Error } from '../../common/errors';
import { WorkoutDTO, WorkoutInputDTO } from './workoutsAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class WorkoutsDao
  implements BaseDAO<WorkoutDTO, WorkoutInputDTO>
{
  /* ---------------------------------------------------------------------------------------------- */
  public async getAll(userId?: string): Promise<WorkoutDTO[]> {
    try {
      let queryTemplate = 'SELECT * FROM workouts where userid=$1';

      if (userId) {
        queryTemplate = 'SELECT * FROM workouts';
      }

      const result: QueryResult<any> = await query(queryTemplate, [userId]);

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
  public async getById(id: string): Promise<WorkoutDTO> {
    return Promise.resolve({
      userId: 0,
      workoutId: '',
      description: '',
      name: ''
    });
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async create(newResource: WorkoutInputDTO): Promise<void> {
    try {
      // Create Workout DB-Entry
    } catch (err) {
      throw new Api500Error('WorkoutsDao::createWorkout');
    }
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async delete(id: string): Promise<void> {
    return;
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async update(
    id: string,
    updatedResource: WorkoutInputDTO
  ): Promise<WorkoutDTO> {
    return Promise.resolve({
      userId: 0,
      workoutId: '',
      description: '',
      name: ''
    });
  }

  // /* ---------------------------------------------------------------------------------------------- */
  // public static async createExerciseInWorkout(
  //   workoutId: number,
  //   exercise: ExerciseDTO
  // ): Promise<any> {
  //   try {
  //     // Create Exercise DB-Entry
  //   } catch (err) {
  //     throw new Api500Error('WorkoutsDao::createExerciseInWorkout');
  //   }
  // }
}
