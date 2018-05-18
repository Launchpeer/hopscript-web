import Parse from 'parse';

import {
  LEADS_LIST_ERROR,
  LEADS_LIST_CLEAR_ERROR,
  LEADS_LIST_LOADING,
  LEADS_LIST_LOAD_END
} from './LeadsListTypes';

import { fetchUser } from '../UserActions';

function _leadsListError(error) {
  return {
    type: LEADS_LIST_ERROR,
    payload: error
  };
}

function _leadsListLoading() {
  return {
    type: LEADS_LIST_LOADING
  };
}

function _leadsListLoadEnd() {
  return {
    type: LEADS_LIST_LOAD_END
  };
}

function _removeLeadFromAgent(lead) {
  return new Promise((resolve) => {
    const agent = Parse.User.current();
    agent.remove('leads', lead);
    resolve(agent.save());
  });
}

export const removeLead = id => (dispatch) => {
  const Lead = Parse.Object.extend('Lead');
  const query = new Parse.Query(Lead);
  query
    .get(id)
    .then((lead) => {
      dispatch(_leadsListLoading());
      _removeLeadFromAgent(lead).then(() => {
        lead.destroy({
          success(lead) {
            dispatch(fetchUser());
            dispatch(_leadsListLoadEnd());
            console.log('Deleted', leadGroup.attributes.name);
          },
          error(lead) {
            dispatch(_leadsListLoadEnd());
            console.log('error deleting ', lead);
          }
        });
      });
    })
    .catch(err => console.log('error deleting lead', err));
};

/*
function _getLeadGroup(id) {
  const LeadGroup = Parse.Object.extend('LeadGroup');
  const query = new Parse.Query(LeadGroup);
  query.get(id).then(group => group);
}

function _getLead(id) {
  const Lead = Parse.Object.extend('Lead');
  const query = new Parse.Query(Lead);
  query.get(id).then(lead => lead);
}

function _reconcileLeadToGroup(lead, leadGroup) {
  return new Promise((resolve) => {
    const LeadGroup = _getLeadGroup(leadGroup);
    const Lead = _getLead(lead);
    LeadGroup.add('leads', Lead);
    resolve(LeadGroup.save());
  });
}

function _reconcileGroupToLead(lead, leadGroup) {
  return new Promise((resolve) => {
    const LeadGroup = _getLeadGroup(leadGroup);
    const Lead = _getLead(lead);
    Lead.add('leadGroups', LeadGroup);
    resolve(Lead.save());
  });
}

export const reconcileLeadsAndGroups = (lead, leadGroup) => dispatch =>
  new Promise.all(_reconcileLeadToGroup(lead, leadGroup))
    .then(() => {
      dispatch(_reconcileGroupToLead(lead, leadGroup));
      dispatch(fetchUser());
    })
    .catch((err) => {
      dispatch(_leadsListError(err));
    });
    */
