export interface AppState {
  headerName: string;
  mainAction: {
    icon: string;
    page?: MainActionContext;
    active: boolean;
  };
}

export type MainActionContext = null | 'Workout' | 'WorkoutDetails';

export type AppAction =
  | { type: 'SET_HEADER_NAME'; payload: string }
  | { type: 'SET_MAIN_ACTION_ICON'; payload: string }
  | { type: 'SET_MAIN_ACTION_CONTEXT'; payload: MainActionContext }
  | { type: 'SET_MAIN_ACTION_STATUS'; payload: boolean };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_HEADER_NAME':
      return { ...state, headerName: action.payload };
    case 'SET_MAIN_ACTION_ICON':
      return { ...state, mainAction: { ...state.mainAction, icon: action.payload } };
    case 'SET_MAIN_ACTION_CONTEXT':
      return { ...state, mainAction: { ...state.mainAction, page: action.payload } };
    case 'SET_MAIN_ACTION_STATUS':
      return { ...state, mainAction: { ...state.mainAction, active: action.payload } };
    default:
      return state;
  }
};

export default appReducer;
