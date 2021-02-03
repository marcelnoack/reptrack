import { FunctionComponent } from 'react';

import './index.css';

export interface CustomTimelineProps {}

const CustomTimeline: FunctionComponent<CustomTimelineProps> = ({ children }) => (
  <div className='timeline'>{children}</div>
);

export default CustomTimeline;
