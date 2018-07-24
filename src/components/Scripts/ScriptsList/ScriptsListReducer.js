import {
  SCRIPTS_ERROR,
  SCRIPTS_CLEAR_ERROR,
  SCRIPTS_LOADING,
  SCRIPTS_LOAD_END,
  SCRIPTS_LIST_UPDATE,
  SCRIPTS_LIST_UPDATE_BROKERAGE
} from './ScriptsListTypes';

const INITIAL_STATE = {
  error: '',
  loading: false,
  scripts: [],
  brokerageScripts: []
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
    case SCRIPTS_LIST_UPDATE_BROKERAGE:
      return { ...state, brokerageScripts: action.payload };
    default:
      return state;
  }
}
