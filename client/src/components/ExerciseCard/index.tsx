import { FunctionComponent } from 'react';
import { Exercise } from '../../context/types';

import './index.css';

export interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: FunctionComponent<ExerciseCardProps> = ({ exercise }) => {
  return (
    <article className='exercise-card'>
      <h4>{exercise.name}</h4>
      <div>
        <dt>Range:</dt>
        <dd>{`${exercise.setCount} x ${exercise.targetRepsPerSet.min}-${exercise.targetRepsPerSet.max}`}</dd>
      </div>
    </article>
  );
};

export default ExerciseCard;
