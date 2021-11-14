import { Workout } from './types';

export interface WorkoutState {
  workouts: Array<Workout>;
}

export type WorkoutAction = { type: 'GET_WORKOUT'; payload: { id: string } };

const appReducer = (state: WorkoutState, action: WorkoutAction): WorkoutState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default appReducer;
