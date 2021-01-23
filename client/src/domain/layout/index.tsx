import React, { FunctionComponent } from 'react';
import BottomNav from './BottomNav';
import AppContextProvider from '../../context/AppContext';
import AppBar from './AppBar';

import './layout.css';

const Layout: FunctionComponent = ({ children }) => {
  const dummyAction = () => {
    console.log('Dummy Action');
  };

  return (
    <div className='app-layout'>
      <AppContextProvider>
        <header className='app-header'>
          <AppBar />
        </header>
        <main className='app-main grid-col-4 indent-h-sm'>{children}</main>
        <footer className='app-footer'>
          <BottomNav mainActionIcon={'add'} handleMainAction={dummyAction} />
        </footer>
      </AppContextProvider>
    </div>
  );
};

export default Layout;
