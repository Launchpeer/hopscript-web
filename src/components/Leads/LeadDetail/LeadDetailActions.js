import Parse from 'parse';

import {
  LEAD_DETAIL_LOADING,
  LEAD_DETAIL_LOAD_END,
  LEAD_DETAIL_UPDATE,
  LEAD_DETAIL_ERROR,
  LEAD_DETAIL_CLEAR_ERROR
} from './LeadDetailTypes';

function _leadDetailLoading() {
  return {
    type: LEAD_DETAIL_LOADING
  };
}

function _leadDetailLoadEnd() {
  return {
    type: LEAD_DETAIL_LOAD_END
  };
}

function _leadDetailError(error) {
  return {
    type: LEAD_DETAIL_ERROR,
    payload: error
  };
}

function _leadDetailClearError() {
  return {
    type: LEAD_DETAIL_CLEAR_ERROR
  };
}

function _updatedLead(l) {
  return {
    type: LEAD_DETAIL_UPDATE,
    payload: l
  };
}

export const updateLead = (leadGroup, lead) => (dispatch) => {
  dispatch(_leadDetailLoading());
  Parse.Cloud.run("updateLead", ({ leadGroup, lead }))
    .then((l) => {
      dispatch(_leadDetailLoadEnd());
      dispatch(_updatedLead(l));
    })
    .catch((e) => {
      dispatch(_leadDetailLoadEnd());
      dispatch(_leadDetailError(e));
    });
};

export const removeGroupFromLead = (leadGroup, lead) => (dispatch) => {
  dispatch(_leadDetailLoading());
  Parse.Cloud.run("removeGroupFromLead", ({ leadGroup, lead }))
    .then((l) => {
      dispatch(_leadDetailLoadEnd());
      dispatch(_updatedLead(l));
    })
    .catch((e) => {
      dispatch(_leadDetailLoadEnd());
      dispatch(_leadDetailError(e));
    });
};
