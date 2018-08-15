import {
  STRIPE_LOADING,
  STRIPE_SUCCESS,
  STRIPE_ERROR
} from './StripeTypes';

export default function (state = { loading: false, error: false }, action) {
  switch (action.type) {
    case STRIPE_LOADING:
      return {
        ...state,
        loading: true
      };
    case STRIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case STRIPE_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
