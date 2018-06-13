import Parse from 'parse';
import { browserHistory } from 'react-router';
import {
  LEAD_GROUP_ADD_ERROR,
  LEAD_GROUP_ADD_CLEAR_ERROR,
  LEAD_GROUP_ADD_LOADING,
  LEAD_GROUP_ADD_LOAD_END,
  ADD_LEADS_TO_GROUP
} from './LeadGroupAddTypes';

function _leadGroupAddError(error) {
  return {
    type: LEAD_GROUP_ADD_ERROR,
    payload: error
  };
}

function _leadGroupAddLoading() {
  return {
    type: LEAD_GROUP_ADD_LOADING
  };
}

function _leadGroupAddLoadEnd() {
  return {
    type: LEAD_GROUP_ADD_LOAD_END
  };
}
function _clearError() {
  return {
    type: LEAD_GROUP_ADD_CLEAR_ERROR
  };
}

function _addLeadToGroup(lead) {
  return {
    type: ADD_LEADS_TO_GROUP,
    payload: lead.attributes.name
  };
}

const clearError = () => (dispatch) => {
  dispatch(_clearError());
};

const leadGroupAddError = err => (dispatch) => {
  dispatch(_leadGroupAddError(err));
};

export const addLeadToGroup = lead => (dispatch) => {
  dispatch(_addLeadToGroup(lead));
};

/**
 * A LeadGroup Parse Object is instantiated
 * the LeadGroup's name is set on the LeadGroup object
 * the current Agent is set to the LeadGroup object as a Pointer
 * the LeadGroup is saved
 * @param  {object} LeadGroup object containing a groupName
 */
function _reconcileLeadGroupToDB({ groupName }) {
  return new Promise((resolve) => {
    const Agent = Parse.User.current();
    const LeadGroup = Parse.Object.extend('LeadGroup');
    const LGObj = new LeadGroup();
    LGObj.set('groupName', groupName);
    LGObj.set('agent', Agent);
    resolve(LGObj.save());
  });
}

/**
 * A LeadGroup Parse object is added to the current user's leadGroup array as a Pointer
 * @param  {object} lead Lead Parse object
 */
function _reconcileLeadGroupToAgent(leadGroup) {
  return new Promise((resolve) => {
    const Agent = Parse.User.current();
    Agent.add('leadGroups', leadGroup);
    resolve(Agent.save());
  });
}

/**
 * A LeadGroup object is sent to _reconcileLeadGroupToDB, which creates a LeadGroup Parse object with the data provided and current Agent
 * the newly created LeadGroup Parse object is sent to _reconcileLeadGroupToAgent, which adds the LeadGroup to the Agent as a Pointer
 * @param  {object} leadGroup leadGroup object containing name and phone number
 */
function _createAndReconcileLeadGroup(leadGroup) {
  return new Promise((resolve) => {
    _reconcileLeadGroupToDB(leadGroup)
      .then((lgObj) => {
        resolve(_reconcileLeadGroupToAgent(lgObj));
      })
      .catch((err) => {
        console.log('_reconcileLeadGroupToDB ERR:', err);
      });
  });
}

/**
 * As an agent, I want to manually create a LeadGroup.
 * First, a 'LeadGroup' is created in the database. The current `Agent` is added to the `LeadGroup` as a `Pointer`
 * Then, the `LeadGroup` is added to the current `Agent`'s `leadGroup` array as a `Pointer`
 Loading and Errors are handled for UX
 * @param  {string} data leadGroup object
 */

const createLeadGroup = data => (dispatch) => {
  dispatch(_leadGroupAddLoading());
  _createAndReconcileLeadGroup(data)
    .then(() => {
      dispatch(_leadGroupAddLoadEnd());
      browserHistory.push('/list-lead-groups');
    })
    .catch(err => dispatch(_leadGroupAddError()));
};

export { clearError, createLeadGroup };
