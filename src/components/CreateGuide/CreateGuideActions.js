import Parse from 'parse';
import { browserHistory } from 'react-router';
import {
  GUIDE_LOAD_END,
  GUIDE_CREATE_ERROR,
  GUIDE_CLEAR_ERROR,
  GUIDE_LOADING
} from './CreateGuideTypes';

import passwordGenerator from 'password-generator';

import { UPDATE_USER } from '../UserTypes';

export const createGuideError = error => ({
  type: GUIDE_CREATE_ERROR,
  payload: error
});

export const clearError = () => ({
  type: GUIDE_CLEAR_ERROR
});

export const guideLoading = () => ({
  type: GUIDE_LOADING
});

function generateRandomPassword() {
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

function _fetchLocation(location) {
  return new Promise((resolve) => {
    const Locale = Parse.Object.extend('Locale');
    const query = new Parse.Query(Locale);
    const answer = query.get(location, {
      success(fetchedLoc) {
        resolve(fetchedLoc);
      },
      error(object, error) {
        console.log('error', object, error);
        return null;
      }
    });
  });
}

function _createNewGuide({
  guideName,
  location,
  profession,
  facebook,
  twitter,
  instagram,
  travelLikes,
  travelDislikes,
  travelPhilosophy,
  profilePhoto
}) {
  return new Promise((resolve) => {
    _fetchLocation(location).then((myLocation) => {
      const User = new Parse.User();
      const parseFile = profilePhoto
        ? new Parse.File('image', profilePhoto[0])
        : null;
      if (parseFile != null) {
        parseFile.save();
      }
      User.set('name', guideName);
      User.set('username', generateRandomPassword());
      User.set('password', generateRandomPassword());
      User.set('location', myLocation);
      User.set('profession', profession);
      if (facebook) {
        User.set('facebook', facebook);
      }
      if (twitter) {
        User.set('twitter', twitter);
      }
      if (instagram) {
        User.set('instagram', instagram);
      }
      User.set('traveLikes', travelLikes);
      User.set('travelDislikes', travelDislikes);
      User.set('travelPhilosophy', travelPhilosophy);
      User.set('profilePhoto', parseFile);
      User.set('role', 'guide');

      resolve(User.save());
    });
  });
}

export const createGuide = data => (dispatch) => {
  dispatch(guideLoading());
  _createNewGuide(data)
    .then(() => {
      browserHistory.push('/dashboard');
    })
    .catch(err => dispatch({ type: GUIDE_CREATE_ERROR, payload: err }));
};
