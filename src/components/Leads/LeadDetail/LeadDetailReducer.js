import {
  LEAD_DETAIL_LOADING,
  LEAD_DETAIL_LOAD_END,
  LEAD_DETAIL_UPDATE,
  LEAD_GROUP_DETAIL_UPDATE,
  MY_LEAD_GROUP_DETAIL_UPDATE,
  LEAD_DETAIL_CLEAR_ERROR,
  LEAD_DETAIL_ERROR
} from './LeadDetailTypes';

const INITIAL_STATE = {
  error: '',
  loading: false,
  lead: null,
  leadGroups: [],
  myLeadGroups: []
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
    case LEAD_GROUP_DETAIL_UPDATE:
      return { ...state, leadGroups: action.payload };
    case MY_LEAD_GROUP_DETAIL_UPDATE:
      return { ...state, myLeadGroups: action.payload };
    default:
      return state;
  }
}
