import Parse from 'parse';

import {
  LEADS_LIST_LOADING,
  LEADS_LIST_LOAD_END
} from './LeadsListTypes';

import { fetchUser } from '../UserActions';

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
          success() {
            dispatch(fetchUser());
            dispatch(_leadsListLoadEnd());
          },
          error() {
            dispatch(_leadsListLoadEnd());
          }
        });
      });
    })
    .catch(err => console.log('error deleting lead', err));
};

function _getLeadGroup(id) {
  const LeadGroup = Parse.Object.extend('LeadGroup');
  const query = new Parse.Query(LeadGroup);
  query
    .get(id)
    .then(group => console.log('gotem', group))
    .catch(err => console.log('err fetching', err));
}

function _getLead(id) {
  const Lead = Parse.Object.extend('Lead');
  const query = new Parse.Query(Lead);
  query
    .get(id)
    .then(lead => console.log('gotem', lead))
    .catch(err => console.log('err fetching', err));
}

const reconcileLeadsAndGroups = (leadGroup, lead) => (dispatch) => {
  dispatch(_getLead(lead.id));
  dispatch(_getLeadGroup(leadGroup.leadGroup));
};

export { reconcileLeadsAndGroups };
