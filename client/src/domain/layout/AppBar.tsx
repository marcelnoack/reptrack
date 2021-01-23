import React, { FunctionComponent, useContext } from 'react';
import MaterialButton from '../../components/MaterialButton';
import { AppContext } from '../../context/AppContext';

import './layout.css';

const AppBar: FunctionComponent = () => {
  const { appState } = useContext(AppContext);

  return (
    <div className='app-bar grid-col-4 indent-h-sm'>
      <div className='app-bar__item'>
        <img src='/images/Logo.png' alt='reptrack-logo' className='app-bar__logo' />
      </div>
      <h1 className='app-bar__item app-bar__route'>{appState.headerName}</h1>
      <div className='app-bar__item app-bar__actions'>
        <MaterialButton icon='notifications_none' />
        <MaterialButton icon='person' />
      </div>
    </div>
  );
};

export default AppBar;
