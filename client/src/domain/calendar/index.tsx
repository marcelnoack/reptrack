import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const Calendar = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SET_HEADER_NAME', payload: 'Calendar' });
  }, [dispatch]);

  return <h1>Calendar</h1>;
};

export default Calendar;
