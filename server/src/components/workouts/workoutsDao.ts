import { QueryResult } from 'pg';

import { BaseDAO } from '../../common';
import { query } from '../../common/db';
import { Api500Error } from '../../common/errors';
import {
  ExerciseInWorkoutDTO,
  WorkoutDTO,
  WorkoutInputDTO,
  WorkoutRelatedEntities
} from './workoutsAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class WorkoutsDao
  implements BaseDAO<WorkoutDTO, WorkoutInputDTO, WorkoutRelatedEntities>
{
  /* ---------------------------------------------------------------------------------------------- */
  public getAll = async (
    userId: string,
    language = 'en'
  ): Promise<WorkoutDTO[]> => {
    try {
      let result: QueryResult<any>;

      if (!userId) {
        result = await query('SELECT * FROM workout');
      } else {
        result = await query('SELECT * FROM workout where userid=$1', [userId]);
      }

      if (!result || !result.rows || !result.rows.length) {
        return [];
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

      let wExercises: ExerciseInWorkoutDTO[] = [];
      for (const workout of workouts) {
        wExercises = await this._getRelatedExercises(
          workout.workoutId,
          language
        );
        workout.exercises = [...wExercises];
      }

      return workouts;
    } catch (err) {
      throw new Api500Error('Something went wrong while getting the workouts');
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  public async getById(
    id: string,
    language = 'en'
  ): Promise<WorkoutDTO | undefined> {
    const result: QueryResult<any> = await query(
      'SELECT * FROM workout WHERE workoutid = $1',
      [id]
    );

    if (!result || !result.rows || !result.rows.length) {
      return Promise.resolve(undefined);
    }

    const relatedExercises: ExerciseInWorkoutDTO[] =
      await this._getRelatedExercises(result.rows[0].workoutid, language);

    const workouts: WorkoutDTO[] = result.rows.map((row) => ({
      workoutId: row.workoutid,
      name: row.name,
      description: row.description,
      userId: row.userid,
      createdAt: row.createdat,
      createdBy: row.createdby,
      lastChangedAt: row.lastchangedat,
      lastChangedBy: row.lastchangedby,
      exercises: relatedExercises.map((e) => ({
        exerciseId: e.exerciseId,
        name: e.name,
        targetSetCount: e.targetSetCount,
        targetRepCount: e.targetRepCount
      }))
    }));

    return Promise.resolve(workouts[0]);
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async create(newResource: WorkoutInputDTO): Promise<WorkoutDTO> {
    const { name, description, userId, createdBy, lastChangedBy, exercises } =
      newResource;
    const creationResult: QueryResult<any> = await query(
      `INSERT INTO workout (name, description, userid, createdby, lastchangedby, createdat, lastchangedat) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
      [name, description, userId, createdBy, lastChangedBy]
    );

    if (creationResult.rowCount !== 1) {
      throw new Api500Error(
        'Something went wrong while creating a new workout'
      );
    }

    await Promise.all(
      exercises.map((exercise) =>
        this._createExerciseInWorkout(
          creationResult.rows[0].workoutid,
          exercise
        )
      )
    );

    return creationResult.rows[0];
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
      userId: '',
      workoutId: '',
      description: '',
      name: ''
    });
  }

  /* ---------------------------------------------------------------------------------------------- */
  public getRelated = async (
    relatedEntity: WorkoutRelatedEntities,
    id: string,
    language = 'en'
  ): Promise<any[]> => {
    try {
      if (relatedEntity === 'exercises') {
        const workoutExercises: ExerciseInWorkoutDTO[] =
          await this._getRelatedExercises(id, language);

        return workoutExercises;
      }

      if (relatedEntity === 'trainings') {
        throw new Api500Error('Trainings are not supported yet');
      }

      return [];
    } catch (err) {
      throw new Api500Error(
        'An unexpected error occured while getting a workouts related entities'
      );
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  private _getRelatedExercises = async (
    workoutId: string,
    language = 'en'
  ): Promise<ExerciseInWorkoutDTO[]> => {
    try {
      const exerciseResults = await query(
        `SELECT et.exerciseid, et.name, ew.workoutid, ew.targetsetcount, ew.targetrepcount
        FROM exerciseinworkout as ew
        JOIN exercisetranslation as et
        ON ew.exerciseid = et.exerciseid
        WHERE ew.workoutid = $1
        AND et.language = $2`,
        [workoutId, language]
      );

      const exercises: ExerciseInWorkoutDTO[] = exerciseResults.rows.map(
        (eRow) => ({
          workoutId: eRow.workoutid,
          exerciseId: eRow.exerciseid,
          name: eRow.name,
          targetSetCount: eRow.targetsetcount,
          targetRepCount: eRow.targetrepcount
        })
      );

      return exercises;
    } catch (err) {
      throw new Api500Error(
        'Something went wrong while get the related exercises'
      );
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  private _createExerciseInWorkout = async (
    workoutId: string,
    exercise: ExerciseInWorkoutDTO
  ): Promise<void> => {
    const { exerciseId, targetSetCount, targetRepCount } = exercise;

    try {
      const creationResult = await query(
        `
          INSERT INTO exerciseinworkout (workoutid, exerciseid, targetsetcount, targetrepcount) VALUES ($1, $2, $3, $4)
        `,
        [workoutId, exerciseId, targetSetCount, targetRepCount]
      );

      if (creationResult.rowCount !== 1) {
        throw new Api500Error(
          'Something went wrong while attaching an exercise to a workout'
        );
      }
      return;
    } catch (err) {
      throw new Api500Error(
        'Something wen wrong while attaching an exercise to a workout'
      );
    }
  };
}
