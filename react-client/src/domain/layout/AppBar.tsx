import React, { FunctionComponent, useContext } from 'react';
import MaterialButton from '../../components/MaterialButton';
import { AppContext } from '../../context/AppContext';

import './layout.css';

const AppBar: FunctionComponent = () => {
  const { appState } = useContext(AppContext);

  return (
    <div className='app-bar grid-col-4 indent-h-sm'>
      <div className='app-bar__item app-bar__logo'>
        <i className='material-icons'>polymer</i>
      </div>
      <span className='app-bar__item app-bar__route'>{appState.headerName}</span>
      <div className='app-bar__item app-bar__actions'>
        <MaterialButton icon='notifications_none' />
        {/* <i className='material-icons pl-5'>notifications_none</i> */}
        <MaterialButton icon='person' />
        {/* <i className='material-icons pl-5 ripple'>person</i> */}
      </div>
    </div>
  );
};

export default AppBar;
