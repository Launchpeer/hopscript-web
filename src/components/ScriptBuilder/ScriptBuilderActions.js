/**
 * The purpose of this file is to define Redux Actions that allow an Agent to :
 * fetch a script, create questions, delete questions, create answers, delete answers
 * Loading and Error states are handled for UX purposes
 */

import Parse from 'parse';
import { browserHistory } from 'react-router';

import {
  CURRENT_QUESTION_ERROR,
  CURRENT_QUESTION_CLEAR_ERROR,
  CURRENT_QUESTION_LOADING,
  CURRENT_QUESTION_LOAD_END,
  CURRENT_SCRIPT_FETCH_ERROR,
  CURRENT_SCRIPT_FETCH_LOADING,
  CURRENT_SCRIPT_FETCH_LOAD_END,
  CURRENT_SCRIPT_UPDATE,
  FETCH_QUESTION_ERROR,
  FETCH_SCRIPT_ERROR
} from './ScriptBuilderTypes';


function _answerAddError(error) {
  return {
    type: CURRENT_QUESTION_ERROR,
    payload: error
  };
}

function _clearError() {
  return {
    type: CURRENT_QUESTION_CLEAR_ERROR
  }
};

function _answerAddLoading() {
  return {
    type: CURRENT_QUESTION_LOADING
  };
}

function _answerAddLoadEnd() {
  return {
    type: CURRENT_QUESTION_LOAD_END
  };
}

function _currentScriptUpdate(script) {
  return {
    type: CURRENT_SCRIPT_UPDATE,
    payload: script
  }
}

function _fetchQuestion(questionId) {
  return new Promise((resolve) => {
    const Question = Parse.Object.extend('Question');
    const query = new Parse.Query(Question);
    resolve(query.get(questionId));
  })
}

const fetchScript = (scriptId) => (dispatch) => {
  dispatch({type: CURRENT_SCRIPT_FETCH_LOADING});
  const Script = Parse.Object.extend('Script');
  const query = new Parse.Query(Script);
  query.include('questions');
  query.include('questions.answers');
  query.get(scriptId)
    .then((script) => {
      dispatch(_currentScriptUpdate(script));
      dispatch({type: CURRENT_SCRIPT_FETCH_LOAD_END});
    })
    .catch((err) => {
      dispatch({
        type: FETCH_SCRIPT_ERROR,
        payload: err
      });
      dispatch({type: CURRENT_SCRIPT_FETCH_LOAD_END});
    })
}

const createNewScript = () => (dispatch) => {
  const Script = new Parse.Object.extend('Script');
  const User = Parse.User.current();
  Script.set('owner', User);
  Script.save()
    .then((script) => {
      dispatch({
        type: CURRENT_QUESTION_UPDATE,
        payload: null
      })
      browserHistory.push(`/script-builder/:${script.id}`);
    })
}

const createNewAnswer = ({ body, description, category, audio, scriptId }) => (dispatch) => {
  return new Promise((resolve) => {
    const Answer = new Parse.Object.extend('Answer');
    Answer.set('body', body);
    Answer.set('category', category);
    if (audio) {
      Answer.set('audioURI', audio);
    }
    resolve(Answer.save());
  })
}

const createNewQuestion = ({ body, questionId }) => (dispatch) => {
  return new Promise((resolve) => {
    const Question = new Parse.Object.extend('Question');
    Question.set('route', questionId);
    Question.set('body', body);
    resolve(Question.save());
  })
}


export const clearError = () => (dispatch) => {
  dispatch(_clearError());
}

const updateScript = (data, scriptId) => (dispatch) => {
  return new Promise((resolve) => {
    const Script = Parse.Object.extend('Script');
    const query = new Parse.Query(Script);
    query.get(scriptId)
      .then((script) => {
        script.set('name', data.name);
        resolve(script.save());
      })
      .catch((err) => {
        dispatch({
          type: FETCH_SCRIPT_ERROR,
          payload: err
        });
      })
  })
}

export { fetchScript, createNewAnswer, createNewScript, updateScript };
