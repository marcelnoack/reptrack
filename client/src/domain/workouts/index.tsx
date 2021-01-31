import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WorkoutCard from '../../components/WorkoutCard';
import { AppContext } from '../../context/AppContext';
import { MainActionContext } from '../../context/appReducer';
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
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'SET_HEADER_NAME', payload: 'Workouts' });
    dispatch({ type: 'SET_MAIN_ACTION_ICON', payload: 'add' });
    dispatch({ type: 'SET_MAIN_ACTION_CONTEXT', payload: MainActionContext.Workout });
  }, [dispatch]);

  const navigationHandler = (id: string): void => {
    // Fake delay to show button click before actual navigation for better UX
    setTimeout(() => {
      history.push(`/workouts/${id}`);
    }, 100);
  };

  return (
    <>
      <WorkoutCard
        key={WORKOUT.workoutId + Math.random() * Math.floor(1000000)}
        workout={WORKOUT}
        navigate={() => navigationHandler(WORKOUT.workoutId)}
      />
      <WorkoutCard
        key={WORKOUT.workoutId + Math.random() * Math.floor(1000000)}
        workout={{ ...WORKOUT, name: 'Full-Body A', active: false }}
        navigate={() => navigationHandler(WORKOUT.workoutId)}
      />
      <WorkoutCard
        key={WORKOUT.workoutId + Math.random() * Math.floor(1000000)}
        workout={{ ...WORKOUT, name: 'Chest-Day A', active: false }}
        navigate={() => navigationHandler(WORKOUT.workoutId)}
      />
      <WorkoutCard
        key={WORKOUT.workoutId + Math.random() * Math.floor(1000000)}
        workout={{ ...WORKOUT, name: 'Legs A' }}
        navigate={() => navigationHandler(WORKOUT.workoutId)}
      />
    </>
  );
};

export default Workouts;
