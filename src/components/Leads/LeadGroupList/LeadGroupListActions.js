import Parse from 'parse';
import {
  LEAD_GROUP_LIST_ERROR,
  LEAD_GROUP_LIST_LOADING,
  LEAD_GROUP_LIST_LOAD_END,
  LEAD_GROUP_LIST_UPDATE
} from './LeadGroupListTypes';

import { fetchUser } from '../../UserActions';

function _leadGroupListLoading() {
  return {
    type: LEAD_GROUP_LIST_LOADING
  };
}

function _leadGroupListLoadEnd() {
  return {
    type: LEAD_GROUP_LIST_LOAD_END
  };
}

function _leadGroupListUpdate(groups) {
  return {
    type: LEAD_GROUP_LIST_UPDATE,
    payload: groups
  };
}

function _removeLeadGroupFromAgent(leadGroup) {
  return new Promise((resolve) => {
    const agent = Parse.User.current();
    agent.remove('leadGroups', leadGroup);
    resolve(agent.save());
  });
}

export const removeLeadGroup = id => (dispatch) => {
  const LeadGroup = Parse.Object.extend('LeadGroup');
  const query = new Parse.Query(LeadGroup);
  query
    .get(id)
    .then((leadGroup) => {
      dispatch(_leadGroupListLoading());
      _removeLeadGroupFromAgent(leadGroup).then(() => {
        leadGroup.destroy({
          success(leadGroup) {
            dispatch(fetchUser());
            dispatch(_leadGroupListLoadEnd());
            console.log('Deleted', leadGroup.attributes.groupName);
          },
          error(lead) {
            dispatch(_leadGroupListLoadEnd());
            console.log('error deleting ', leadGroup);
          }
        });
      });
    })
    .catch(err => console.log('error deleting lead', err));
};

const fetchLeadGroups = () => (dispatch) => {
  dispatch(_leadGroupListLoading());
  const LeadGroup = Parse.Object.extend('LeadGroup');
  const query = new Parse.Query(LeadGroup);
  query
    .find()
    .then((groups) => {
      dispatch(_leadGroupListLoadEnd());
      dispatch(_leadGroupListUpdate(groups));
    })
    .catch(err => dispatch({ type: LEAD_GROUP_LIST_ERROR, payload: err }));
};

export { fetchLeadGroups };
