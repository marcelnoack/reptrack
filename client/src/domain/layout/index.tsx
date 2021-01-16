import React, { FunctionComponent } from 'react';
import BottomNav from './BottomNav';
import AppContextProvider from '../../context/AppContext';
import AppBar from './AppBar';

const Layout: FunctionComponent = ({ children }) => {
  const dummyAction = () => {
    console.log('Dummy Action');
  };

  return (
    <>
      <AppContextProvider>
        <header>
          <AppBar />
        </header>
        <main className='grid-col-4 indent-h-sm'>{children}</main>
        <footer>
          <BottomNav mainActionIcon={'add'} handleMainAction={dummyAction} />
        </footer>
      </AppContextProvider>
    </>
  );
};

export default Layout;
