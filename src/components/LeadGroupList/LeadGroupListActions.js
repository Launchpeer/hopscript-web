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

export const removeLeadGroup = id => (dispatch) => {
  const LeadGroup = Parse.Object.extend('LeadGroup');
  const query = new Parse.Query(LeadGroup);
  query
    .get(id)
    .then((leadGroup) => {
      leadGroup.destroy({
        success(leadGroup) {
          dispatch(fetchUser());
          console.log('Deleted', leadGroup.attributes.groupName);
        },
        error(lead) {
          console.log('error deleting ', leadGroup);
        }
      });
    })
    .catch(err => console.log('error deleting lead', err));
};
