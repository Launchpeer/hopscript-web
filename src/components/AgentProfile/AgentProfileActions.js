/**
 * The purpose of this file is to define Redux Actions that allow an Agent to :
 * delete themselves, update their profile
 * Loading and Error states are handled for UX purposes
 */


import Parse from 'parse';
import { browserHistory } from 'react-router';

import {
  AGENT_PROFILE_UPDATE_ERROR,
  AGENT_PROFILE_UPDATE_CLEAR_ERROR,
  AGENT_PROFILE_UPDATE_LOADING,
  AGENT_PROFILE_UPDATE_LOAD_END,
  FETCH_BROKERAGE
} from './AgentProfileTypes';

import { UPDATE_USER, CLEAR_USER } from '../UserTypes';

function _agentProfileUpdateError(error) {
  return {
    type: AGENT_PROFILE_UPDATE_ERROR,
    payload: error
  };
}

export const clearError = () => ({
  type: AGENT_PROFILE_UPDATE_CLEAR_ERROR
});

function _agentProfileUpdateLoading() {
  return {
    type: AGENT_PROFILE_UPDATE_LOADING
  };
}

function _agentProfileUpdateLoadEnd() {
  return {
    type: AGENT_PROFILE_UPDATE_LOAD_END
  };
}

export const updateAgentProfile = ({ name }) => (dispatch) => {
  dispatch(_agentProfileUpdateLoading());
  const Profile = Parse.User.current();
  if (name) {
    Profile.set('name', name);
  }
  Profile.save()
    .then((updatedProfile) => {
      dispatch(_agentProfileUpdateLoadEnd());
      dispatch({
        type: UPDATE_USER,
        payload: updatedProfile
      });
    })
    .catch((err) => {
      dispatch(_agentProfileUpdateError(err));
    });
};

export const fetchBrokerage = id => (dispatch) => {
  const User = Parse.Object.extend('User');
  const query = new Parse.Query(User);
  query.get(id)
    .then(brokerage => dispatch({ type: FETCH_BROKERAGE, payload: brokerage }))
    .catch(err => console.log('err', err));
};

export const deleteAgentProfile = () => (dispatch) => {
  browserHistory.push('/');
  const Profile = Parse.User.current();
  Parse.Cloud.run('removeAgent', { agentId: Profile.id })
    .then(() => {
      dispatch({
        type: CLEAR_USER
      });
    })
    .catch((err) => {
      console.log('delete profile err', err);
    });
};
