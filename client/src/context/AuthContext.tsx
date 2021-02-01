import React, { FunctionComponent, createContext, useReducer } from 'react';
import authReducer, { AuthState, AuthAction } from './authReducer';

const initialAuthState: AuthState = { isAuthenticated: false, isLoading: false };

export const AuthContext = createContext<{ authState: AuthState; dispatch: React.Dispatch<AuthAction> }>({
  authState: initialAuthState,
  dispatch: () => null
});

const AuthContextProvider: FunctionComponent = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState, (state: AuthState) => {
    if (localStorage.getItem('auth')) {
      return { isAuthenticated: true, isLoading: false };
    } else {
      return state;
    }
  });

  return <AuthContext.Provider value={{ authState, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
