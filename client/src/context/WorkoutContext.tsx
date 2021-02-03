import React, { FunctionComponent, createContext, useReducer } from 'react';
import workoutReducer, { WorkoutAction, WorkoutState } from './workoutReducer';

const initialWorkoutState = {
  workouts: [
    {
      workoutId: 'randomString0',
      name: 'Full-Body B',
      active: true,
      trainedAt: [new Date(), new Date()],
      trainingInterval: 2,
      exercises: [
        {
          exerciseId: 'randomExerciseId0',
          name: 'Bench Press',
          muscleGroups: ['Chest', 'Triceps'],
          setCount: 3,
          targetRepsPerSet: { min: 8, max: 10 },
          setPauseLength: 60
        },
        {
          exerciseId: 'randomExerciseId1',
          name: 'Leg Press',
          muscleGroups: ['Quadriceps'],
          setCount: 5,
          targetRepsPerSet: { min: 10, max: 15 },
          setPauseLength: 90
        },
        {
          exerciseId: 'randomExerciseId2',
          name: 'Leg Press',
          muscleGroups: ['Quadriceps'],
          setCount: 5,
          targetRepsPerSet: { min: 10, max: 15 },
          setPauseLength: 90
        },
        {
          exerciseId: 'randomExerciseId3',
          name: 'Leg Press',
          muscleGroups: ['Quadriceps'],
          setCount: 5,
          targetRepsPerSet: { min: 10, max: 15 },
          setPauseLength: 90
        },
        {
          exerciseId: 'randomExerciseId4',
          name: 'Leg Press',
          muscleGroups: ['Quadriceps'],
          setCount: 5,
          targetRepsPerSet: { min: 10, max: 15 },
          setPauseLength: 90
        },
        {
          exerciseId: 'randomExerciseId5',
          name: 'Leg Press',
          muscleGroups: ['Quadriceps'],
          setCount: 5,
          targetRepsPerSet: { min: 10, max: 15 },
          setPauseLength: 90
        },
        {
          exerciseId: 'randomExerciseId6',
          name: 'Leg Press',
          muscleGroups: ['Quadriceps'],
          setCount: 5,
          targetRepsPerSet: { min: 10, max: 15 },
          setPauseLength: 90
        },
        {
          exerciseId: 'randomExerciseId7',
          name: 'Leg Press',
          muscleGroups: ['Quadriceps'],
          setCount: 5,
          targetRepsPerSet: { min: 10, max: 15 },
          setPauseLength: 90
        },
        {
          exerciseId: 'randomExerciseId8',
          name: 'Leg Press',
          muscleGroups: ['Quadriceps'],
          setCount: 5,
          targetRepsPerSet: { min: 10, max: 15 },
          setPauseLength: 90
        }
      ],
      createdBy: 'MLNK',
      createdAt: new Date(),
      changedAt: new Date()
    },
    {
      workoutId: 'randomString1',
      name: 'Full-Body A',
      active: false,
      trainedAt: [new Date(), new Date()],
      trainingInterval: 2,
      exercises: [],
      createdBy: 'MLNK',
      createdAt: new Date(),
      changedAt: new Date()
    },
    {
      workoutId: 'randomString2',
      name: 'Chest-Day A',
      active: false,
      trainedAt: [new Date(), new Date()],
      trainingInterval: 2,
      exercises: [],
      createdBy: 'MLNK',
      createdAt: new Date(),
      changedAt: new Date()
    },
    {
      workoutId: 'randomString3',
      name: 'Legs A',
      active: true,
      trainedAt: [new Date(), new Date()],
      trainingInterval: 2,
      exercises: [],
      createdBy: 'MLNK',
      createdAt: new Date(),
      changedAt: new Date()
    }
  ]
};

export const WorkoutContext = createContext<{ workoutState: WorkoutState; dispatch: React.Dispatch<WorkoutAction> }>({
  workoutState: initialWorkoutState,
  dispatch: () => null
});

const WorkoutContextProvider: FunctionComponent = ({ children }) => {
  const [workoutState, dispatch] = useReducer(workoutReducer, initialWorkoutState);

  return <WorkoutContext.Provider value={{ workoutState, dispatch }}>{children}</WorkoutContext.Provider>;
};

export default WorkoutContextProvider;
