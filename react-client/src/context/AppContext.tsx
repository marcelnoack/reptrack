import React, { FunctionComponent, createContext, useReducer } from 'react';
import appReducer, { AppAction, AppState } from './appReducer';

export const AppContext = createContext<{ appState: AppState; dispatch: React.Dispatch<AppAction> }>({
  appState: { headerName: '' },
  dispatch: () => null
});

const AppContextProvider: FunctionComponent = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, { headerName: '' });

  return <AppContext.Provider value={{ appState, dispatch }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
