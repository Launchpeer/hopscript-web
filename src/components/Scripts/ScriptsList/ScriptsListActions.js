import Parse from 'parse';

import {
  SCRIPTS_ERROR,
  SCRIPTS_LOADING,
  SCRIPTS_LOAD_END,
  SCRIPTS_LIST_UPDATE
} from './ScriptsListTypes';


function _scriptsError(err) {
  return {
    type: SCRIPTS_ERROR,
    payload: err
  };
}

function _scriptsLoading() {
  return {
    type: SCRIPTS_LOADING
  };
}

function _scriptsLoadEnd() {
  return {
    type: SCRIPTS_LOAD_END
  };
}

function _scriptsListUpdate(s) {
  return {
    type: SCRIPTS_LIST_UPDATE,
    payload: s
  };
}


const fetchScripts = () => (dispatch) => {
  dispatch(_scriptsLoading());
  Parse.Cloud.run("fetchScripts")
    .then((r) => {
      dispatch(_scriptsLoadEnd());
      dispatch(_scriptsListUpdate(r));
    })
    .catch((e) => {
      dispatch(_scriptsLoadEnd());
      dispatch(_scriptsError(e));
    });
};

const fetchBrokerScripts = () => (dispatch) => {
  dispatch(_scriptsLoading());
  Parse.Cloud.run("fetchBrokerScripts")
    .then((r) => {
      dispatch(_scriptsLoadEnd());
      dispatch(_scriptsListUpdate(r));
    })
    .catch((e) => {
      dispatch(_scriptsLoadEnd());
      dispatch(_scriptsError(e));
    });
};

const removeScript = id => (dispatch) => {
  dispatch(_scriptsLoading());
  Parse.Cloud.run("deleteScript", { id })
    .then((r) => {
      dispatch(_scriptsLoadEnd());
      dispatch(_scriptsListUpdate(r));
    })
    .catch((e) => {
      dispatch(_scriptsLoadEnd());
      dispatch(_scriptsError(e));
    });
};

export { fetchScripts, fetchBrokerScripts, removeScript };
