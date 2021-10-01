import React, { FunctionComponent } from 'react';

import styles from './index.module.css';

interface MaterialButtonProps {
  icon: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  mini?: boolean;
  disabled?: boolean;
  border?: boolean;
}

const MaterialButton: FunctionComponent<MaterialButtonProps> = ({ icon, onClick, text, mini, disabled, border }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles['app-fab']} ripple ${text ? styles['app-fab--extended'] : ''} ${
        mini ? styles['app-fab--mini'] : ''
      } ${border && styles['app-fab--border']}`}
      disabled={disabled}
    >
      <span className='material-icons default '>{icon}</span>
      {text && <label>{text}</label>}
    </button>
  );
};

export default MaterialButton;
