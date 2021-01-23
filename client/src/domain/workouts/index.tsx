import React, { useContext, useEffect } from 'react';
import WorkoutCard from '../../components/WorkoutCard';
import { AppContext } from '../../context/AppContext';

import './index.css';

const Workouts = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SET_HEADER_NAME', payload: 'Workouts' });
  }, [dispatch]);

  return (
    <>
      <WorkoutCard />
      <WorkoutCard />
      <WorkoutCard />
      <WorkoutCard />
      <WorkoutCard />
      <WorkoutCard />
      <WorkoutCard />
      <WorkoutCard />
    </>
  );
};

export default Workouts;
