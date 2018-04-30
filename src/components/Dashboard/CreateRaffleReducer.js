import {
  RAFFLE_LOADING,
  RAFFLE_LOAD_END,
  RAFFLE_ERROR,
  SET_CURRENT_RAFFLE,
  CLEAR_CURRENT_RAFFLE,
  RAFFLE_LIST
} from './CreateRaffleTypes';

const INITIAL_STATE = {
  loading: false,
  currentRaffle: {},
  raffleList: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RAFFLE_LOADING:
      return { ...state, loading: true };
    case RAFFLE_LOAD_END:
      return { ...state, loading: false };
    case RAFFLE_ERROR:
      return { ...state, error: action.payload };
    case SET_CURRENT_RAFFLE:
      return { ...state, currentRaffle: action.payload };
    case CLEAR_CURRENT_RAFFLE:
      return { ...state, currentRaffle: {} };
    case RAFFLE_LIST:
      return { ...state, raffleList: action.payload };
    default:
      return state;
  }
}
