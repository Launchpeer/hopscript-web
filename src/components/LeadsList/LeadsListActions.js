/**
 * The purpose of this file is to define Redux Actions that allow a Brokerage to :
 * delete leads
 * Loading and Error states are handled for UX purposes
 */

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

/**
 * As a broker I want to remove an Lead from my Brokerage

 * An Lead with the specified object is deleted from the database.
 * The Lead Pointer is then removed from the Brokerage and the Brokerage is saved.
 * Then, we fetch the updated Brokerage

 * @param  {Object} lead The lead User object
 */

export const removeLead = lead => (dispatch) => {
  const brokerage = Parse.User.current();
  dispatch(_leadsListLoading());
  dispatch({
    type: LEADS_LIST_LOADING
  });
  Parse.Cloud.run('removeLead', { leadId: lead.id })
    .then((b) => {
      dispatch(_leadsListLoadEnd());
      dispatch(fetchUser());
    })
    .catch((res) => {
      dispatch(_leadsListError(res.error));
    });
};
