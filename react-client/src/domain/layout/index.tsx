import React, { FunctionComponent } from 'react';
import BottomNav from '../../components/BottomNav';
import AppBar from './AppBar';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <header>
        <AppBar />
      </header>
      <main>{children}</main>
      <footer>
        <BottomNav />
      </footer>
    </>
  );
};

export default Layout;
