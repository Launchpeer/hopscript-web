import Parse from 'parse';
import { browserHistory } from 'react-router';
import { reset } from 'redux-form';

import {
  EVENT_DETAIL_ERROR,
  EVENT_DETAIL_CLEAR_ERROR,
  EVENT_DETAIL_LOADING,
  EVENT_DETAIL_LOAD_END,
  EVENT_DETAIL_SET_CURRENT,
  EVENT_DETAIL_WINNER_GENERATED,
  TICKET_TOTALS
} from './EventDetailTypes';

function _eventDetailError(error) {
  return {
    type: EVENT_DETAIL_ERROR,
    payload: error
  };
}

function _setCurrentEvent(raffle) {
  return {
    type: EVENT_DETAIL_SET_CURRENT,
    payload: raffle
  };
}

export const clearError = () => ({
  type: EVENT_DETAIL_CLEAR_ERROR
});

function _eventDetailLoading() {
  return {
    type: EVENT_DETAIL_LOADING
  };
}

function _eventDetailLoadEnd() {
  return {
    type: EVENT_DETAIL_LOAD_END
  };
}

function _eventDetailWinnerGenerated(winner) {
  return {
    type: EVENT_DETAIL_WINNER_GENERATED,
    payload: winner
  };
}


export const fetchEvent = id => (dispatch) => {
  dispatch(_eventDetailLoading());
  const Raffle = Parse.Object.extend("Raffle");
  const query = new Parse.Query(Raffle);
  query.include('winner');
  query.get(id)
    .then((trainer) => {
      dispatch({
        type: EVENT_DETAIL_LOAD_END,
      });
      dispatch(_setCurrentEvent(trainer));
    })
    .catch((err) => {
      dispatch(_eventDetailError(err));
    });
};

export const updateRaffle = (fields, raffleObj) => (dispatch) => {
  dispatch(_eventDetailLoading());
  _reconcileRaffleToDB(fields, raffleObj)
    .then((raffle) => {
      dispatch(reset('updateRaffle')); // requires form name
      dispatch(clearError());
      dispatch(_eventDetailLoadEnd());
      dispatch(_setCurrentEvent(raffle));
    })
    .catch((createRaffleErr) => {
      console.log('createraffle ERR:', createRaffleErr);
      dispatch(_eventDetailError(createRaffleErr));
    });
};


function _reconcileRaffleToDB(fields, raffleObj) {
  return new Promise((resolve) => {
    if (fields.eventName) {
      raffleObj.set("eventName", fields.eventName);
    }
    if (fields.beneficiaryLogo && !fields.beneficiaryLogo[0]) {
      raffleObj.set("beneficiaryLogo", fields.beneficiaryLogo);
    }
    if (fields.beneficiaryName) {
      raffleObj.set("beneficiaryName", fields.beneficiaryName);
    }
    if (fields.startTime) {
      raffleObj.set("startTime", fields.startTime);
    }
    if (fields.endTime) {
      raffleObj.set("endTime", fields.endTime);
    }
    if (fields.location && fields.coordinates) {
      raffleObj.set("location", fields.location);
      raffleObj.set("coordinates", fields.coordinates);
    }
    if (fields.rate1Ticket) {
      raffleObj.set("rate1Ticket", fields.rate1Ticket);
    }
    if (fields.rate5Ticket) {
      raffleObj.set("rate5Ticket", fields.rate5Ticket);
    }
    if (fields.rate10Ticket) {
      raffleObj.set("rate10Ticket", fields.rate10Ticket);
    }
    if (fields.rate15Ticket) {
      raffleObj.set("rate15Ticket", fields.rate15Ticket);
    }
    if (fields.rate20Ticket) {
      raffleObj.set("rate20Ticket", fields.rate20Ticket);
    }
    if (fields.rate25Ticket) {
      raffleObj.set("rate25Ticket", fields.rate25Ticket);
    }
    return resolve(raffleObj.save());
  });
}

export const deleteRaffle = objectId => (dispatch) => {
  dispatch(_eventDetailLoading());
  Parse.Cloud.run("removeItem", { objId: objectId, objClass: "Raffle" })
    .then((res) => {
      console.log(res);
      browserHistory.push("/dashboard");
      dispatch(_eventDetailLoadEnd());
    })
    .catch((err) => {
      console.log('delete profile err', err);
    });
};

export const generateWinner = (objId, name) => (dispatch) => {
  dispatch(_eventDetailLoading());
  Parse.Cloud.run("generateWinner", { objId, name })
    .then((raffle) => {
      dispatch(_eventDetailLoadEnd());
      dispatch(_setCurrentEvent(raffle));
    })
    .catch((err) => {
      console.log('generate winner err', err);
    });
};

export const fetchMoneyRaised = raffleId => (dispatch) => {
  Parse.Cloud.run("fetchRaffleStats", { raffleId })
    .then((raffleStats) => {
      dispatch({
        type: TICKET_TOTALS,
        payload: raffleStats
      });
    })
    .catch((err) => {
      console.log('generate winner err', err);
    });
};
