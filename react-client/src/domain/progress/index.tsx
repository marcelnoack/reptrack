import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const Progress = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SET_HEADER_NAME', payload: 'Progress' });
    dispatch({ type: 'SET_MAIN_ACTION_CONTEXT', payload: null });
  }, [dispatch]);

  return <h1>Progress</h1>;
};

export default Progress;
