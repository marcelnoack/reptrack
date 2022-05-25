import React, { FunctionComponent, useContext, useEffect } from 'react';
import { AppContext } from '../../../context/AppContext';

const WorkoutAssistant: FunctionComponent = () => {
  const { appState, dispatch: appDispatch } = useContext(AppContext);

  useEffect(() => {
    console.log('Workouts::UseEffect');
    appDispatch({ type: 'SET_HEADER_NAME', payload: 'Just ... do it!' });
    appDispatch({ type: 'SET_MAIN_ACTION_ICON', payload: 'play_arrow' });
    appDispatch({ type: 'SET_MAIN_ACTION_CONTEXT', payload: 'WorkoutAssistant' });
  }, [appDispatch]);

  useEffect(() => {
    const toggleMainActionIcon = () => {
      if (appState.mainAction.active) {
        appDispatch({ type: 'SET_MAIN_ACTION_ICON', payload: 'stop' });
      } else {
        appDispatch({ type: 'SET_MAIN_ACTION_ICON', payload: 'play_arrow' });
      }
    };
    toggleMainActionIcon();
  }, [appState.mainAction.active, appDispatch]);

  return <h1>Workout Assistant</h1>;
};

export default WorkoutAssistant;
