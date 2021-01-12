export interface AppState {
  headerName: string;
}

export type AppAction = { type: 'SET_HEADER_NAME'; payload: string };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_HEADER_NAME':
      return { ...state, headerName: action.payload };
    default:
      return state;
  }
};

export default appReducer;
