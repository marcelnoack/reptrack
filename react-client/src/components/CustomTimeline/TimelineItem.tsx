import { FunctionComponent } from 'react';

import './index.css';

export interface TimelineItemProps {
  hasLine: boolean;
}

const TimelineItem: FunctionComponent<TimelineItemProps> = ({ hasLine, children }) => (
  <div className='timeline__item'>
    <div className='ti-item__img'>
      <i className='material-icons'>fitness_center</i>
    </div>
    <div className='ti-item__indicator'>
      <div className='indicator__circle-area'>
        <span className='i-circle-area__circle'></span>
      </div>
      <div className='indicator__line-area'>{hasLine && <span className='i-line-area__line'></span>}</div>
    </div>
    <div className='ti-item__content'>{children}</div>
  </div>
);

export default TimelineItem;
