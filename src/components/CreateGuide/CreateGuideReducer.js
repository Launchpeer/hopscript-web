import {
  GUIDE_LOAD_END,
  GUIDE_CREATE_ERROR,
  GUIDE_CLEAR_ERROR,
  GUIDE_LOADING
} from './CreateGuideTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case GUIDE_CLEAR_ERROR:
      return { ...state, error: null };
    case GUIDE_CREATE_ERROR:
      return { ...state, error: action.payload };
    case GUIDE_LOAD_END:
      return { ...state, loading: false };
    case GUIDE_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
