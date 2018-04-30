import {
  LOCALE_LOAD_END,
  LOCALE_CREATE_ERROR,
  LOCALE_CLEAR_ERROR,
  LOCALE_LOADING,
  LOCALE_UPDATE,
  LOCALE_FETCH_ERR
} from './LocaleTypes';

const INITIAL_STATE = {
  loading: false,
  locales: null,
  error: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOCALE_CLEAR_ERROR:
      return { ...state, error: null };
    case LOCALE_CREATE_ERROR:
      return { ...state, error: action.payload };
    case LOCALE_LOAD_END:
      return { ...state, loading: false };
    case LOCALE_LOADING:
      return { ...state, loading: true };
    case LOCALE_UPDATE:
      return { ...state, locales: action.payload };
    case LOCALE_FETCH_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
