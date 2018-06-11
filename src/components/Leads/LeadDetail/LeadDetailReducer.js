import {
  LEAD_DETAIL_LOADING,
  LEAD_DETAIL_LOAD_END,
  LEAD_DETAIL_UPDATE,
  LEAD_DETAIL_CLEAR_ERROR,
  LEAD_DETAIL_ERROR
} from './LeadDetailTypes';

const INITIAL_STATE = {
  error: '',
  loading: false,
  lead: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LEAD_DETAIL_CLEAR_ERROR:
      return { ...state, error: null };
    case LEAD_DETAIL_ERROR:
      return { ...state, error: action.payload };
    case LEAD_DETAIL_LOAD_END:
      return { ...state, loading: false };
    case LEAD_DETAIL_LOADING:
      return { ...state, loading: true };
    case LEAD_DETAIL_UPDATE:
      return { ...state, lead: action.payload };
    default:
      return state;
  }
}
