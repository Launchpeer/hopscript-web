import Parse from 'parse';

import {
  UPDATE_USER,
  CLEAR_USER
} from './UserTypes';

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user
  };
}

function _fetchUser() {
  return new Promise((resolve) => {
    const User = Parse.User.current();
    const query = new Parse.Query(User);
    query.include('agents');
    resolve(query.get(User.id));
  });
}

const fetchUser = () => (dispatch) => {
  _fetchUser()
    .then((updatedUser) => {
      dispatch(updateUser(updatedUser));
    });
};

const clearUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER
  });
};

export { clearUser, fetchUser, updateUser }
