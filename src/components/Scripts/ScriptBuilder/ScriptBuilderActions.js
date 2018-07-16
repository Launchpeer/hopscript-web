/**
 * The purpose of this file is to define Redux Actions that allow an Agent to :
 * fetch a script, create questions, delete questions, create answers, delete answers
 * Loading and Error states are handled for UX purposes
 */

import Parse from 'parse';
import { browserHistory } from 'react-router';

import {
  CURRENT_QUESTION_CLEAR_ERROR,
  CURRENT_QUESTION_LOADING,
  CURRENT_QUESTION_LOAD_END,
  CURRENT_QUESTION_UPDATE,
  CURRENT_SCRIPT_UPDATE,
  QUESTIONS_UPDATE,
  CREATING_NEW_QUESTION_UPDATE,
  UPDATE_CURRENT_ANSWER
} from './ScriptBuilderTypes';

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

const fetchScript = scriptId => (dispatch) => {
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
  return {
    type: CREATING_NEW_QUESTION_UPDATE,
    payload: state
  };
}

const newQuestion = () => (dispatch) => {
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
    const parseFile = new Parse.File('file', audioFile[0]);
    resolve(parseFile.save());
  });
}

const createNewQuestion = ({ question, description, scriptId, }) => (dispatch) => {
  dispatch(_answerAddLoading());
  if (question.audio) {
    _createNewAudio(question.audio)
      .then((parseAudio) => {
        delete question.audio;
        Parse.Cloud.run('createNewQuestion', { question: { ...question, audioURI: parseAudio._url, description }, scriptId })
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
            dispatch(_answerAddLoadEnd());
          });
      });
  } else {
    Parse.Cloud.run('createNewQuestion', { question: { ...question, description }, scriptId })
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
        dispatch(_answerAddLoadEnd());
      });
  }
};

const addAnswersToQuestion = (data, questionId, scriptId) => (dispatch) => {
  Parse.Cloud.run('createNewAnswer', { data, questionId, scriptId })
    .then((res) => {
      dispatch(currentScriptUpdate(res));
    });
};

export const clearError = () => (dispatch) => {
  dispatch(_clearError());
};


const updateScript = (data, scriptId) => (dispatch) => {
  dispatch(_answerAddLoading());
  if (data.audio) {
    _createNewAudio(data.audio)
      .then((parseAudio) => {
        delete data.audio;
        Parse.Cloud.run('updateScript', { scriptId, data: { ...data, audioURI: parseAudio._url } })
          .then(() => {
            Parse.Cloud.run('fetchScript', { scriptId })
              .then((script) => {
                dispatch({
                  type: CURRENT_SCRIPT_UPDATE,
                  payload: script
                });
                dispatch(_answerAddLoadEnd());
              });
          });
      });
  } else {
    Parse.Cloud.run('updateScript', { scriptId, data })
      .then(() => {
        Parse.Cloud.run('fetchScript', { scriptId })
          .then((script) => {
            dispatch({
              type: CURRENT_SCRIPT_UPDATE,
              payload: script
            });
            dispatch(_answerAddLoadEnd());
          });
      });
  }
};

const updateQuestion = ({
  data, description, questionId, scriptId
}) => (dispatch) => {
  Parse.Cloud.run('updateQuestion', { data: { ...data, description }, questionId, scriptId })
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

const setCurrentAnswer = answer => (dispatch) => {
  dispatch({
    type: UPDATE_CURRENT_ANSWER,
    payload: answer
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
  deleteQuestion,
  setCurrentAnswer
};
