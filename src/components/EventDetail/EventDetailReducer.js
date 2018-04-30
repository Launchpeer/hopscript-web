import {
  EVENT_DETAIL_ERROR,
  EVENT_DETAIL_CLEAR_ERROR,
  EVENT_DETAIL_LOADING,
  EVENT_DETAIL_LOAD_END,
  EVENT_DETAIL_SET_CURRENT,
  TICKET_TOTALS
} from './EventDetailTypes';

const INITIAL_STATE = {
  loading: false,
  currentEvent: {}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EVENT_DETAIL_CLEAR_ERROR:
      return { ...state, error: null };
    case EVENT_DETAIL_ERROR:
      return { ...state, error: action.payload };
    case EVENT_DETAIL_LOAD_END:
      return { ...state, loading: false };
    case EVENT_DETAIL_LOADING:
      return { ...state, loading: true };
    case EVENT_DETAIL_SET_CURRENT:
      return { ...state, currentEvent: action.payload };
    case TICKET_TOTALS:
      return { ...state, ticketTotals: action.payload };
    default:
      return state;
  }
}
