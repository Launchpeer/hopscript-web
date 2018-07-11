import Parse from 'parse';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { TWILIO_SERVER_URL } from '../../config/globals';

import {
  CALL_LOADING,
  CALL_ERROR,
  CALL_LOAD_END,
  CALL_UPDATE,
  CALL_LEAD_GROUP_INDEX_UPDATE,
  CALL_LEAD_GROUP_UPDATE,
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

function _callUpdate(c) {
  return {
    type: CALL_UPDATE,
    payload: c
  };
}

function _setCurrentLeadGroup(leadGroup) {
  return {
    type: CALL_LEAD_GROUP_UPDATE,
    payload: leadGroup
  };
}

function _setLeadGroupIndex(idx) {
  return {
    type: CALL_LEAD_GROUP_INDEX_UPDATE,
    payload: idx
  };
}

const currentCallUpdate = call => (dispatch) => {
  dispatch(_callUpdate(call));
};

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
  Parse.Cloud.run("fetchCall", ({ callId }))
    .then((call) => {
      dispatch(_callLoadEnd());
      dispatch(_callUpdate(call));
    })
    .catch(err => dispatch(_callError(err)));
};

const fetchToken = () => () => axios.get(`${TWILIO_SERVER_URL}/token`).then(data => data.data.token);

const startACall = (number, callId, conferenceName) => (dispatch) => {
  axios({
    method: 'post',
    url: `${TWILIO_SERVER_URL}/start-call`,
    data: { number, callId, conferenceName }
  }).then(() => {
    dispatch(fetchCall(callId));
  });
};


const playAudio = (callSid, conferenceSid, audioUrl) => (dispatch) => {
  axios({
    method: 'post',
    url: `${TWILIO_SERVER_URL}/bot`,
    data: { callSid, conferenceSid, audioUrl }
  }).then(data => (data)).catch(err => dispatch(_callError(err)));
};

const stopAudio = (callSid, conferenceSid) => (dispatch) => {
  axios({
    method: 'post',
    url: `${TWILIO_SERVER_URL}/stop`,
    data: { callSid, conferenceSid }
  }).then(data => (data)).catch(err => dispatch(_callError(err)));
};


const fetchQuestion = questionId => (dispatch) => {
  Parse.Cloud.run("fetchQuestion", ({ questionId }))
    .then((question) => {
      dispatch({
        type: CURRENT_QUESTION_UPDATE,
        payload: question
      });
    })
    .catch(err => dispatch(_callError(err)));
};

const setCurrentQuestion = question => (dispatch) => {
  dispatch({
    type: CURRENT_QUESTION_UPDATE,
    payload: question
  });
};

const hangUpCall = (callId, notes, endTime, noAnswer, leadGroup) => (dispatch) => {
  Parse.Cloud.run("updateCall", ({
    callId,
    notes,
    endTime,
    noAnswer,
    leadGroup
  }))
    .then((call) => {
      dispatch(_callUpdate(call));
    }).catch(err => dispatch(_callError(err)));
};


const startLeadGroupCalls = d => (dispatch) => {
  dispatch({
    type: 'CALL_UPDATE_TYPE',
    payload: 'leadGroup'
  });
  Parse.Cloud.run("fetchLeadGroup", ({ leadGroup: d.leadGroup }))
    .then((leadGroup) => {
      const currentLead = leadGroup.attributes.leads[0];
      dispatch(_setCurrentLeadGroup(leadGroup));
      dispatch(_setLeadGroupIndex(0));
      dispatch(startCall({ ...d, lead: { id: currentLead.id } }));
    });
};

const nextLeadGroupCall = (leadGroup, leadGroupIndex) => (dispatch) => {
  if (leadGroupIndex < leadGroup.attributes.leads.length - 1) {
    const nextLeadIndex = leadGroupIndex + 1;
    dispatch(_setLeadGroupIndex(nextLeadIndex));
    browserHistory.push('/next-call');
  } else {
    browserHistory.push('/start-call');
  }
};

export {
  startCall,
  fetchCall,
  setCurrentQuestion,
  fetchQuestion,
  fetchToken,
  startACall,
  startLeadGroupCalls,
  nextLeadGroupCall,
  hangUpCall,
  playAudio,
  stopAudio,
  currentCallUpdate
};
