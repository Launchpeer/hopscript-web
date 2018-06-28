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
import { AuthView, ForgotPasswordView, ResetPasswordView, AgentWelcomeView } from './components/Auth';

import { BrokerDetailView } from './components/BrokerProfile';
import { AgentProfileView } from './components/AgentProfile';
import { DashboardView } from './components/Dashboard';
import { AgentsListView } from './components/AgentsList';
import { LeadsAddView, LeadsListView, LeadDetailView, LeadGroupAddView, LeadGroupListView, LeadGroupDetailView } from './components/Leads';
import { StripeView } from './components/Stripe';
import { ScriptBuilderView, ScriptsListView } from './components/Scripts';
import { StartCallView, InCallView } from './components/Call';
import { HistoryListView } from './components/History';

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
  // TODO add conditional for stripe
  store.dispatch({ type: AUTH_USER, payload: currentUser });
  store.dispatch({ type: UPDATE_USER, payload: currentUser });
  redirect = '/dashboard';
}

const bodyColorPaths = ['/', '/signup', '/forgot-password', '/reset-password', '/stripe', '/welcome'];

browserHistory.listen((location) => {
  if (_.contains(bodyColorPaths, location.pathname)) {
    document.body.style.backgroundColor = Colors.brandPrimary;
  } else {
    document.body.style.backgroundColor = Colors.lightGray;
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={redirect} />
        <IndexRoute component={AuthView} authType="signin" />
        <Route path="signup" component={AuthView} />
        <Route path="welcome" component={AgentWelcomeView} />
        <Route path="forgot-password" component={ForgotPasswordView} />
        <Route path="stripe" component={StripeView} />
        <Route path="reset-password" component={ResetPasswordView} />
        <Route path="dashboard" component={DashboardView} />
        <Route path="brokerage-profile" component={BrokerDetailView} />
        <Route path="agent-profile" component={AgentProfileView} />
        <Route path="agents-list" component={AgentsListView} />
        <Route path="scripts" component={ScriptsListView} />
        <Route path="leads-add" component={LeadsAddView} />
        <Route path="leads-list" component={LeadsListView} />
        <Route path="leads-list/:id" component={LeadDetailView} />
        <Route path="lead-groups-add" component={LeadGroupAddView} />
        <Route path="lead-groups-list" component={LeadGroupListView} />
        <Route path="lead-groups-list/:id" component={LeadGroupDetailView} />
        <Route path="script-builder/:id" component={ScriptBuilderView} />
        <Route path="start-call" component={StartCallView} />
        <Route path="in-call/:id" component={InCallView} />
        <Route path="history" component={HistoryListView} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.page-container')
);
