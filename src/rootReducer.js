import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import AuthReducer from './components/Auth/AuthReducer';
import UserReducer from './components/UserReducer';
import BrokerProfileReducer from './components/BrokerProfile/BrokerProfileReducer';
import AgentsAddReducer from './components/AgentsAdd/AgentsAddReducer';
import AgentsListReducer from './components/AgentsList/AgentsListReducer';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  form,
  AuthReducer,
  UserReducer,
  BrokerProfileReducer,
  AgentsAddReducer,
  AgentsListReducer
});

export default rootReducer;
