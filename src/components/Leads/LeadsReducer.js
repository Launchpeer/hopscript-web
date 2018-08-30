import {
  LEADS_ERROR,
  LEADS_CLEAR_ERROR,
  LEADS_LOADING,
  LEADS_LOAD_END,
  LEAD_DETAIL_UPDATE,
  LEAD_LIST_UPDATE,
  LEAD_GROUP_DETAIL_UPDATE,
  LEAD_GROUP_LIST_UPDATE,
  MY_LEAD_GROUPS,
  MY_LEADS,
  LEADS_TO_ADD,
  LEAD_LEADGROUP_UPDATE,
  CLEAR_LEADS_TO_ADD,
  LEADS_LIST_SUCCESS,
  CSV_LOADING,
  CSV_LOAD_END
} from './LeadsTypes';


const INITIAL_STATE = {
  error: '',
  err: '',
  loading: false,
  csvLoading: false,
  lead: null,
  leads: [],
  leadGroup: null,
  leadGroups: [],
  myLeadGroups: [],
  myLeads: [],
  leadsToAdd: [],
  leadsListSuccess: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LEADS_ERROR:
      return { ...state, error: action.payload, err: action.payload };
    case LEADS_CLEAR_ERROR:
      return { ...state, error: null };
    case LEADS_LOADING:
      return { ...state, loading: true };
    case LEADS_LOAD_END:
      return { ...state, loading: false };
    case CSV_LOADING:
      return { ...state, csvLoading: true };
    case CSV_LOAD_END:
      return { ...state, csvLoading: false };
    case LEAD_DETAIL_UPDATE:
      return { ...state, lead: action.payload };
    case LEAD_LIST_UPDATE:
      return { ...state, leads: action.payload };
    case LEAD_GROUP_DETAIL_UPDATE:
      return { ...state, leadGroup: action.payload };
    case LEAD_GROUP_LIST_UPDATE:
      return { ...state, leadGroups: action.payload };
    case MY_LEAD_GROUPS:
      return { ...state, myLeadGroups: action.payload };
    case MY_LEADS:
      return { ...state, myLeads: action.payload };
    case LEADS_TO_ADD:
      return { ...state, leadsToAdd: [...state.leadsToAdd, action.payload] };
    case CLEAR_LEADS_TO_ADD:
      return { ...state, leadsToAdd: null };
    case LEAD_LEADGROUP_UPDATE:
      return { ...state, leadsToAdd: action.payload };
    case LEADS_LIST_SUCCESS:
      return { ...state, leadsListSuccess: action.payload };
    default:
      return state;
  }
}
