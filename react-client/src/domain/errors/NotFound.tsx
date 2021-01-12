import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

const NotFound = (props: RouteComponentProps) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return <h1>Not Found</h1>;
};

export default NotFound;
