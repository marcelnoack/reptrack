import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../context/AppContext';
import { MainActionContext } from '../../../context/appReducer';

const WorkoutDetails = () => {
  const { appState, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SET_HEADER_NAME', payload: 'Workout' });
    dispatch({ type: 'SET_MAIN_ACTION_ICON', payload: 'play_arrow' });
    dispatch({ type: 'SET_MAIN_ACTION_CONTEXT', payload: MainActionContext.WorkoutDetails });
  }, [dispatch]);

  useEffect(() => {
    const dummyFunction = () => {
      if (appState.mainAction.active && appState.mainAction.page === MainActionContext.WorkoutDetails) {
        dispatch({ type: 'SET_MAIN_ACTION_STATUS', payload: false });
        console.log('test');
      }
    };

    dummyFunction();
  }, [appState.mainAction.active]);

  return <h1>{appState.mainAction.active.toString()}</h1>;
};

export default WorkoutDetails;
