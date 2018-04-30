import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  AUTH_LOADING,
  RESET_SUCCESS,
  FORGOT_EMAIL_SUCCESS
} from './AuthTypes';

const INITIAL_STATE = {
  loading: false,
  error: '',
  authenticated: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: '',
        loading: false,
        success: null
      };
    case FORGOT_EMAIL_SUCCESS:
      return { ...state, loading: false, success: 'If an account exists with that email address, you will receive a reset link shortly.' };
    case AUTH_LOADING:
      return { ...state, loading: true, success: null };
    case RESET_SUCCESS:
      return { ...state, loading: false, success: true };
    case UNAUTH_USER:
      return {
        ...state, authenticated: false, error: '', loading: false
      };
    case AUTH_ERROR:
      switch (action.payload.code) {
        case 101:
          return { ...state, error: { message: 'Email/ Password combination is incorrect' }, loading: false };
        case 202:
          return { ...state, error: { message: 'Email already exists, please log in with your email and password. If you forgot your password, use the link below to reset it' }, loading: false };
        default:
          return { ...state, error: action.payload, loading: false };
      }
    case CLEAR_ERROR:
      return { ...state, error: '' };
    default:
      return state;
  }
}
