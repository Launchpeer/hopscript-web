import {
  CALL_UPDATE,
  CALL_LOADING,
  CALL_LOAD_END,
  CURRENT_QUESTION_UPDATE,
  CALL_LEAD_GROUP_INDEX_UPDATE,
  CALL_LEAD_GROUP_UPDATE,
  CALL_LEAD_GROUP_DETAILS,
  CALL_UPDATE_TYPE,
  SET_TOKEN
} from './CallTypes';

const INITIAL_STATE = {
  loading: false,
  currentScript: null,
  currentQuestion: null,
  currentCall: null,
  leadGroup: null,
  leadGroupIndex: 0,
  callType: 'lead',
  token: null,
  leadGroupDetails: null
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
    case CALL_LEAD_GROUP_UPDATE:
      return { ...state, leadGroup: action.payload };
    case CALL_LEAD_GROUP_DETAILS:
      return { ...state, leadGroupDetails: action.payload };
    case CALL_LEAD_GROUP_INDEX_UPDATE:
      return { ...state, leadGroupIndex: action.payload };
    case CALL_UPDATE_TYPE:
      return { ...state, callType: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
