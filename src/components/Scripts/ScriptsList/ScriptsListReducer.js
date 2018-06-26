import {
  SCRIPTS_ERROR,
  SCRIPTS_CLEAR_ERROR,
  SCRIPTS_LOADING,
  SCRIPTS_LOAD_END,
  SCRIPTS_LIST_UPDATE
} from './ScriptsListTypes';

const INITIAL_STATE = {
  error: '',
  loading: false,
  scripts: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SCRIPTS_ERROR:
      return { ...state, error: action.payload };
    case SCRIPTS_CLEAR_ERROR:
      return { ...state, error: null };
    case SCRIPTS_LOADING:
      return { ...state, loading: true };
    case SCRIPTS_LOAD_END:
      return { ...state, loading: false };
    case SCRIPTS_LIST_UPDATE:
      return { ...state, scripts: action.payload };
    default:
      return state;
  }
}
