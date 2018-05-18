import {
  LEAD_GROUP_LIST_LOAD_END,
  LEAD_GROUP_LIST_ERROR,
  LEAD_GROUP_LIST_CLEAR_ERROR,
  LEAD_GROUP_LIST_LOADING,
  LEAD_GROUP_LIST_UPDATE
} from './LeadGroupListTypes';

const INITIAL_STATE = {
  error: '',
  loading: false,
  leadGroups: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LEAD_GROUP_LIST_CLEAR_ERROR:
      return { ...state, error: null };
    case LEAD_GROUP_LIST_ERROR:
      return { ...state, error: action.payload };
    case LEAD_GROUP_LIST_LOAD_END:
      return { ...state, loading: false };
    case LEAD_GROUP_LIST_LOADING:
      return { ...state, loading: true };
    case LEAD_GROUP_LIST_UPDATE:
      return { ...state, leadGroups: action.payload };
    default:
      return state;
  }
}
