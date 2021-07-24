import React, { FunctionComponent } from 'react';

import styles from './index.module.css';

interface MaterialButtonProps {
  icon: string;
  text?: string;
  mini?: boolean;
}

const MaterialButton: FunctionComponent<MaterialButtonProps> = ({ icon, text, mini }) => {
  return (
    <button
      className={`${styles['app-fab']} ripple ${text && styles['app-fab--extended']} ${
        text && mini && styles['app-fab--mini']
      }`}
    >
      <span className='material-icons'>{icon}</span>
      {text && <label>{text}</label>}
    </button>
  );
};

export default MaterialButton;
