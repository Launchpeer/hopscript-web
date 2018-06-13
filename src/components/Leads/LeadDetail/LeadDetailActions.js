import Parse from 'parse';

import {
  LEAD_DETAIL_LOADING,
  LEAD_DETAIL_LOAD_END,
  LEAD_DETAIL_UPDATE,
  LEAD_GROUP_DETAIL_UPDATE,
  LEAD_DETAIL_ERROR,
  MY_LEAD_GROUP_DETAIL_UPDATE
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


function _updatedLead(l) {
  return {
    type: LEAD_DETAIL_UPDATE,
    payload: l
  };
}

function _updatedLeadGroups(lg) {
  return {
    type: LEAD_GROUP_DETAIL_UPDATE,
    payload: lg
  };
}

function _updateMyLeadGroups(lg) {
  return {
    type: MY_LEAD_GROUP_DETAIL_UPDATE,
    payload: lg
  };
}

const fetchLead = lead => (dispatch) => {
  dispatch(_leadDetailLoading());
  Parse.Cloud.run("fetchLead", ({ lead }))
    .then((l) => {
      dispatch(_leadDetailLoadEnd());
      dispatch(_updatedLead(l));
      dispatch(_updateMyLeadGroups(l.attributes.leadGroups));
    })
    .catch((e) => {
      dispatch(_leadDetailLoadEnd());
      dispatch(_leadDetailError(e));
    });
};

export const fetchLeadGroups = () => (dispatch) => {
  dispatch(_leadDetailLoading());
  Parse.Cloud.run("fetchLeadGroups")
    .then((lg) => {
      dispatch(_leadDetailLoadEnd());
      dispatch(_updatedLeadGroups(lg));
    })
    .catch((e) => {
      dispatch(_leadDetailLoadEnd());
      dispatch(_leadDetailError(e));
    });
};

export const updateLead = (data, lead) => (dispatch) => {
  const {
    phone, leadGroup, email, name, leadType
  } = data;
  dispatch(_leadDetailLoading());
  Parse.Cloud.run("updateLead", ({
    phone, leadGroup, email, name, leadType, lead
  }))
    .then(() => {
      dispatch(fetchLead(lead));
      dispatch(_leadDetailLoadEnd());
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
      dispatch(_updateMyLeadGroups(l.attributes.leadGroups));
    })
    .catch((e) => {
      dispatch(_leadDetailLoadEnd());
      dispatch(_leadDetailError(e));
    });
};

export const deleteLead = lead => (dispatch) => {
  dispatch(_leadDetailLoading());
  Parse.Cloud.run("deleteLead", ({ lead }))
    .then(() => {
      dispatch(_leadDetailLoadEnd());
    })
    .catch((e) => {
      dispatch(_leadDetailLoadEnd());
      dispatch(_leadDetailError(e));
    });
};

export { fetchLead };
