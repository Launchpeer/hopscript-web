import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  IndexRedirect
} from 'react-router';
import reduxThunk from 'redux-thunk';
import Parse from 'parse';
import _ from 'underscore';

import App from './components/app';
import rootReducer from './rootReducer';
import { Colors } from './config/styles';
import { AUTH_USER } from './components/Auth/AuthTypes';
import { UPDATE_USER } from './components/UserTypes';
import {
  AuthView,
  ForgotPasswordView,
  ResetPasswordView
} from './components/Auth';
import DashboardView from './components/Dashboard/DashboardView';
import './../sass/style.scss';
import { PARSE_SERVER_URL, APPLICATION_ID } from './config/globals';

const createStoreWithMiddleware = compose(applyMiddleware(reduxThunk)(createStore));
const store = createStoreWithMiddleware(rootReducer);

Parse.initialize(APPLICATION_ID, 'some_key_generated');
Parse.applicationId = APPLICATION_ID;
Parse.serverURL = PARSE_SERVER_URL;
Parse.clientKey = 'some_key_generated';
Parse.javascriptKey = 'some_key_generated';

let redirect = '/' // eslint-disable-line
const currentUser = Parse.User.current();

window.doot = "doot doot here's your toot 🎺💀";

if (currentUser) {
  store.dispatch({ type: AUTH_USER, payload: currentUser });
  store.dispatch({ type: UPDATE_USER, payload: currentUser });
  redirect = '/dashboard';
}

const bodyColorPaths = ['/', '/reset-password', '/forgot-password'];

browserHistory.listen((location) => {
  if (_.contains(bodyColorPaths, location.pathname)) {
    document.body.style.backgroundColor = Colors.brandPrimary;
  } else {
    document.body.style.backgroundColor = 'white';
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={redirect} />
        <IndexRoute component={AuthView} authType="signin" />
        <Route path="forgot-password" component={ForgotPasswordView} />
        <Route path="reset-password" component={ResetPasswordView} />
        <Route path="dashboard" component={DashboardView} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.page-container')
);
