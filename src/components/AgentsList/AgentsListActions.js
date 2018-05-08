/**
 * The purpose of this file is to define Redux Actions that allow a Brokerage to :
 * delete agents
 * Loading and Error states are handled for UX purposes
 */

import Parse from 'parse';

import {
  AGENTS_LIST_ERROR,
  AGENTS_LIST_CLEAR_ERROR,
  AGENTS_LIST_LOADING,
  AGENTS_LIST_LOAD_END
} from './AgentsListTypes';

import { fetchUser } from '../UserActions';

function _agentsListError(error) {
  return {
    type: AGENTS_LIST_ERROR,
    payload: error
  };
}

function _agentsListLoading() {
  return {
    type: AGENTS_LIST_LOADING
  };
}

function _agentsListLoadEnd() {
  return {
    type: AGENTS_LIST_LOAD_END
  };
}

/**
 * As a broker I want to remove an Agent from my Brokerage

 * An Agent with the specified object is deleted from the database.
 * The Agent Pointer is then removed from the Brokerage and the Brokerage is saved.
 * Then, we fetch the updated Brokerage

 * @param  {string} agent The agent User object
 */


 export const removeAgent = agent => (dispatch) => {
   const brokerage = Parse.User.current();
   dispatch(_agentsListLoading());
   dispatch({
     type: AGENTS_LIST_LOADING,
   });
   Parse.Cloud.run("removeAgent", { agentId: agent.id })
     .then((b) => {
       dispatch(_agentsListLoadEnd());
       dispatch(fetchUser())
     })
     .catch((res) => {
       dispatch(_agentsListError(res.error));
     });
 };
