import Parse from 'parse';
import Papa from 'papaparse';
import parsePhone from '../helpers/parsePhone';
import { fetchUser } from '../UserActions';

import {
  CLEAR_LEADS_TO_ADD,
  CSV_LOADING,
  CSV_LOAD_END,
  LEADS_CLEAR_ERROR,
  LEADS_ERROR,
  LEADS_LIST_SUCCESS,
  LEADS_LOADING,
  LEADS_LOAD_END,
  LEADS_TO_ADD,
  LEAD_COUNT,
  LEAD_DETAIL_UPDATE,
  LEAD_GROUP_DETAIL_UPDATE,
  LEAD_GROUP_LIST_UPDATE,
  LEAD_LEADGROUP_UPDATE,
  LEAD_LIST_UPDATE,
  MORE_LEADS,
  MORE_LEADS_LOADING,
  MY_LEAD_GROUPS
} from './LeadsTypes';


const addLeadToGroup = lead => (dispatch) => {
  dispatch(_leadsToAdd(lead));
};

const clearError = () => (dispatch) => {
  dispatch(_leadsClearError());
};

const createLead = lead => (dispatch) => {
  // LEADS
  dispatch(_leadsLoading());
  Parse.Cloud.run("createLead", ({ lead }))
    .then(() => {
      dispatch(_leadLoadEnd());
      dispatch(fetchLeads());
    })
    .catch(err => dispatch({ type: LEADS_ERROR, payload: err }));
};

const createLeadGroup = (leadGroup, leadsToAdd) => (dispatch) => {
  dispatch(_leadsLoading());
  Parse.Cloud.run("createLeadGroup", ({ leadGroup, leadsToAdd }))
    .then(() => {
      dispatch(_leadLoadEnd());
      dispatch(_clearLeadsToAdd());
      dispatch(fetchLeadGroups());
    })
    .catch(err => dispatch({ type: LEADS_ERROR, payload: err }));
};

const deleteLead = lead => (dispatch) => {
  dispatch(_leadsLoading());
  Parse.Cloud.run("deleteLead", ({ lead }))
    .then(() => {
      dispatch(fetchLeads());
    })
    .catch((e) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadsError(e));
    });
};

const deleteLeadGroup = leadGroup => (dispatch) => {
  dispatch(_leadsLoading());
  Parse.Cloud.run("deleteLeadGroup", ({ leadGroup }))
    .then(() => {
      dispatch(fetchLeadGroups());
    })
    .catch((e) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadsError(e));
    });
};


const fetchLead = lead => (dispatch) => {
  dispatch(_leadsLoading());
  Parse.Cloud.run("fetchLead", ({ lead }))
    .then((l) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadUpdate(l));
      dispatch(_myLeadGroups(l.attributes.leadGroups));
    })
    .catch((e) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadsError(e));
    });
};

const fetchLeadGroup = leadGroup => (dispatch) => {
  dispatch(_leadsLoading());
  Parse.Cloud.run("fetchLeadGroup", ({ leadGroup }))
    .then((lg) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadGroupUpdate(lg));
      dispatch(_myLeads(lg.attributes.leads));
    })
    .catch((e) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadsError(e));
    });
};


const fetchLeadGroups = () => (dispatch) => {
  dispatch(_leadsLoading());
  Parse.Cloud.run("fetchLeadGroups")
    .then((lg) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadGroupListUpdate(lg));
    })
    .catch((e) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadsError(e));
    });
};

const fetchLeads = () => (dispatch) => {
  dispatch(_leadsLoading());
  Parse.Cloud.run("fetchLeads")
    .then((r) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadListUpdate(r));
    })
    .catch((e) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadsError(e));
    });
};

const fetchNextLeads = (pageNumber, leads) => (dispatch) => {
  dispatch(_moreLeadsLoading(true));
  const skip = pageNumber * 50;
  Parse.Cloud.run("fetchNextLeads", { skip })
    .then((r) => {
      const allLeads = leads.concat(r);
      dispatch(_leadListUpdate(allLeads));
      if (r.length < 50) {
        dispatch(_showMoreLeads(false));
      } else {
        dispatch(_showMoreLeads(true));
      }
      dispatch(_moreLeadsLoading(false));
    }).catch((error) => {
      dispatch(_leadsError(error));
      dispatch(_showMoreLeads(true));
      dispatch(_moreLeadsLoading(false));
    });
};

const searchForLeads = searchStr => (dispatch) => {
  Parse.Cloud.run('searchForLeads', { searchStr })
    .then((r) => {
      console.log(r);
      dispatch(_leadListUpdate(r));
    });
};

const parseCSV = (csv, leadGroup) => (dispatch) => {
  /**
    * As an agent, I want to batch import leads via a csv file
    * First, The csv file is parsed to json with papaparse
    * Then, the eads parsed from the csv file are used to generate Lead objects in the db
    * Those Lead objects are then added to an Agent's leads pointer array
    * Finally, we fetch the updated user and rehydrate our redux store
    *
    * results.map creates an array of promises
    * promise.all will wait on all those promises to resolve before moving on
    * @param  {string} data csv file
    */
  dispatch(_csvLoading());
  _parseCSV(csv)
    .then((results) => {
      console.log(leadGroup);
      dispatch(_leadCount(results.length));
      Parse.Cloud.run('createLeadFromCSV', { leadCSV: results, leadGroup }).then(() => {
        dispatch(_leadCount(null));
        dispatch(fetchUser());
        dispatch(_csvLoadEnd());
        dispatch(_leadListSuccess(true));
        setTimeout(() => {
          dispatch(_leadListSuccess(false));
        }, 3000);
      })
        .catch((err) => {
          console.log("Eerr", err);
          dispatch(_leadsError(err));
        });
    })
    .catch(() => {
      dispatch(_leadsError({
        message:
            'It looks like the leads you uploaded were incorrectly formatted. Please use the Hopscript template as a guide to format your leads, or upload leads individually.'
      }));
    });
};

const removeGroupFromLead = (leadGroup, lead) => (dispatch) => {
  // LEADS & LEADGROUPS
  // Will remove a Lead from a LeadGroup and a LeadGroup from a Lead.
  dispatch(_leadsLoading());
  Parse.Cloud.run("removeGroupFromLead", ({ leadGroup, lead }))
    .then(() => {
      dispatch(fetchLead(lead))
        .then((l) => {
          dispatch(_leadLoadEnd());
          dispatch(_leadUpdate(l));
          dispatch(_myLeadGroups(l.attributes.leadGroups));
        }).catch(e => _leadsError(e));
    })
    .catch((e) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadsError(e));
    });
};

const updateLead = (data, lead) => (dispatch) => {
  const {
    phone, leadGroup, email, name, leadType, lastCallTitle, lastContact, lastCallNotes
  } = data;
  dispatch(_leadsLoading());
  Parse.Cloud.run("updateLead", ({
    phone, leadGroup, email, name, leadType, lead, lastCallTitle, lastContact, lastCallNotes
  }))
    .then((l) => {
      dispatch(_leadLoadEnd());
      dispatch(fetchLead(l));
    })
    .catch((e) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadsError(e));
    });
};

const updateLeadGroup = (data, leadGroup) => (dispatch) => {
  const {
    name, lead
  } = data;
  dispatch(_leadsLoading());
  Parse.Cloud.run("updateLeadGroup", ({
    name, lead
  }))
    .then(() => {
      dispatch(fetchLeadGroup(leadGroup));
      dispatch(_leadLoadEnd());
    })
    .catch((e) => {
      dispatch(_leadLoadEnd());
      dispatch(_leadsError(e));
    });
};

const updateLeadsToAdd = leads => (dispatch) => {
  dispatch(_updateLeadsToAdd(leads));
};


function _clearLeadsToAdd() {
  // LEADGROUPS
  return {
    type: CLEAR_LEADS_TO_ADD
  };
}

function _csvLoadEnd() {
  return {
    type: CSV_LOAD_END
  };
}

function _csvLoading() {
  return {
    type: CSV_LOADING
  };
}

function _leadCount(l) {
  return {
    type: LEAD_COUNT,
    payload: l
  };
}

function _leadGroupListUpdate(lg) {
  return {
    type: LEAD_GROUP_LIST_UPDATE,
    payload: lg
  };
}

function _leadGroupUpdate(lg) {
  return {
    type: LEAD_GROUP_DETAIL_UPDATE,
    payload: lg
  };
}
function _leadListSuccess(l) {
  return {
    type: LEADS_LIST_SUCCESS,
    payload: l
  };
}

function _leadListUpdate(l) {
  return {
    type: LEAD_LIST_UPDATE,
    payload: l
  };
}

function _leadLoadEnd() {
  return {
    type: LEADS_LOAD_END
  };
}


function _leadUpdate(l) {
  return {
    type: LEAD_DETAIL_UPDATE,
    payload: l
  };
}


function _leadsClearError() {
  return {
    type: LEADS_CLEAR_ERROR
  };
}

function _leadsError(err) {
  return {
    type: LEADS_ERROR,
    payload: err
  };
}

function _leadsLoading() {
  return {
    type: LEADS_LOADING
  };
}


function _leadsToAdd(l) {
  return {
    type: LEADS_TO_ADD,
    payload: l
  };
}

function _moreLeadsLoading(value) {
  return {
    type: MORE_LEADS_LOADING,
    payload: value
  };
}


function _myLeadGroups(lg) {
  return {
    type: MY_LEAD_GROUPS,
    payload: lg
  };
}

function _myLeads(l) {
  return {
    type: MY_LEAD_GROUPS,
    payload: l
  };
}


function _parseCSV(data) {
  /**
  * A CSV file is parsed into javascript objects using papaparse
  * docs: https://www.papaparse.com/docs
  * download is set to true, so as to handle local files
  * header is set to true, so as to format the returned objects with the keys set in the CSV's first line
  * delimiter is set to ',' to identify the next data block in CSV format
  * A formatting error is thrown if the first result does not comply to our header format of name and phone
  * @param  {object} lead object containing name and phone
  */
  return new Promise((resolve) => {
    Papa.parse(data, {
      download: true,
      header: true,
      delimiter: ',',
      complete: (results) => {
        if (!results.data[0].name || !results.data[0].phone || !Object.keys(results.data[0]).includes('name') || !Object.keys(results.data[0]).includes('phone')) {
          resolve(_leadsError({
            message:
                 'It looks like the leads you uploaded were incorrectly formatted. Please use the Hopscript template as a guide to format your leads or upload leads individually'
          }));
        } else {
          const formattedData = results.data.map((lead) => {
            const formattedPhone = parsePhone(lead.phone);
            return {
              ...lead,
              phone: formattedPhone
            };
          });
          resolve(formattedData);
        }
      }
    });
  });
}


function _showMoreLeads(value) {
  return {
    type: MORE_LEADS,
    payload: value
  };
}

function _updateLeadsToAdd(l) {
  return {
    type: LEAD_LEADGROUP_UPDATE,
    payload: l
  };
}

export {
  addLeadToGroup,
  clearError,
  createLead,
  createLeadGroup,
  deleteLead,
  deleteLeadGroup,
  fetchLead,
  fetchLeadGroup,
  fetchLeadGroups,
  fetchLeads,
  fetchNextLeads,
  parseCSV,
  removeGroupFromLead,
  searchForLeads,
  updateLead,
  updateLeadGroup,
  updateLeadsToAdd,
};
