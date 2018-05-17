import Parse from 'parse';

import {
  LEAD_GROUP_LIST_ERROR,
  LEAD_GROUP_LIST_CLEAR_ERROR,
  LEAD_GROUP_LIST_LOADING,
  LEAD_GROUP_LIST_LOAD_END
} from './LeadGroupListTypes';

import { fetchUser } from '../UserActions';

function _leadGroupListError(error) {
  return {
    type: LEAD_GROUP_LIST_ERROR,
    payload: error
  };
}

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
