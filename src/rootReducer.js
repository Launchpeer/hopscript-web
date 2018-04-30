import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import AuthReducer from './components/Auth/AuthReducer';
import UserReducer from './components/UserReducer';
import CreateGuideReducer from './components/CreateGuide/CreateGuideReducer';
import LocaleReducer from './components/Locales/LocaleReducer';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  form,
  AuthReducer,
  UserReducer,
  CreateGuideReducer,
  LocaleReducer
});

export default rootReducer;
