import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExerciseCard from '../../../components/ExerciseCard';
import WorkoutCard from '../../../components/WorkoutCard';
import { AppContext } from '../../../context/AppContext';
import { MainActionContext } from '../../../context/appReducer';
import { Workout } from '../../../context/types';
import { WorkoutContext } from '../../../context/WorkoutContext';

import '../index.css';

const WorkoutDetails = () => {
  const { appState, dispatch: appDispatch } = useContext(AppContext);
  const { workoutState } = useContext(WorkoutContext);
  const [workout, setWorkout] = useState<Workout>();
  const { id: workoutId } = useParams<{ id: string }>();

  useEffect(() => {
    appDispatch({ type: 'SET_HEADER_NAME', payload: 'Workout' });
    appDispatch({ type: 'SET_MAIN_ACTION_ICON', payload: 'play_arrow' });
    appDispatch({ type: 'SET_MAIN_ACTION_CONTEXT', payload: MainActionContext.WorkoutDetails });

    const loadWorkoutDetails = () => {
      // TODO: Fetch necessary data from real backend
      setWorkout(workoutState.workouts.find((w) => w.workoutId === workoutId));
    };
    loadWorkoutDetails();
  }, [workoutId, workoutState]);

  useEffect(() => {
    const dummyFunction = () => {
      if (appState.mainAction.active && appState.mainAction.page === MainActionContext.WorkoutDetails) {
        appDispatch({ type: 'SET_MAIN_ACTION_STATUS', payload: false });
      }
    };

    dummyFunction();
  }, [appState, appDispatch]);

  return (
    <>
      {workout && <WorkoutCard key={workout.workoutId} workout={workout} />}
      <section className='workout__exercises col-1-span-4'>
        <h3>Exercises</h3>
        {workout &&
          workout.exercises.length > 0 &&
          workout.exercises.map((e) => <ExerciseCard key={e.exerciseId} exercise={e} />)}
      </section>
    </>
  );
};

export default WorkoutDetails;
