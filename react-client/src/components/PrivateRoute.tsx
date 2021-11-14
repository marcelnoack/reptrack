import React, { FunctionComponent, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children, path, exact }) => {
  const { authState } = useContext(AuthContext);
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        authState.isAuthenticated ? children : <Redirect to={{ pathname: '/signin', state: location }} />
      }
    />
  );
};

export default PrivateRoute;
