import {
  AGENT_PROFILE_UPDATE_LOAD_END,
  AGENT_PROFILE_UPDATE_ERROR,
  AGENT_PROFILE_UPDATE_CLEAR_ERROR,
  AGENT_PROFILE_UPDATE_LOADING,
  FETCH_BROKERAGE
} from './AgentProfileTypes';

const INITIAL_STATE = {
  error: '',
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AGENT_PROFILE_UPDATE_CLEAR_ERROR:
      return { ...state, error: null };
    case AGENT_PROFILE_UPDATE_ERROR:
      switch (action.payload.code) {
        case 202:
          return {
            ...state,
            error: { message: 'Already in use on another account' }
          };
        default:
          return { ...state, error: action.payload };
      }
    case AGENT_PROFILE_UPDATE_LOAD_END:
      return { ...state, loading: false };
    case AGENT_PROFILE_UPDATE_LOADING:
      return { ...state, loading: true };
    case FETCH_BROKERAGE:
      return { ...state, brokerage: action.payload };
    default:
      return state;
  }
}
