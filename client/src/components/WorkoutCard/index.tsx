import React, { FunctionComponent } from 'react';
import { Workout } from '../../context/types';
import './index.css';

export interface WorkoutCardProps {
  workout: Workout;
  navigate: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const WorkoutCard: FunctionComponent<WorkoutCardProps> = ({ workout, navigate }) => {
  const { name, active, trainedAt, trainingInterval } = workout;

  const getLatestDate = (dates: Array<Date>): Date => dates.sort((a, b) => b.getTime() - a.getTime())[0];

  const getNextDate = (date: Date, interval: number): Date => new Date(date.setDate(date.getDate() + interval));

  return (
    <article className={`workout ${!active && 'error'}`}>
      <article className='workout__wo-content'>
        <div className='wo-content__header'>
          <h3 className='pr-5'>{name}</h3>
          <i className={`material-icons md-18 ${active ? 'success' : 'error'}`}>{active ? 'play_arrow' : 'pause'}</i>
        </div>
        <dl className='wo-content__wo-pairlist'>
          <div className={`wo-pairlist__pair ${!active && 'error'}`}>
            <dt>Last Training</dt>
            <dd>{getLatestDate(trainedAt).toLocaleDateString()}</dd>
          </div>
          {active && (
            <div className='wo-pairlist__pair'>
              <dt>Next Training</dt>
              <dd>{getNextDate(getLatestDate(trainedAt), trainingInterval).toLocaleDateString()}</dd>
            </div>
          )}
          <div className={`wo-pairlist__pair ${!active && 'error'}`}>
            <dt>Weight Increase since start</dt>
            {/* TODO: calculate dynamically */}
            <dd>+10%</dd>
          </div>
        </dl>
      </article>
      <button className='workout__wo-nav ripple' onClick={navigate}>
        <i className={`material-icons ${!active && 'error'}`}>navigate_next</i>
      </button>
      {!active && (
        <div className='overlay overlay--disabled'>
          <span>Inactive</span>
          <button onClick={() => console.log('Reactivate')}>Reactivate</button>
        </div>
      )}
    </article>
  );
};

export default WorkoutCard;
