import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomTimeline from '../../../components/CustomTimeline';
import TimelineItem from '../../../components/CustomTimeline/TimelineItem';
import WorkoutCard from '../../../components/WorkoutCard';
import { AppContext } from '../../../context/AppContext';
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
    appDispatch({ type: 'SET_MAIN_ACTION_CONTEXT', payload: 'WorkoutDetails' });

    const loadWorkoutDetails = () => {
      // TODO: Fetch necessary data from real backend
      setWorkout(workoutState.workouts.find((w) => w.workoutId === workoutId));
    };
    loadWorkoutDetails();
  }, [appDispatch, workoutId, workoutState]);

  useEffect(() => {
    const dummyFunction = () => {
      if (appState.mainAction.active && appState.mainAction.page === 'WorkoutDetails') {
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
        {workout && workout.exercises.length > 0 && (
          <CustomTimeline>
            {workout.exercises.map((e, i) => (
              <TimelineItem hasLine={i < workout.exercises.length - 1}>
                <h5>{e.name}</h5>
                <div style={{ display: 'flex' }}>
                  <dt style={{ color: 'var(--color-primary--variant)', fontWeight: 'bold', fontSize: '0.75rem' }}>
                    Range:
                  </dt>
                  <dd
                    style={{ fontSize: 'small' }}
                  >{`${e.setCount} x ${e.targetRepsPerSet.min}-${e.targetRepsPerSet.max}`}</dd>
                </div>
              </TimelineItem>
            ))}
          </CustomTimeline>
        )}
      </section>
    </>
  );
};

export default WorkoutDetails;
