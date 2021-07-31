import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import BottomNav from './BottomNav';
import AppContextProvider from '../../context/AppContext';
import AppBar from './AppBar';

import './layout.css';
import WorkoutContextProvider from '../../context/WorkoutContext';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className='app-layout'>
      <AppContextProvider>
        <header className='app-header'>
          <AppBar />
        </header>
        <WorkoutContextProvider>
          <main id='main' className='app-main grid-col-4 indent-h-sm'>
            {children}
          </main>
        </WorkoutContextProvider>
        <footer className='app-footer'>
          <BottomNav />
        </footer>
      </AppContextProvider>
    </div>
  );
};

export default Layout;
