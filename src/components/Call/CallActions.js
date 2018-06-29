import Parse from 'parse';
import { browserHistory} from 'react-router';

import {
  CALL_LOADING,
  CALL_ERROR,
  CALL_LOAD_END,
  CALL_UPDATE,
  CURRENT_QUESTION_UPDATE
} from './CallTypes';

function _callError(err) {
  return {
    type: CALL_ERROR,
    payload: err
  };
}

function _callLoading() {
  return {
    type: CALL_LOADING
  };
}

function _callLoadEnd() {
  return {
    type: CALL_LOAD_END
  };
}


function _callLoading() {
  return {
    type: CALL_LOADING
  };
}

function _callUpdate(c) {
  return {
    type: CALL_UPDATE,
    payload: c
  };
}

const startCall = call => (dispatch) => {
  dispatch(_callLoading());
  Parse.Cloud.run("createCall", (
    { call:
      {
        ...call,
        lead: call.lead.id
      }
    })
  )
    .then((newCall) => {
      dispatch(_callLoadEnd());
      dispatch(_callUpdate(newCall));
      browserHistory.push(`/in-call/${newCall.id}`);
    })
    .catch(err => dispatch({ type: CALL_ERROR, payload: err }));
};

const fetchCall = callId => (dispatch) => {
  dispatch(_callLoading());
  Parse.Cloud.run("fetchCall", ({ callId }))
    .then((call) => {
      dispatch(_callLoadEnd());
      dispatch(_callUpdate(call));
    })
    .catch(err => dispatch({ type: CALL_ERROR, payload: err }));
}

const fetchQuestion = questionId => dispatch => {
  Parse.Cloud.run("fetchQuestion", ({ questionId }))
    .then((question) => {
      dispatch({
        type: CURRENT_QUESTION_UPDATE,
        payload: question
      });
    })
    .catch(err => dispatch({ type: CALL_ERROR, payload: err }));
}

const setCurrentQuestion = question => dispatch => {
  dispatch({
    type: CURRENT_QUESTION_UPDATE,
    payload: question
  });
}

export { startCall, fetchCall, setCurrentQuestion };
