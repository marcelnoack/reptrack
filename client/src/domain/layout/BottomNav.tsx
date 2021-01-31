import React, { FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

import './layout.css';

const BottomNav: FunctionComponent = () => {
  const { appState, dispatch } = useContext(AppContext);

  const handleMainAction = () => {
    dispatch({ type: 'SET_MAIN_ACTION_STATUS', payload: true });
  };

  return (
    <nav className='bottom-nav'>
      <ul className='nav-list'>
        <NavLink exact to='/' activeClassName='route--active' className='route'>
          <li className='nav-list__tab'>
            <i className='material-icons'>home</i>
            Home
          </li>
        </NavLink>
        <NavLink to='/workouts' activeClassName='route--active' className='route'>
          <li className='nav-list__tab'>
            <i className='material-icons'>fitness_center</i>
            Workouts
          </li>
        </NavLink>
        <li className='nav-list__tab'>
          <button
            className='fab__outer  ripple'
            disabled={!appState.mainAction.page}
            onClick={() => handleMainAction()}
          >
            <i className='material-icons fab__inner'>{appState.mainAction.icon}</i>
          </button>
        </li>
        <NavLink to='/progress' activeClassName='route--active' className='route'>
          <li className='nav-list__tab'>
            <i className='material-icons'>trending_up</i>
            Progress
          </li>
        </NavLink>
        <NavLink to='/calendar' activeClassName='route--active' className='route'>
          <li className='nav-list__tab'>
            <i className='material-icons'>date_range</i>
            Calendar
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default BottomNav;
