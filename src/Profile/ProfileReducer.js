import {
  PROFILE_UPDATE_LOAD_END,
  PROFILE_UPDATE_ERROR,
  PROFILE_UPDATE_CLEAR_ERROR,
  PROFILE_UPDATE_LOADING
} from './ProfileTypes';

const INITIAL_STATE = {
  error: '',
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROFILE_UPDATE_CLEAR_ERROR:
      return { ...state, error: null };
    case PROFILE_UPDATE_ERROR:
      return { ...state, error: action.payload };
    case PROFILE_UPDATE_LOAD_END:
      return { ...state, loading: false };
    case PROFILE_UPDATE_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
