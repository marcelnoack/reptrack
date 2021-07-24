import React, { FunctionComponent, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const Home: FunctionComponent = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SET_HEADER_NAME', payload: 'Home' });
    dispatch({ type: 'SET_MAIN_ACTION_CONTEXT', payload: null });
  }, [dispatch]);

  return <h1>Home</h1>;
};

export default Home;
