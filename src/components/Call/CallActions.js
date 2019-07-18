import Parse from 'parse';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { TWILIO_SERVER_URL } from '../../config/globals';

import {
  CALL_ERROR,
  CALL_LEAD_GROUP_UPDATE,
  CALL_LOADING,
  CALL_LOAD_END,
  CALL_UPDATE,
  CURRENT_QUESTION_UPDATE,
  SET_TOKEN,
  PREVIOUS_QUESTION_UPDATE,
} from './CallTypes';

const currentCallUpdate = call => (dispatch) => {
  dispatch(_callUpdate(call));
};

const fetchAndSetToken = () => dispatch => new Promise((resolve) => {
  dispatch(fetchToken())
    .then((token) => {
      resolve(dispatch(_setCurrentToken(token)));
    }).catch(err => dispatch(_callError(err)));
});

const fetchCall = callId => (dispatch) => {
  dispatch(_callLoading());
  Parse.Cloud.run("fetchCall", ({ callId }))
    .then((call) => {
      dispatch(_callLoadEnd());
      dispatch(_callUpdate(call));
    })
    .catch(err => dispatch(_callError(err)));
};

const fetchQuestion = questionId => (dispatch) => {
  dispatch(_callLoading());
  Parse.Cloud.run("fetchQuestion", ({ questionId }))
    .then((question) => {
      dispatch(_callLoadEnd());
      dispatch({
        type: CURRENT_QUESTION_UPDATE,
        payload: question
      });
    })
    .catch(err => dispatch(_callError(err)));
};

const fetchToken = () => () => axios.get(`${TWILIO_SERVER_URL}/token`).then(data => data.data.token).catch(err => console.log('ERROR TOKEN', err));


const hangUpCall = (callId, notes, endTime, noAnswer, leadGroup) => (dispatch) => {
  dispatch(_callLoading());
  dispatch(_clearToken());
  dispatch(_clearCall());
  Parse.Cloud.run("updateCall", ({
    callId,
    notes,
    endTime,
    noAnswer,
    leadGroup
  })).then(() => dispatch(_callLoadEnd()))
    .catch(err => dispatch(_callError(err)));
};

const hangUpLGCall = (callId, notes, endTime, noAnswer, leadGroup) => (dispatch) => {
  dispatch(_callLoading());
  dispatch(_clearToken());
  Parse.Cloud.run("updateCall", ({
    callId,
    notes,
    endTime,
    noAnswer,
    leadGroup
  })).then(() => dispatch(_callLoadEnd()))
    .catch(err => dispatch(_callError(err)));
};

const nextLeadGroupCall = d => (dispatch) => {
  dispatch(_callLoading());
  dispatch({
    type: 'CALL_UPDATE_TYPE',
    payload: 'leadGroup'
  });
  Parse.Cloud.run("fetchLeadGroup", ({ leadGroup: d.leadGroup }))
    .then((leadGroup) => {
      dispatch(_callLoadEnd);
      dispatch(_setCurrentLeadGroup(leadGroup));
      dispatch(startCall({ ...d }));
    });
};


const playAudio = (callSid, conferenceSid, audioURI) => (dispatch) => {
  axios({
    method: 'post',
    url: `${TWILIO_SERVER_URL}/bot`,
    data: { callSid, conferenceSid, audioURI }
  }).then(data => data).catch(err => dispatch(_callError(err)));
};

const setCurrentQuestion = question => (dispatch) => {
  dispatch({
    type: CURRENT_QUESTION_UPDATE,
    payload: question
  });
};

const goToPreviousQuestion = questionData => (dispatch) => {
  dispatch({
    type: PREVIOUS_QUESTION_UPDATE,
    payload: questionData
  });
};

const startACall = (number, callId, conferenceName) => (dispatch) => {
  dispatch(_callLoading());
  axios({
    method: 'post',
    url: `${TWILIO_SERVER_URL}/start-call`,
    data: { number, callId, conferenceName }
  }).then(() => {
    dispatch(_callLoadEnd());
    dispatch(fetchCall(callId));
  });
};

const startCall = call => (dispatch) => {
  dispatch(_callLoading());
  Parse.Cloud.run("createCall", ({
    call: {
      ...call,
      lead: call.lead.id
    }
  }))
    .then((newCall) => {
      dispatch(_callLoadEnd());
      dispatch(_callUpdate(newCall));
      browserHistory.push(`/in-call/${newCall.id}`);
    })
    .catch((err) => {
      console.log('ERROR IN STARTCALL', err);
      dispatch({ type: CALL_ERROR, payload: err });
    });
};


const startLeadGroupCalls = d => (dispatch) => {
  dispatch(_callLoading());
  dispatch({
    type: 'CALL_UPDATE_TYPE',
    payload: 'leadGroup'
  });
  Parse.Cloud.run("fetchLeadGroup", ({ leadGroup: d.leadGroup }))
    .then((leadGroup) => {
      dispatch(_callLoadEnd);
      const currentLead = leadGroup.attributes.leads[0];
      dispatch(_setCurrentLeadGroup(leadGroup));
      dispatch(startCall({ ...d, lead: { id: currentLead.id } }));
    });
};

const stopAudio = (callSid, conferenceSid) => (dispatch) => {
  axios({
    method: 'post',
    url: `${TWILIO_SERVER_URL}/stop`,
    data: { callSid, conferenceSid }
  }).then(data => (data)).catch(err => dispatch(_callError(err)));
};


function _callError(err) {
  return {
    type: CALL_ERROR,
    payload: err
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

function _clearCall() {
  return {
    type: CALL_UPDATE,
    payload: null
  };
}

function _clearToken() {
  return {
    type: SET_TOKEN,
    payload: null
  };
}

function _setCurrentLeadGroup(leadGroup) {
  return {
    type: CALL_LEAD_GROUP_UPDATE,
    payload: leadGroup
  };
}

function _setCurrentToken(token) {
  return {
    type: SET_TOKEN,
    payload: token
  };
}

export {
  currentCallUpdate,
  fetchAndSetToken,
  fetchCall,
  fetchQuestion,
  fetchToken,
  hangUpCall,
  hangUpLGCall,
  nextLeadGroupCall,
  playAudio,
  setCurrentQuestion,
  goToPreviousQuestion,
  startACall,
  startCall,
  startLeadGroupCalls,
  stopAudio,
};
