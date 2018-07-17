import Parse from 'parse';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  AUTH_LOADING,
  FORGOT_EMAIL_SUCCESS,
  RESET_SUCCESS
} from './AuthTypes';

import { UPDATE_USER, CLEAR_USER } from '../UserTypes';

function _authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export const clearError = () => ({
  type: CLEAR_ERROR
});

function _updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  };
}

function _clearUser() {
  return {
    type: CLEAR_USER
  };
}

export const signInUser = (email, password) => (dispatch) => {
  dispatch({
    type: AUTH_LOADING
  });
  Parse.User.logIn(email, password, {
    success: (user) => {
      dispatch(_updateUser(user));
      dispatch({
        type: AUTH_USER,
        payload: user
      });
      if (user.attributes.role === 'agent' && user.attributes.firstLogin !== 'true') {
        browserHistory.push('/welcome');
      } else if (user.attributes.stripe_connect_id || user.attributes.role === 'agent') {
        browserHistory.push('/start-call');
      } else {
        browserHistory.push('/stripe');
      }
    },
    error: (user, error) => {
      console.log('Err: ', error);
      dispatch(_authError(error));
    }
  });
};

function _unAuthUser() {
  return new Promise((resolve) => {
    resolve(Parse.User.logOut());
  });
}

function _createUser(username, email, password) {
  return new Promise((resolve) => {
    const User = new Parse.User();
    User.set('username', username);
    User.set('email', email);
    User.set('password', password);
    User.set('role', 'brokerage');
    resolve(User.signUp());
  });
}

export const signUpUser = (username, email, password) => (dispatch) => {
  dispatch({
    type: AUTH_LOADING
  });
  if (Parse.User.current()) {
    // If a session token exists, clear the user and then try to signUp
    // Otherwise, Parse will throw session token error
    _unAuthUser()
      .then(() => {
        dispatch(_clearUser());
        dispatch({ type: UNAUTH_USER });
        _createUser(username, email, password)
          .then((user) => {
            dispatch(_updateUser(user));
            dispatch({
              type: AUTH_USER,
              payload: user
            });
            browserHistory.push('/stripe');
          })
          .catch((error) => {
            dispatch(_authError(error));
          });
      })
      .catch((error) => {
        dispatch(_authError(error));
      });
  } else {
    _createUser(username, email, password)
      .then((user) => {
        dispatch(_updateUser(user));
        dispatch({
          type: AUTH_USER,
          payload: user
        });
        browserHistory.push('/stripe');
      })
      .catch((error) => {
        dispatch(_authError(error));
      });
  }
};

export const sendForgotPasswordEmail = email => (dispatch) => {
  dispatch({
    type: AUTH_LOADING
  });
  Parse.User.requestPasswordReset(email, {
    success() {
      dispatch({
        type: FORGOT_EMAIL_SUCCESS
      });
    },
    error(error) {
      dispatch(_authError(error));
    }
  });
};

export const resetPassword = (password, username) => (dispatch) => {
  dispatch({
    type: AUTH_LOADING
  });
  Parse.Cloud.run('resetPassword', { username, password })
    .then(() => {
      dispatch({
        type: RESET_SUCCESS
      });
    })
    .catch((error) => {
      console.log('RESET PASS ERR:', error);
    });
};

const clearUser = () => (dispatch) => {
  if (Parse.User.current()) {
    // If a session token exists
    // clear the user in parse
    // clear the user in the reducer
    _unAuthUser()
      .then(() => {
        dispatch(_clearUser());
        dispatch({ type: UNAUTH_USER });
      });
  }
};

export const logOutUser = () => (dispatch) => {
  Parse.User.logOut()
    .then(() => {
      browserHistory.push('/');
      dispatch(_clearUser());
      dispatch({ type: UNAUTH_USER });
    }).catch(err => console.log('err', err));
};


export { clearUser };
