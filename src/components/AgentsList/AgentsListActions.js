/**
 * The purpose of this file is to define Redux Actions that allow a Brokerage to :
 * delete agents
 * Loading and Error states are handled for UX purposes
 */

import Parse from 'parse';
import { browserHistory } from 'react-router';

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

function _clearError() {
  return {
    type: AGENTS_LIST_CLEAR_ERROR
  }
};

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

function _generateRandomPassword() {
  const password = `${passwordGenerator(
    1,
    false,
    /^[A-Z]*$/
  )}${passwordGenerator(
    1,
    false,
    /^[!@#\$%\^\&*\)\(+=._-]*$/
  )}${passwordGenerator(6, false, /^[a-z]*$/)}`;
  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
}

function _createNewAgent({name, email, password}) {
  return new Promise((resolve) => {
    const brokerage = Parse.User.current();
    const Agent = new Parse.User();
    Agent.set('name', name);
    Agent.set('username', email);
    Agent.set('email', email);
    Agent.set('password', password);
    Agent.set('brokerage', brokerage);
    Agent.set('role', 'agent');
    resolve(Agent.save());
  })
}

function _reconcileAgentToBrokerage(agent) {
  return new Promise((resolve) => {
    const Brokerage = Parse.User.current();
    Brokerage.add('agents', agent);
    resolve(Brokerage.save());
  })
}

export const clearError = () => (dispatch) => {
  dispatch(_clearError());
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
   dispatch({
     type: AGENTS_LIST_LOADING,
   });
   Parse.Cloud.run("removeAgent", { agentId: agent.id })
     .then((b) => {
       dispatch(fetchUser())
     })
     .catch((res) => {
       console.log('remove agent err', res.error);
     });
 };
