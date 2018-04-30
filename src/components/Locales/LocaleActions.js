import Parse from 'parse';
import { browserHistory } from 'react-router';
import {
  LOCALE_LOAD_END,
  LOCALE_CREATE_ERROR,
  LOCALE_CLEAR_ERROR,
  LOCALE_LOADING,
  LOCALE_UPDATE,
  LOCALE_FETCH_ERR
} from './LocaleTypes';

import { UPDATE_USER } from '../UserTypes';

export const createLocaleError = error => ({
  type: LOCALE_CREATE_ERROR,
  payload: error
});

export const clearError = () => ({
  type: LOCALE_CLEAR_ERROR
});

export const localeLoading = () => ({
  type: LOCALE_LOADING
});

export const createLocale = data => (dispatch) => {
  console.log('createGuide', data);
};

export const fetchLocales = () => (dispatch) => {
  dispatch(localeLoading());
  const Locale = Parse.Object.extend('Locale');
  const query = new Parse.Query(Locale);
  query
    .find()
    .then((locales) => {
      dispatch({
        type: LOCALE_LOAD_END
      });
      dispatch({
        type: LOCALE_UPDATE,
        payload: locales
      });
    })
    .catch(err => dispatch({ type: LOCALE_FETCH_ERR, payload: err }));
};
