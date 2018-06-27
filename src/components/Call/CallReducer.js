import {
  UPDATE_CURRENT_SCRIPT,
  UPDATE_CURRENT_QUESTION
} from './CallTypes';

const INITIAL_STATE = {
  loading: false,
  currentScript: null,
  currentQuestion: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
