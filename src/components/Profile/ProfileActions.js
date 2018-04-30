import Parse from 'parse';
import { browserHistory } from 'react-router';

import {
  PROFILE_UPDATE_ERROR,
  PROFILE_UPDATE_CLEAR_ERROR,
  PROFILE_UPDATE_LOADING,
  PROFILE_UPDATE_LOAD_END
} from './ProfileTypes';

import { UPDATE_USER, CLEAR_USER } from '../UserTypes';

function _profileUpdateError(error) {
  return {
    type: PROFILE_UPDATE_ERROR,
    payload: error
  };
}

export const clearError = () => ({
  type: PROFILE_UPDATE_CLEAR_ERROR
});

function _profileUpdateLoading() {
  return {
    type: PROFILE_UPDATE_LOADING
  };
}

function _profileUpdateLoadEnd() {
  return {
    type: PROFILE_UPDATE_LOAD_END
  };
}

export const updateProfile = ({
  name,
  email,
  mainContactName,
  mainContactPhone,
  address,
  image
}) => (dispatch) => {
  dispatch(_profileUpdateLoading());
  const Profile = Parse.User.current();
  if (name) {
    Profile.set('guideName', name);
  }
  if (email) {
    Profile.set('email', email);
  }
  if (mainContactName) {
    Profile.set('mainContactName', mainContactName);
  }
  if (mainContactPhone) {
    Profile.set('mainContactPhone', mainContactPhone);
  }
  if (image) {
    Profile.set('logoImage', image);
  }
  Profile.save()
    .then((updatedProfile) => {
      dispatch(_profileUpdateLoadEnd());
      dispatch({
        type: UPDATE_USER,
        payload: updatedProfile
      });
    })
    .catch((err) => {
      dispatch(_profileUpdateError(err));
    });
};

export const deleteProfile = () => (dispatch) => {
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
