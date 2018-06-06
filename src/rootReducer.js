import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import AuthReducer from './components/Auth/AuthReducer';
import UserReducer from './components/UserReducer';
import BrokerProfileReducer from './components/BrokerProfile/BrokerProfileReducer';
import AgentsAddReducer from './components/AgentsAdd/AgentsAddReducer';
import AgentsListReducer from './components/AgentsList/AgentsListReducer';
import AgentProfileReducer from './components/AgentProfile/AgentProfileReducer';
import LeadsAddReducer from './components/LeadsAdd/LeadsAddReducer';
import LeadsListReducer from './components/LeadsList/LeadsListReducer';
import LeadGroupAddReducer from './components/LeadGroupAdd/LeadGroupAddReducer';
import LeadGroupListReducer from './components/LeadGroupList/LeadGroupListReducer';
import StripeReducer from './components/Stripe/StripeReducer';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  form,
  AuthReducer,
  UserReducer,
  BrokerProfileReducer,
  AgentsAddReducer,
  AgentsListReducer,
  AgentProfileReducer,
  LeadsAddReducer,
  LeadsListReducer,
  LeadGroupAddReducer,
  LeadGroupListReducer,
  StripeReducer
});

export default rootReducer;
