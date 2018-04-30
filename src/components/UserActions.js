import Parse from 'parse';

import {
  UPDATE_USER,
  CLEAR_USER
} from './UserTypes';

function _updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  };
}

function _fetchUser() {
  return new Promise((resolve) => {
    const User = Parse.User.current();
    const query = new Parse.Query(User);
    query.include('trainers');
    resolve(query.get(User.id));
  });
}

export const fetchUser = () => (dispatch) => {
  _fetchUser()
    .then((updatedUser) => {
      dispatch(_updateUser(updatedUser));
    });
};

export const clearUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER
  });
};
