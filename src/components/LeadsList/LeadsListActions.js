import Parse from 'parse';

import {
  LEADS_LIST_ERROR,
  LEADS_LIST_CLEAR_ERROR,
  LEADS_LIST_LOADING,
  LEADS_LIST_LOAD_END,
  CURRENT_LEAD,
  CURRENT_LEAD_GROUP
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

function _currentLead(lead) {
  return {
    type: CURRENT_LEAD,
    payload: lead
  };
}

function _currentLeadGroup(leadGroup) {
  return {
    type: CURRENT_LEAD_GROUP,
    payload: leadGroup
  };
}

function _getLeadGroup(id) {
  const LeadGroup = Parse.Object.extend('LeadGroup');
  const query = new Parse.Query(LeadGroup);
  query
    .get(id)
    .then(group => console.log('gotem', group))
    .catch(err => console.log('err fetching', lead));
}

function _getLead(id) {
  const Lead = Parse.Object.extend('Lead');
  const query = new Parse.Query(Lead);
  query
    .get(id)
    .then(lead => console.log('gotem', lead))
    .catch(err => console.log('err fetching', lead));
}

//  .then(lead => dispatch(_currentLead(lead)))
/*
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


const reconcileLeadsAndGroups = (lead, leadGroup) => (dispatch) => {
  new Promise.all(_reconcileLeadToGroup(lead, leadGroup))
    .then(() => {
      dispatch(_reconcileGroupToLead(lead, leadGroup));
      dispatch(fetchUser());
    })
    .catch((err) => {
      dispatch(_leadsListError(err));
    });
};
*/

function _reconcileLeadToGroup(Lead, LeadGroup) {
  return new Promise((resolve) => {
    LeadGroup.add('leads', Lead);
    resolve(LeadGroup.save());
  });
}

function _reconcileGroupToLead(Lead, LeadGroup) {
  return new Promise((resolve) => {
    Lead.add('leadGroups', LeadGroup);
    resolve(Lead.save());
  });
}

const reconcileLeadsAndGroups = (leadGroup, lead) => (dispatch) => {
  dispatch(_getLead(lead.id));
  dispatch(_getLeadGroup(leadGroup.leadGroup));
  // console.log('lead', lead.id);
  // console.log('LeadGroup', leadGroup.leadGroup);
};

export { reconcileLeadsAndGroups };
