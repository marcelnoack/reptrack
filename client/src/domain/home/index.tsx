import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Workout } from '../../context/types';
import { WorkoutContext } from '../../context/WorkoutContext';

import styles from './index.module.css';

const Home: FunctionComponent = () => {
  const { appState, dispatch: appDispatch } = useContext(AppContext);
  const { workoutState } = useContext(WorkoutContext);
  const [nextWorkout, setNextWorkout] = useState<Workout | undefined>();

  useEffect(() => {
    appDispatch({ type: 'SET_HEADER_NAME', payload: 'Home' });
    appDispatch({ type: 'SET_MAIN_ACTION_ICON', payload: 'play_arrow' });
    appDispatch({ type: 'SET_MAIN_ACTION_CONTEXT', payload: null });
  }, [appDispatch]);

  useEffect(() => {
    const calculateNextTraining = () => {
      let nextWorkoutId: string;
      let lastWorkoutDate: Date = new Date(-8640000000000000);
      workoutState.workouts.forEach((w: Workout) => {
        if (w.active && w.trainedAt.length > 0) {
          if (w.trainedAt.sort()[0] > lastWorkoutDate) {
            lastWorkoutDate = w.trainedAt.sort()[0];
            nextWorkoutId = w.workoutId;
          }
        }
      });
      setNextWorkout([...workoutState.workouts].find((w: Workout) => w.workoutId === nextWorkoutId));
    };

    calculateNextTraining();
  }, [workoutState]);

  return (
    <>
      {/* <div
        className={`${styles['workout-card-wrapper']} ${appState.mainAction.active && styles['active']} col-1-span-4`}
      >
        <div className={`workout-card ${appState.mainAction.active && 'active'}`}>
          <div className='content-spacing'>{nextWorkout && nextWorkout.name}</div>
        </div>
      </div> */}
    </>
  );
};

export default Home;
