import React, { FunctionComponent, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const Home: FunctionComponent = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SET_HEADER_NAME', payload: 'Home' });
  }, [dispatch]);

  return <h1>Home</h1>;
};

export default Home;
