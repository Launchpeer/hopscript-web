import Parse from 'parse';
import { browserHistory } from 'react-router';

import {
  AGENT_PROFILE_UPDATE_ERROR,
  AGENT_PROFILE_UPDATE_CLEAR_ERROR,
  AGENT_PROFILE_UPDATE_LOADING,
  AGENT_PROFILE_UPDATE_LOAD_END
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

export const updateAgentProfile = ({ name, email }) => (dispatch) => {
  dispatch(_agentProfileUpdateLoading());
  const Profile = Parse.User.current();

  if (name) {
    Profile.set('name', name);
  }
  if (email) {
    Profile.set('email', email);
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
