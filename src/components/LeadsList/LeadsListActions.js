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

export const removeLead = id => (dispatch) => {
  const Lead = Parse.Object.extend('Lead');
  const query = new Parse.Query(Lead);
  query
    .get(id)
    .then((lead) => {
      lead.destroy({
        success(lead) {
          dispatch(fetchUser());
          console.log('Deleted', lead.attributes.name);
        },
        error(lead) {
          console.log('error deleting ', lead);
        }
      });
    })
    .catch(err => console.log('error deleting lead', err));
};
