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
      <i className='material-icons'>{icon}</i>
      {text && <label>{text}</label>}
    </button>
  );
};

export default MaterialButton;
