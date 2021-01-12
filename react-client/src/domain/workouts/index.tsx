import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const Workouts = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SET_HEADER_NAME', payload: 'Workouts' });
  }, [dispatch]);

  return <h1>Workouts</h1>;
};

export default Workouts;
