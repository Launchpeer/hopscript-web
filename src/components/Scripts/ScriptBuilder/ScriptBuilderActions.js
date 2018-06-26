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
  CURRENT_QUESTION_UPDATE,
  CURRENT_SCRIPT_UPDATE,
  QUESTIONS_UPDATE,
  CREATING_NEW_QUESTION_UPDATE
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
  };
}

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
  };
}

// Fetch script with Cloud Code
// IF, the script has questions, hydrate the store with the question list
// set the first question to currentQuestion
// ELSE, create a new blank question
// hydrate the store with a question list containing the blank question
// set the blank question to currentQuestion

const fetchScript = (scriptId, update) => (dispatch) => {
  Parse.Cloud.run('fetchScript', { scriptId })
    .then((script) => {
      dispatch({
        type: CURRENT_SCRIPT_UPDATE,
        payload: script
      });
      if (script.attributes.questions) {
        dispatch({
          type: QUESTIONS_UPDATE,
          payload: script.attributes.questions
        });
      }
    });
};

const currentScriptUpdate = script => (dispatch) => {
  _currentScriptUpdate(script);
  if (script && script.attributes.questions) {
    dispatch({
      type: QUESTIONS_UPDATE,
      payload: script.attributes.questions
    });
  }
};

function _setNewQuestion(state) {
  console.log('setting state', state);
  return {
    type: CREATING_NEW_QUESTION_UPDATE,
    payload: state
  };
}

const newQuestion = script => (dispatch) => {
  console.log('new question');
  dispatch(_setNewQuestion(true));
};

const toggleCreationState = state => (dispatch) => {
  dispatch(_setNewQuestion(state));
};

const createNewScript = () => (dispatch) => {
  const User = Parse.User.current();
  Parse.Cloud.run('createNewScript', { userId: User.id })
    .then((script) => {
      dispatch({
        type: CURRENT_SCRIPT_UPDATE,
        payload: script
      });
      dispatch({
        type: CREATING_NEW_QUESTION_UPDATE,
        payload: true
      });
      dispatch({
        type: QUESTIONS_UPDATE,
        payload: null
      });
      browserHistory.push(`/script-builder/${script.id}`);
    });
};

const setCurrentQuestion = question => (dispatch) => {
  dispatch({
    type: CURRENT_QUESTION_UPDATE,
    payload: question
  });
};

function _createNewAudio(audioFile) {
  return new Promise((resolve) => {
    console.log('audioFile', audioFile[0]);
    const parseFile = new Parse.File('file', audioFile[0]);
    resolve(parseFile.save());
  });
}

const createNewQuestion = ({ question, scriptId }) => (dispatch) => {
  if (question.audio) {
    _createNewAudio(question.audio)
      .then((parseAudio) => {
        Parse.Cloud.run('createNewQuestion', { question: { ...question, audio: parseAudio }, scriptId })
          .then((res) => {
            dispatch(fetchScript(scriptId, true));
            dispatch({
              type: CREATING_NEW_QUESTION_UPDATE,
              payload: false
            });
            dispatch({
              type: CURRENT_QUESTION_UPDATE,
              payload: res
            });
          });
      });
  } else {
    Parse.Cloud.run('createNewQuestion', { question, scriptId })
      .then((res) => {
        dispatch(fetchScript(scriptId, true));
        dispatch({
          type: CREATING_NEW_QUESTION_UPDATE,
          payload: false
        });
        dispatch({
          type: CURRENT_QUESTION_UPDATE,
          payload: res
        });
      });
  }
};

const addAnswersToQuestion = (data, questionId, scriptId) => (dispatch) => {
  Parse.Cloud.run('createNewAnswer', { data, questionId, scriptId })
    .then((res) => {
      dispatch(currentScriptUpdate(res));
    });
};

const deleteAnswer = questionId => (dispatch) => {
  Parse.Cloud.run('deleteAnswer', { questionId, answerId })
    .then((res) => {
      dispatch(currentScriptUpdate(res));
    });
};

export const clearError = () => (dispatch) => {
  dispatch(_clearError());
};


const updateScript = (data, scriptId) => (dispatch) => {
  Parse.Cloud.run('updateScript', { scriptId, data })
    .then(() => {
      Parse.Cloud.run('fetchScript', { scriptId })
        .then((script) => {
          dispatch({
            type: CURRENT_SCRIPT_UPDATE,
            payload: script
          });
        });
    });
};

const updateQuestion = ({ data, questionId, scriptId }) => (dispatch) => {
  console.log({ data, questionId, scriptId });
  Parse.Cloud.run('updateQuestion', { data, questionId, scriptId })
    .then((res) => {
      dispatch(currentScriptUpdate(res));
    });
};

const updateAnswer = (data, answerId, scriptId) => (dispatch) => {
  Parse.Cloud.run('updateAnswer', { answer: data, answerId, scriptId })
    .then((res) => {
      dispatch(currentScriptUpdate(res));
    });
};

const removeAnswer = (answerId, scriptId, questionId) => (dispatch) => {
  Parse.Cloud.run('deleteAnswer', { answerId, scriptId, questionId })
    .then((res) => {
      dispatch(currentScriptUpdate(res));
    });
};

const deleteQuestion = (question, script) => (dispatch) => {
  Parse.Cloud.run('deleteQuestion', { question, script })
    .then((res) => {
      dispatch(currentScriptUpdate(res));
    });
};


export {
  fetchScript,
  createNewScript,
  updateScript,
  setCurrentQuestion,
  createNewQuestion,
  currentScriptUpdate,
  updateQuestion,
  addAnswersToQuestion,
  updateAnswer,
  removeAnswer,
  newQuestion,
  toggleCreationState,
  deleteQuestion
};
