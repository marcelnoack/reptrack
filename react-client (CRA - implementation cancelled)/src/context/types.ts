// datamodel
export interface Workout {
  workoutId: string;
  name: string;
  trainedAt: Array<Date>;
  trainingInterval: number;
  active: boolean;
  exercises: Array<Exercise>;
  // 'Managed' attributes
  createdBy: string;
  createdAt: Date;
  changedAt: Date;
}

export interface Exercise {
  exerciseId: string;
  name: string;
  muscleGroups: Array<string>;
  setCount: number;
  targetRepsPerSet: { min: number; max: number };
  setPauseLength: number; // in seconds
}

export interface Training {
  trainingId: string;
  userId: string;
  workoutId: string;
  exerciseResults: Array<ExerciseResult>;
  startDate: Date;
  endDate: Date;
}

export interface User {
  userId: string;
  role?: Array<string>;
  email: string;
  phone?: string;
  profilePic?: string; // url
  firstName: string;
  lastName: string;

  // 'Managed' attributes
  createdAt: Date;
  changedAt: Date;
}

export interface ExerciseResult {
  resultId: string;
  exerciseId: string;
  trainingId: string;
  setResults: Array<{ setNumber: number; setCount: number; setWeight: number }>;
}
