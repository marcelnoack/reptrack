import React, { FunctionComponent } from 'react';
import './index.css';

export interface WorkoutCardProps {}

const WorkoutCard: FunctionComponent<WorkoutCardProps> = () => {
  return (
    <article className='workout'>
      <div className='workout__content'>
        <h3>Full-Body B</h3>
        <p>Test</p>
      </div>
      <button className='workout__nav ripple' onClick={() => console.log('TEST')}>
        <i className='material-icons'>navigate_next</i>
      </button>
    </article>
  );
};

export default WorkoutCard;
