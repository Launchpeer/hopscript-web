import Parse from 'parse';

import { browserHistory } from 'react-router';
import axios from 'axios';
import { TWILIO_SERVER_URL } from '../../config/globals';

import {
  CALL_LOADING,
  CALL_ERROR,
  CALL_LOAD_END,
  CALL_UPDATE
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
  Parse.Cloud.run(
    "createCall", (
      {
        call:
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
  console.log('call id', callId);
  Parse.Cloud.run("fetchCall", ({ callId }))
    .then((call) => {
      dispatch(_callLoadEnd());
      dispatch(_callUpdate(call));
    })
    .catch(err => dispatch({ type: CALL_ERROR, payload: err }));
};

const fetchToken = () => dispatch => axios.get(`${TWILIO_SERVER_URL}/token`).then(data => data.data.token);

const startACall = number => () => axios({
  method: 'post',
  url: `${TWILIO_SERVER_URL}/voice`,
  data: { number }
})
  .then(data => (data));


export { startCall, fetchCall, fetchToken, startACall };
