import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { recorderReducer as recorder } from 'react-recorder-redux';
import AuthReducer from './components/Auth/AuthReducer';
import UserReducer from './components/UserReducer';
import BrokerProfileReducer from './components/BrokerProfile/BrokerProfileReducer';
import AgentsAddReducer from './components/AgentsAdd/AgentsAddReducer';
import AgentsListReducer from './components/AgentsList/AgentsListReducer';
import AgentProfileReducer from './components/AgentProfile/AgentProfileReducer';
import LeadsReducer from './components/Leads/LeadsReducer';
import StripeReducer from './components/Stripe/StripeReducer';
import { ScriptBuilderReducer, ScriptsListReducer } from './components/Scripts';
import { CallReducer } from './components/Call';
import HistoryReducer from './components/History/HistoryReducer';


const rootReducer = combineReducers({
  state: (state = {}) => state,
  form,
  AuthReducer,
  UserReducer,
  BrokerProfileReducer,
  AgentsAddReducer,
  AgentsListReducer,
  AgentProfileReducer,
  LeadsReducer,
  ScriptBuilderReducer,
  ScriptsListReducer,
  StripeReducer,
  CallReducer,
  HistoryReducer,
  recorder
});

export default rootReducer;
