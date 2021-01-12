export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
}

export type AuthAction = { type: 'REQUEST_AUTH' | 'AUTH_SUCCESS' | 'AUTH_FAILURE' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'REQUEST_AUTH':
      return { ...state, isLoading: true };
    case 'AUTH_SUCCESS':
      // local storage: temporary for mock-implementation
      localStorage.setItem('auth', JSON.stringify(true));
      return { ...state, isAuthenticated: true, isLoading: false };
    case 'AUTH_FAILURE':
      return { ...state, isAuthenticated: false, isLoading: false, error: 'Auth Error' };
    default:
      return state;
  }
};

export default authReducer;
