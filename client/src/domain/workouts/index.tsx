import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WorkoutCard from '../../components/WorkoutCard';
import { AppContext } from '../../context/AppContext';
import { MainActionContext } from '../../context/appReducer';
import { WorkoutContext } from '../../context/WorkoutContext';

import './index.css';

const Workouts = () => {
  const { dispatch } = useContext(AppContext);
  const { workoutState } = useContext(WorkoutContext);
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
    }, 10);
  };

  return (
    <>
      {workoutState.workouts.map((w) => (
        <WorkoutCard key={w.workoutId} workout={w} navigate={() => navigationHandler(w.workoutId)} />
      ))}
    </>
  );
};

export default Workouts;
