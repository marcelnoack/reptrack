import React, { FunctionComponent, createContext, useReducer } from 'react';
import authReducer, { AuthState, AuthAction } from './authReducer';

export const AuthContext = createContext<{ authState: AuthState; dispatch: React.Dispatch<AuthAction> }>({
  authState: { isAuthenticated: false, isLoading: false },
  dispatch: () => null
});

const AuthContextProvider: FunctionComponent = ({ children }) => {
  const [authState, dispatch] = useReducer(
    authReducer,
    {
      isAuthenticated: false,
      isLoading: false
    },
    (state: AuthState) => {
      if (localStorage.getItem('auth')) {
        return { isAuthenticated: true, isLoading: false };
      } else {
        return state;
      }
    }
  );

  return <AuthContext.Provider value={{ authState, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
