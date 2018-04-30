import { UPDATE_USER, CLEAR_USER } from './UserTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    case CLEAR_USER:
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
}
