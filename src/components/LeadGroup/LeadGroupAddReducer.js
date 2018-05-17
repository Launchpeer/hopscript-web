import {
  LEAD_GROUP_ADD_ERROR,
  LEAD_GROUP_ADD_CLEAR_ERROR,
  LEAD_GROUP_ADD_LOADING,
  LEAD_GROUP_ADD_LOAD_END
} from './LeadGroupAddTypes';

const INITIAL_STATE = {
  error: '',
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LEAD_GROUP_ADD_CLEAR_ERROR:
      return { ...state, error: null };
    case LEAD_GROUP_ADD_ERROR:
      return { ...state, error: action.payload };
    case LEAD_GROUP_ADD_LOAD_END:
      return { ...state, loading: false };
    case LEAD_GROUP_ADD_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
