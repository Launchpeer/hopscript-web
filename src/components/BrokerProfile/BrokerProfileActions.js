import Parse from 'parse';
import { browserHistory } from 'react-router';

import {
  BROKER_PROFILE_UPDATE_ERROR,
  BROKER_PROFILE_UPDATE_CLEAR_ERROR,
  BROKER_PROFILE_UPDATE_LOADING,
  BROKER_PROFILE_UPDATE_LOAD_END
} from './BrokerProfileTypes';

import { UPDATE_USER, CLEAR_USER } from '../UserTypes';

function _brokerProfileUpdateError(error) {
  return {
    type: BROKER_PROFILE_UPDATE_ERROR,
    payload: error
  };
}

export const clearError = () => ({
  type: BROKER_PROFILE_UPDATE_CLEAR_ERROR
});

function _brokerProfileUpdateLoading() {
  return {
    type: BROKER_PROFILE_UPDATE_LOADING
  };
}

function _brokerProfileUpdateLoadEnd() {
  return {
    type: BROKER_PROFILE_UPDATE_LOAD_END
  };
}

export const brokerUpdateProfile = ({ name, email }) => (dispatch) => {
  dispatch(_brokerProfileUpdateLoading());
  const Profile = Parse.User.current();
  if (name) {
    Profile.set('username', username);
  }
  if (email) {
    Profile.set('email', email);
  }
  Profile.save()
    .then((updatedProfile) => {
      dispatch(_brokerProfileUpdateLoadEnd());
      dispatch({
        type: UPDATE_USER,
        payload: updatedProfile
      });
    })
    .catch((err) => {
      dispatch(_brokerProfileUpdateError(err));
    });
};

export const deleteBrokerProfile = () => (dispatch) => {
  browserHistory.push('/');
  const Profile = Parse.User.current();
  Parse.Cloud.run('removeUser', { userId: Profile.id })
    .then(() => {
      dispatch({
        type: CLEAR_USER
      });
    })
    .catch((err) => {
      console.log('delete profile err', err);
    });
};
