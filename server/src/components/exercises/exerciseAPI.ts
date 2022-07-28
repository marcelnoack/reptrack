import { ManagedDTO } from '../../common';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export interface ExerciseDTO extends Partial<ManagedDTO> {
  workoutId: string;
  name: string;
  description: string;
  userId: number;
}

export interface ExerciseInputDTO extends Partial<ManagedDTO> {
  name: string;
  description: string;
  userId: number;
}
