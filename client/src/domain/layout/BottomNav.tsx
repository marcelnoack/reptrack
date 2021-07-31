import React, { FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import MaterialButton from '../../components/MaterialButton';
import { AppContext } from '../../context/AppContext';

import './layout.css';

const BottomNav: FunctionComponent = () => {
  const { appState, dispatch } = useContext(AppContext);

  const handleMainAction = () => {
    if (appState.mainAction.page === 'Home') {
      dispatch({ type: 'SET_MAIN_ACTION_STATUS', payload: !appState.mainAction.active });
    }
  };

  return (
    <nav className='bottom-nav'>
      <ul className='nav-list'>
        <NavLink exact to='/' activeClassName='route--active' className='route'>
          <li className='nav-list__tab'>
            <span className='material-icons'>home</span>
            Home
          </li>
        </NavLink>
        <NavLink to='/workouts' activeClassName='route--active' className='route'>
          <li className='nav-list__tab'>
            <span className='material-icons'>fitness_center</span>
            Workouts
          </li>
        </NavLink>
        <li className={`nav-list__tab nav-list__tab--center ${!appState.mainAction.page ? 'nav-list__tab--hide' : ''}`}>
          <div className='nav-list__action'>
            <MaterialButton
              onClick={() => handleMainAction()}
              icon={appState.mainAction.icon}
              disabled={!appState.mainAction.page}
              border
            />
          </div>
          {/* <button className='fab__outer' disabled={!appState.mainAction.page} onClick={() => handleMainAction()}>
            <div className='fab__inner'>
              <span className='material-icons'>{appState.mainAction.icon}</span>
            </div>
          </button> */}
        </li>
        <NavLink to='/progress' activeClassName='route--active' className='route'>
          <li className='nav-list__tab'>
            <span className='material-icons'>trending_up</span>
            Progress
          </li>
        </NavLink>
        <NavLink to='/calendar' activeClassName='route--active' className='route'>
          <li className='nav-list__tab'>
            <span className='material-icons'>date_range</span>
            Calendar
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default BottomNav;
