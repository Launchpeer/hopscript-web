/**
 * The purpose of this file is to define Redux Actions that allow an Agent to :
 * batch import leads from a csv file to our Parse database
 * Loading and Error states are handled for UX purposes
 */

import Parse from 'parse';
import Papa from 'papaparse';

import {
  LEADS_ADD_ERROR,
  LEADS_ADD_LOADING,
  LEADS_ADD_LOAD_END
} from './LeadsAddTypes';

import { fetchUser } from '../UserActions';

function _leadsAddError(error) {
  return {
    type: LEADS_ADD_ERROR,
    payload: error
  };
}

function _leadsAddLoading() {
  return {
    type: LEADS_ADD_LOADING
  };
}

function _leadsAddLoadEnd() {
  return {
    type: LEADS_ADD_LOAD_END
  };
}

/**
 * A CSV file is parsed into javascript objects using papaparse
 * docs: https://www.papaparse.com/docs
 * download is set to true, so as to handle local files
 * header is set to true, so as to format the returned objects with the keys set in the CSV's first line
 * delimiter is set to ',' to identify the next data block in CSV format
 * A formatting error is thrown if the first result does not comply to our header format of name and phone
 * @param  {object} lead object containing name and phone
 */
function _parseCSV(data) {
  return new Promise((resolve) => {
    Papa.parse(data, {
      download: true,
      header: true,
      delimiter: ",",
      complete: (results) => {
        if (!results.data[0].name || !results.data[0].phone) {
          resolve(_leadsAddError({ message: 'It looks like the leads you uploaded were incorrectly formatted. Please use the Swift Script template as a guide to format your leads or upload leads individually' }));
        }
        resolve(results.data);
      }
    });
  });
}

/**
 * A Lead Parse Object is instantiated
 * the lead's name and phone are set on the Lead object
 * the current Agent is set to the Lead object as a Pointer
 * the Lead is saved
 * @param  {object} lead object containing name and phone
 */
function _reconcileLeadToDB({ name, phone }) {
  return new Promise((resolve) => {
    const Agent = Parse.User.current();
    const Lead = Parse.Object.extend('Lead');
    const LObj = new Lead();
    LObj.set('name', name);
    LObj.set('phone', phone);
    LObj.set('agent', Agent);
    resolve(LObj.save());
  });
}

/**
 * A Lead Parse object is added to the current user's leads array as a Pointer
 * @param  {object} lead Lead Parse object
 */
function _reconcileLeadToAgent(lead) {
  return new Promise((resolve) => {
    const Agent = Parse.User.current();
    Agent.add('leads', lead);
    resolve(Agent.save());
  });
}

/**
 * A lead object is sent to _reconcileLeadToDB, which creates a Lead Parse object with the data provided and current Agent
 * the newly created Lead Parse object is sent to _reconcileLeadToAgent, which adds the Lead to the Agent as a Pointer
 * @param  {object} lead lead object containing name and phone number
 */
function _createAndReconcileLead(lead) {
  return new Promise((resolve) => {
    _reconcileLeadToDB(lead)
      .then((lObj) => {
        resolve(_reconcileLeadToAgent(lObj));
      })
      .catch((err) => {
        console.log('_reconcileLeadToDB ERR:', err);
      });
  });
}
/**
 * As an agent, I want to batch import leads via a csv file
 * First, The csv file is parsed to json with papaparse
 * Then, the eads parsed from the csv file are used to generate Lead objects in the db
 * Those Lead objects are then added to an Agent's leads pointer array
 * Finally, we fetch the updated user and rehydrate our redux store
 *
 * results.map creates an array of promises
 * promise.all will wait on all those promises to resolve before moving on
 * @param  {string} data csv file
 */

const parseCSV = data => (dispatch) => {
  dispatch(_leadsAddLoading());
  _parseCSV(data)
    .then((results) => {
      Promise.all(results.map(lead => _createAndReconcileLead(lead)))
        .then(() => {
          dispatch(fetchUser());
          dispatch(_leadsAddLoadEnd());
        })
        .catch((err) => {
          console.log('_createAndReconcileLead:', err);
        });
    })
    .catch(() => {
      dispatch(_leadsAddError({ message: 'File format is incorrect. Please use a .csv file or create leads individually' }));
    });
};

export { parseCSV };
