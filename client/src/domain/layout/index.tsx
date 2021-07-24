import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import BottomNav from './BottomNav';
import AppContextProvider from '../../context/AppContext';
import AppBar from './AppBar';

import './layout.css';
import WorkoutContextProvider, { WorkoutContext } from '../../context/WorkoutContext';
import { useLocation } from 'react-router-dom';

const Layout: FunctionComponent = ({ children }) => {
  const [hasMainScrollbar, setHasMainScrollbar] = useState<boolean>(false);
  const { workoutState } = useContext(WorkoutContext);
  const location = useLocation();

  useEffect(() => {
    const checkScrollbar = () => {
      setHasMainScrollbar(false);
      const mainElement = document.getElementById('main');
      if (mainElement && mainElement.scrollHeight > mainElement.clientHeight) {
        setHasMainScrollbar(true);
      }
    };
    checkScrollbar();
    console.log('checked');
  }, [location, workoutState]);

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
        <footer className={`app-footer ${hasMainScrollbar ? 'app-footer--scroll' : ''}`}>
          <BottomNav />
        </footer>
      </AppContextProvider>
    </div>
  );
};

export default Layout;
