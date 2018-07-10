import {
  HISTORY_ERROR,
  HISTORY_CLEAR_ERROR,
  HISTORY_LOADING,
  HISTORY_LOAD_END,
  HISTORY_LIST_UPDATE,
} from './HistoryTypes';


const INITIAL_STATE = {
  error: '',
  loading: false,
  historyItems: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case HISTORY_ERROR:
      return { ...state, error: action.payload };
    case HISTORY_CLEAR_ERROR:
      return { ...state, error: null };
    case HISTORY_LOADING:
      return { ...state, loading: true };
    case HISTORY_LOAD_END:
      return { ...state, loading: false };
    case HISTORY_LIST_UPDATE:
      return { ...state, historyItems: action.payload };
    default:
      return state;
  }
}
