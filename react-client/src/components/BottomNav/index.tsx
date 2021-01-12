import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import './bottomNav.css';

const BottomNav: FunctionComponent = () => {
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
        <li className='nav-list__tab nav-list__tab--fab'>
          <div className='fab__outer'>
            <div className='fab__inner'>+</div>
          </div>
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
