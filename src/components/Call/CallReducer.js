import {
  UPDATE_CURRENT_SCRIPT,
  UPDATE_CURRENT_QUESTION,
  CALL_UPDATE,
  CALL_LOADING,
  CALL_LOAD_END,
  CURRENT_QUESTION_UPDATE
} from './CallTypes';

const INITIAL_STATE = {
  loading: false,
  currentScript: null,
  currentQuestion: null,
  currentCall: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CALL_UPDATE:
      return { ...state, currentCall: action.payload };
    case CALL_LOADING:
      return { ...state, loading: true };
    case CALL_LOAD_END:
      return { ...state, loading: false };
    case CURRENT_QUESTION_UPDATE:
      return { ...state, currentQuestion: action.payload };
    default:
      return state;
  }
}
