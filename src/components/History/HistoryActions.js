import Parse from 'parse';

import {
  HISTORY_ERROR,
  HISTORY_CLEAR_ERROR,
  HISTORY_LOADING,
  HISTORY_LOAD_END,
  HISTORY_LIST_UPDATE,
} from './HistoryTypes';


function _historyError(err) {
  return {
    type: HISTORY_ERROR,
    payload: err
  };
}

function _historyClearError() {
  return {
    type: HISTORY_CLEAR_ERROR
  };
}

function _historyLoading() {
  return {
    type: HISTORY_LOADING
  };
}

function _historyLoadEnd() {
  return {
    type: HISTORY_LOAD_END
  };
}

function _historyListUpdate(h) {
  return {
    type: HISTORY_LIST_UPDATE,
    payload: h
  };
}


const clearError = () => (dispatch) => {
  dispatch(_historyClearError());
};


const fetchHistory = () => (dispatch) => {
  dispatch(_historyLoading());
  Parse.Cloud.run("fetchHistory")
    .then((h) => {
      dispatch(_historyLoadEnd());
      dispatch(_historyListUpdate(h));
    })
    .catch((e) => {
      dispatch(_historyLoadEnd());
      dispatch(_historyError(e));
    });
};


export {
  clearError,
  fetchHistory
};
