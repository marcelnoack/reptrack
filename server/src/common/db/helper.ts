import { QueryResult } from 'pg';

import { query } from '.';
import { Logger } from '..';
import { Api500Error } from '../errors';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export enum TableTypes {
  Managed = 'managed',
  Language = 'language',
  Exercise = 'exercise',
  ExerciseTranslation = 'exercisetranslation',
  MuscleGroup = 'musclegroup',
  MuscleGroupTranslation = 'musclegrouptranslation',
  MuscleGroupInExercise = 'musclegroupinexercise',
  User = 'users',
  Workout = 'workout',
  Training = 'training',
  ExerciseInWorkout = 'exerciseinworkout',
  ExerciseInTraining = 'exerciseintraining'
}

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class DBHelper {
  /* ---------------------------------------------------------------------------------------------- */
  public seedDB = async (): Promise<void> => {
    try {
      const promises: Promise<void>[] = [];
      for (const tableType of Object.values(TableTypes)) {
        promises.push(this.tableExists(tableType));
      }

      const results = await Promise.allSettled(promises);

      if (results.some((promise) => promise.status === 'rejected')) {
        Logger.info('Creating database tables...');
        await this.createTables();
        Logger.info('Seeding database tables...');
        await this.seedTables();
        Logger.info('Successfully created and seeded database tables');
      }
    } catch (err) {
      throw new Api500Error('Something went wrong while seeding the database');
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  private async tableExists(tableName: string): Promise<void> {
    const result: QueryResult<any> = await query(
      "SELECT EXISTS ( SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = $1 );",
      [tableName]
    );

    if (result?.rows[0].exists) {
      return Promise.resolve();
    }

    return Promise.reject();
  }

  /* ---------------------------------------------------------------------------------------------- */
  private async createTables(): Promise<void> {
    await query(
      `CREATE TABLE ${TableTypes.Managed} (` +
        'createdby VARCHAR(100) NOT NULL,' +
        'lastchangedBy VARCHAR(100),' +
        'createdat TIMESTAMP NOT NULL,' +
        'lastchangedat TIMESTAMP' +
        ');'
    );

    await query(
      `CREATE TABLE ${TableTypes.Language} (` +
        'languagecode VARCHAR(5) PRIMARY KEY,' +
        'name VARCHAR(100) UNIQUE NOT NULL,' +
        'nativename VARCHAR(100) UNIQUE NOT NULL' +
        ');'
    );

    await query(
      `CREATE TABLE ${TableTypes.Exercise} (` +
        'exerciseid SERIAL PRIMARY KEY,' +
        'defaultName VARCHAR(30) NOT NULL' +
        ');'
    );

    await query(
      `CREATE TABLE ${TableTypes.ExerciseTranslation} (` +
        `exerciseid INTEGER REFERENCES ${TableTypes.Exercise} (exerciseid) ON DELETE CASCADE,` +
        `language VARCHAR(5) REFERENCES ${TableTypes.Language} (languagecode) ON DELETE RESTRICT,` +
        'name VARCHAR(30) NOT NULL,' +
        'PRIMARY KEY (exerciseid, language)' +
        ');'
    );

    await query(
      `CREATE TABLE ${TableTypes.MuscleGroup} (` +
        `mgid SERIAL PRIMARY KEY,` +
        'name VARCHAR(100) NOT NULL' +
        ');'
    );

    await query(
      `CREATE TABLE ${TableTypes.MuscleGroupTranslation} (` +
        `mgid INTEGER REFERENCES ${TableTypes.MuscleGroup} (mgid) ON DELETE CASCADE,` +
        `language VARCHAR(5) REFERENCES ${TableTypes.Language} (languagecode) ON DELETE RESTRICT,` +
        'name VARCHAR(100) NOT NULL,' +
        'PRIMARY KEY (mgid, language)' +
        ');'
    );

    await query(
      `CREATE TABLE ${TableTypes.MuscleGroupInExercise} (` +
        `exerciseid INTEGER REFERENCES ${TableTypes.Exercise} (exerciseid) ON DELETE CASCADE,` +
        `mgid INTEGER REFERENCES ${TableTypes.MuscleGroup} (mgid) ON DELETE RESTRICT,` +
        'isPrimary BOOLEAN NOT NULL,' +
        'PRIMARY KEY (exerciseid, mgid)' +
        ');'
    );

    await query(
      `CREATE TABLE ${TableTypes.User} (` +
        `userid SERIAL PRIMARY KEY,` +
        `firstName VARCHAR(100) NOT NULL,` +
        `lastName VARCHAR(100) NOT NULL,` +
        `username VARCHAR(20) UNIQUE NOT NULL,` +
        `email TEXT UNIQUE NOT NULL,` +
        `password TEXT NOT NULL` +
        `) INHERITS (${TableTypes.Managed});`
    );

    await query(
      `CREATE TABLE ${TableTypes.Workout} (` +
        `workoutid SERIAL PRIMARY KEY,` +
        `userid INTEGER REFERENCES ${TableTypes.User} (userid) ON DELETE CASCADE,` +
        `name VARCHAR(30) NOT NULL,` +
        `description VARCHAR(250) NOT NULL` +
        `) INHERITS (${TableTypes.Managed});`
    );

    await query(
      `CREATE TABLE ${TableTypes.Training} (` +
        `trainingid SERIAL PRIMARY KEY,` +
        `workoutid INTEGER REFERENCES ${TableTypes.Workout} (workoutid) ON DELETE CASCADE,` +
        `startdate TIMESTAMP NOT NULL,` +
        `enddate TIMESTAMP` +
        `);`
    );

    await query(
      `CREATE TABLE ${TableTypes.ExerciseInWorkout} (` +
        `workoutid INTEGER REFERENCES ${TableTypes.Workout} (workoutid) ON DELETE CASCADE,` +
        `exerciseid INTEGER REFERENCES ${TableTypes.Exercise} (exerciseid) ON DELETE RESTRICT,` +
        `targetSetCount INTEGER NOT NULL,` +
        `targetRepCount INTEGER NOT NULL,` +
        `PRIMARY KEY (workoutid, exerciseid)` +
        `);`
    );

    await query(
      `CREATE TABLE ${TableTypes.ExerciseInTraining} (` +
        `exerciseid INTEGER REFERENCES ${TableTypes.Exercise} (exerciseid) ON DELETE RESTRICT,` +
        `trainingid INTEGER REFERENCES ${TableTypes.Training} (trainingid) ON DELETE CASCADE,` +
        `setCount INTEGER,` +
        `repCount INTEGER,` +
        `PRIMARY KEY (exerciseid, trainingid)` +
        `);`
    );

    return;
  }

  /* ---------------------------------------------------------------------------------------------- */
  private async seedTables(): Promise<void> {
    // Seed Language Table
    await query(`INSERT INTO ${TableTypes.Language} (languagecode, name, nativename)
      VALUES ('de', 'German', 'Deutsch');`);
    await query(`INSERT INTO ${TableTypes.Language} (languagecode, name, nativename)
      VALUES ('en', 'English', 'English');`);

    // Seed Exercise Table
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Squat')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Leg press')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Lunge')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Deadlift')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Leg extension')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Leg curl')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Standing calf raise')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Bench press')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Chest fly')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Push-up')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Pull-down')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Pull-up')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Bent-over row')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Upright row')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Shoulder press')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Lateral raise')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Shoulder shrug')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Pushdown')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Triceps extension')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Biceps curl')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Crunch')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Russion twist')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Leg raise')`
    );
    await query(
      `INSERT INTO ${TableTypes.Exercise} (defaultName) VALUES ('Back extension')`
    );

    // Seed Exercise Translations

    // Seed MuscleGroup Table

    // Seed MuscleGroup Translations

    return;
  }
}
