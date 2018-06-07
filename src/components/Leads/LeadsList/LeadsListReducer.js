import {
  LEADS_ADD_LOAD_END,
  LEADS_ADD_ERROR,
  LEADS_ADD_CLEAR_ERROR,
  LEADS_ADD_LOADING,
  CURRENT_LEAD,
  CURRENT_LEAD_GROUP
} from './LeadsListTypes';

const INITIAL_STATE = {
  error: '',
  loading: false,
  lead: null,
  leadGroup: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LEADS_ADD_CLEAR_ERROR:
      return { ...state, error: null };
    case LEADS_ADD_ERROR:
      return { ...state, error: action.payload };
    case LEADS_ADD_LOAD_END:
      return { ...state, loading: false };
    case LEADS_ADD_LOADING:
      return { ...state, loading: true };
    case CURRENT_LEAD:
      return { ...state, lead: action.payload };
    case CURRENT_LEAD_GROUP:
      return { ...state, leadGroup: action.payload };
    default:
      return state;
  }
}
