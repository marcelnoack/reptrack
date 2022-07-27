import { ManagedDTO } from '../common/commonAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export interface ExerciseDTO extends ManagedDTO {
  workoutId: string;
  name: string;
  description: string;
  userId: number;
}

export interface ExerciseInputDTO /* extends ManagedDTO */ {
  name: string;
  description: string;
  userId: number;
}
