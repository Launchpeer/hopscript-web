import Parse from 'parse';
import Papa from 'papaparse';
import parsePhone from '../helpers/parsePhone';
import { fetchUser } from '../UserActions';

import {
  LEADS_ERROR,
  LEADS_CLEAR_ERROR,
  LEADS_LOADING,
  LEADS_LOAD_END,
  LEAD_DETAIL_UPDATE,
  LEAD_LIST_UPDATE,
  LEADS_LIST_SUCCESS,
  LEAD_GROUP_DETAIL_UPDATE,
  LEAD_GROUP_LIST_UPDATE,
  MY_LEAD_GROUPS,
  LEADS_TO_ADD,
  LEAD_LEADGROUP_UPDATE,
  CLEAR_LEADS_TO_ADD,
  CSV_LOADING,
  CSV_LOAD_END
} from './LeadsTypes';


function _leadsError(err) {
  return {
    type: LEADS_ERROR,
    payload: err
  };
}

function _leadsClearError() {
  return {
    type: LEADS_CLEAR_ERROR
  };
}

function _leadsLoading() {
  return {
    type: LEADS_LOADING
  };
}

function _leadLoadEnd() {
  return {
    type: LEADS_LOAD_END
  };
}

function _csvLoading() {
  return {
    type: CSV_LOADING
  };
}

function _csvLoadEnd() {
  return {
    type: CSV_LOAD_END
  };
}


function _leadUpdate(l) {
  return {
    type: LEAD_DETAIL_UPDATE,
    payload: l
  };
}

function _leadListUpdate(l) {
  return {
    type: LEAD_LIST_UPDATE,
    payload: l
  };
}

function _leadListSuccess(l) {
  return {
    type: LEADS_LIST_SUCCESS,
    payload: l
  };
}

function _leadGroupUpdate(lg) {
  return {
    type: LEAD_GROUP_DETAIL_UPDATE,
    payload: lg
  };
}

function _leadGroupListUpdate(lg) {
  return {
    type: LEAD_GROUP_LIST_UPDATE,
    payload: lg
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

function _leadsToAdd(l) {
  return {
    type: LEADS_TO_ADD,
    payload: l
  };
}

function _updateLeadsToAdd(l) {
  return {
    type: LEAD_LEADGROUP_UPDATE,
    payload: l
  };
}


const clearError = () => (dispatch) => {
  dispatch(_leadsClearError());
};

// LEADS
const createLead = lead => (dispatch) => {
  dispatch(_leadsLoading());
  Parse.Cloud.run("createLead", ({ lead }))
    .then(() => {
      dispatch(_leadLoadEnd());
      dispatch(fetchLeads());
    })
    .catch(err => dispatch({ type: LEADS_ERROR, payload: err }));
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


// LEADS & LEADGROUPS
// Will remove a Lead from a LeadGroup and a LeadGroup from a Lead.
const removeGroupFromLead = (leadGroup, lead) => (dispatch) => {
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

// LEADGROUPS

function _clearLeadsToAdd() {
  return {
    type: CLEAR_LEADS_TO_ADD
  };
}

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

const addLeadToGroup = lead => (dispatch) => {
  dispatch(_leadsToAdd(lead));
};


const updateLeadsToAdd = leads => (dispatch) => {
  dispatch(_updateLeadsToAdd(leads));
};


// ADDING A LEAD VIA CSV

/**
 * A CSV file is parsed into javascript objects using papaparse
 * docs: https://www.papaparse.com/docs
 * download is set to true, so as to handle local files
 * header is set to true, so as to format the returned objects with the keys set in the CSV's first line
 * delimiter is set to ',' to identify the next data block in CSV format
 * A formatting error is thrown if the first result does not comply to our header format of name and phone
 * @param  {object} lead object containing name and phone
 */
function _parseCSV(data) {
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

/**
 * A Lead Parse Object is instantiated
 * the lead's name and phone are set on the Lead object
 * the current Agent is set to the Lead object as a Pointer
 * the Lead is saved
 * @param  {object} lead object containing name and phone
 */
function _reconcileLeadToDB({
  name, phone, email, leadType, leadGroup
}) {
  return new Promise((resolve) => {
    const Agent = Parse.User.current();
    const Lead = Parse.Object.extend('Lead');
    const LObj = new Lead();
    const formattedPhone = `+1${phone}`;
    LObj.set('name', name);
    LObj.set('phone', formattedPhone);
    LObj.set('email', email);
    if (leadType) {
      LObj.set('leadType', leadType);
    }
    if (leadGroup) {
      LObj.addUnique('leadGroups', leadGroup);
    }
    LObj.set('agent', Agent);
    resolve(LObj.save());
  });
}

/**
 * A Lead Parse object is added to the current user's leads array as a Pointer
 * @param  {object} lead Lead Parse object
 */
function _reconcileLeadToAgent(lead) {
  return new Promise((resolve) => {
    const Agent = Parse.User.current();
    Agent.add('leads', lead);
    resolve(Agent.save());
  });
}


/**
 * A lead object is sent to _reconcileLeadToDB, which creates a Lead Parse object with the data provided and current Agent
 * the newly created Lead Parse object is sent to _reconcileLeadToAgent, which adds the Lead to the Agent as a Pointer
 * @param  {object} lead lead object containing name and phone number
 */
function _createAndReconcileLead(lead) {
  return new Promise((resolve) => {
    _reconcileLeadToDB(lead)
      .then((lObj) => {
        resolve(_reconcileLeadToAgent(lObj));
      })
      .catch((err) => {
        console.log('_reconcileLeadToDB ERR:', err);
      });
  });
}
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

const parseCSV = data => (dispatch) => {
  dispatch(_csvLoading());
  _parseCSV(data)
    .then((results) => {
      Promise.all(results.map(lead => _createAndReconcileLead(lead)))
        .then(() => {
          dispatch(fetchUser());
          dispatch(_csvLoadEnd());
          dispatch(_leadListSuccess(true));
          setTimeout(() => {
            dispatch(_leadListSuccess(false));
          }, 3000);
        })
        .catch((err) => {
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

export {
  clearError,
  createLead,
  fetchLead,
  fetchLeads,
  updateLead,
  deleteLead,
  removeGroupFromLead,
  updateLeadsToAdd,
  createLeadGroup,
  fetchLeadGroup,
  fetchLeadGroups,
  updateLeadGroup,
  deleteLeadGroup,
  addLeadToGroup,
  parseCSV
};
