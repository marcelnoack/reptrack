import React, { useContext, useEffect } from 'react';
import WorkoutCard from '../../components/WorkoutCard';
import { AppContext } from '../../context/AppContext';
import { Workout } from '../../context/types';

import './index.css';

const WORKOUT: Workout = {
  workoutId: 'randomString',
  name: 'Full-Body B',
  active: true,
  trainedAt: [new Date(), new Date()],
  trainingInterval: 2,
  createdBy: 'MLNK',
  createdAt: new Date(),
  changedAt: new Date()
};

const Workouts = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SET_HEADER_NAME', payload: 'Workouts' });
  }, [dispatch]);

  return (
    <>
      <WorkoutCard key={WORKOUT.workoutId} workout={WORKOUT} />
      <WorkoutCard key={WORKOUT.workoutId + 1} workout={{ ...WORKOUT, name: 'Full-Body A', active: false }} />
      <WorkoutCard key={WORKOUT.workoutId + 1} workout={{ ...WORKOUT, name: 'Chest-Day A', active: false }} />
      <WorkoutCard key={WORKOUT.workoutId} workout={{ ...WORKOUT, name: 'Legs A' }} />
    </>
  );
};

export default Workouts;
