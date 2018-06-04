/**
 * The purpose of this file is to define Redux Actions that allow a Brokerage to :
 * create Agents, send Agents invitation emails, and associate those Agents to their Brokerage.
 * Loading and Error states are handled for UX purposes
 */

import Parse from 'parse';
import { browserHistory } from 'react-router';
import passwordGenerator from 'password-generator';

import {
  AGENTS_ADD_ERROR,
  AGENTS_ADD_CLEAR_ERROR,
  AGENTS_ADD_LOADING,
  AGENTS_ADD_LOAD_END
} from './AgentsAddTypes';

import { UPDATE_USER, CLEAR_USER } from '../UserTypes';

function _agentsAddError(error) {
  return {
    type: AGENTS_ADD_ERROR,
    payload: error
  };
}

function _clearError() {
  return {
    type: AGENTS_ADD_CLEAR_ERROR
  }
};

function _agentsAddLoading() {
  return {
    type: AGENTS_ADD_LOADING
  };
}

function _agentsAddLoadEnd() {
  return {
    type: AGENTS_ADD_LOAD_END
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
 * As a broker I want to create an agent.

 A `User` with the role `agent` is created in the database. That agent is added to the brokerage's `agents` array as a `Pointer`.
 The agent is given a generated password and sent an invitation email with log in instructions.

 Loading and Errors are handled for UX

 * @param  {string} data.email email address of Agent to use for email and username
 * @param  {string} data.name full name of Agent
 */

export const inviteAgent = (data) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(_agentsAddLoading());
    const password = _generateRandomPassword();
    const User = Parse.User.current();
    _createNewAgent({ password: password, ...data })
      .then((agent) => {
        Parse.Cloud.run("sendEmailInvite", {
          password,
          brokerage: User.attributes.username,
          brokerageEmail: User.attributes.email,
          email: data.email
        });
        _reconcileAgentToBrokerage(agent)
          .then((brokerage) => {
            dispatch(_agentsAddLoadEnd());
            resolve(brokerage);
          })
      })
      .catch((err) => {
        dispatch(_agentsAddLoadEnd());
        dispatch(_agentsAddError(err));
      });
  })
};
