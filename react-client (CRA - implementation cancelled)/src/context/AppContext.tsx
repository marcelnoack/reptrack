import React, { FunctionComponent, createContext, useReducer } from 'react';
import appReducer, { AppAction, AppState } from './appReducer';

const initialAppState: AppState = {
  headerName: '',
  mainAction: { icon: 'add', active: false }
};

export const AppContext = createContext<{ appState: AppState; dispatch: React.Dispatch<AppAction> }>({
  appState: initialAppState,
  dispatch: () => null
});

const AppContextProvider: FunctionComponent = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, initialAppState);

  return <AppContext.Provider value={{ appState, dispatch }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
