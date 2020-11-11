export interface Exercise {
  name: string;
  description?: string;
  muscleGroups: string[];
}

export interface Workout {
  name: string;
  createdAt: Date;
  createdBy: string | null;
  lastTraining: {
    startDate: Date;
    endDate: Date;
    duration: number; // In Seconds
  };
  exercises: Exercise[];
}
