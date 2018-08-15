import {
  AGENTS_LIST_LOAD_END,
  AGENTS_LIST_ERROR,
  AGENTS_LIST_CLEAR_ERROR,
  AGENTS_LIST_LOADING
} from './AgentsListTypes';

const INITIAL_STATE = {
  error: '',
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AGENTS_LIST_CLEAR_ERROR:
      return { ...state, error: null };
    case AGENTS_LIST_ERROR:
      return { ...state, error: action.payload };
    case AGENTS_LIST_LOAD_END:
      return { ...state, loading: false };
    case AGENTS_LIST_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
