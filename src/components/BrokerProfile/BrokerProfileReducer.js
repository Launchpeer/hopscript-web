import {
  BROKER_PROFILE_UPDATE_LOAD_END,
  BROKER_PROFILE_UPDATE_ERROR,
  BROKER_PROFILE_UPDATE_CLEAR_ERROR,
  BROKER_PROFILE_UPDATE_LOADING
} from './BrokerProfileTypes';

const INITIAL_STATE = {
  error: '',
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BROKER_PROFILE_UPDATE_CLEAR_ERROR:
      return { ...state, error: null };
    case BROKER_PROFILE_UPDATE_ERROR:
      switch (action.payload.code) {
        case 202:
          return {
            ...state,
            error: { message: 'Already in use on another account' }
          };
        default:
          return { ...state, error: action.payload };
      }
    case BROKER_PROFILE_UPDATE_LOAD_END:
      return { ...state, loading: false };
    case BROKER_PROFILE_UPDATE_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
