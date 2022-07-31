import { ManagedDTO } from '../../common';
import { ExerciseDTO } from '../exercises/exerciseAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export interface WorkoutDTO extends Partial<ManagedDTO> {
  workoutId: string;
  name: string;
  description: string;
  userId: string;
  exercises?: ExerciseInWorkoutDTO[];
}

export interface WorkoutInputDTO extends Partial<ManagedDTO> {
  name: string;
  description: string;
  userId: string;

  exercises: ExerciseInWorkoutDTO[];
}

export interface ExerciseInWorkoutDTO extends Partial<ExerciseDTO> {
  workoutId?: string;
  targetSetCount?: number;
  targetRepCount?: number;
}

export type WorkoutRelatedEntities = 'exercises' | 'trainings';
