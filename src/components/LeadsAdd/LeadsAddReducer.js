import {
  LEADS_ADD_ERROR,
  LEADS_ADD_CLEAR_ERROR,
  LEADS_ADD_LOADING,
  LEADS_ADD_LOAD_END,
  LEAD_SET_CURRENT
} from './LeadsAddTypes';

const INITIAL_STATE = {
  error: '',
  loading: false,
  lead: null
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
    case LEAD_SET_CURRENT:
      return { ...state, lead: action.payload };
    default:
      return state;
  }
}
