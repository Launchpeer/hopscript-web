import {
  AGENTS_ADD_LOAD_END,
  AGENTS_ADD_ERROR,
  AGENTS_ADD_CLEAR_ERROR,
  AGENTS_ADD_LOADING
} from './AgentsListTypes';

const INITIAL_STATE = {
  error: '',
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AGENTS_ADD_CLEAR_ERROR:
      return { ...state, error: null };
    case AGENTS_ADD_ERROR:
      return { ...state, error: action.payload };
    case AGENTS_ADD_LOAD_END:
      return { ...state, loading: false };
    case AGENTS_ADD_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
