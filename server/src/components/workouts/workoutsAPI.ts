import { ManagedDTO } from '../../common';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export interface WorkoutDTO extends Partial<ManagedDTO> {
  workoutId: string;
  name: string;
  description: string;
  userId: number;
}

export interface WorkoutInputDTO extends Partial<ManagedDTO> {
  name: string;
  description: string;
  userId: number;
}
