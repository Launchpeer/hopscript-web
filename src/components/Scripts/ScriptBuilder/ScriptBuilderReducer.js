import {
  CURRENT_QUESTION_LOAD_END,
  CURRENT_QUESTION_ERROR,
  CURRENT_QUESTION_LOADING,
  CURRENT_QUESTION_UPDATE,
  CURRENT_SCRIPT_LOAD_END,
  CURRENT_SCRIPT_ERROR,
  CURRENT_SCRIPT_LOADING,
  CURRENT_SCRIPT_UPDATE,
  QUESTIONS_UPDATE,
  CREATING_NEW_QUESTION_UPDATE,
  UPDATE_CURRENT_ANSWER,
  DISABLE_GLOSSARY
} from './ScriptBuilderTypes';

const INITIAL_STATE = {
  loading: false,
  currentScript: null,
  questions: [],
  creatingNewQuestion: false,
  currentAnswer: null,
  disableGlossary: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_QUESTION_ERROR:
      return { ...state, error: action.payload };
    case CURRENT_QUESTION_LOAD_END:
      return { ...state, loading: false };
    case CURRENT_QUESTION_LOADING:
      return { ...state, loading: true };
    case CURRENT_QUESTION_UPDATE:
      return { ...state, currentQuestion: action.payload };
    case CURRENT_SCRIPT_ERROR:
      return { ...state, error: action.payload };
    case CURRENT_SCRIPT_LOAD_END:
      return { ...state, loading: false };
    case CURRENT_SCRIPT_LOADING:
      return { ...state, loading: true };
    case CURRENT_SCRIPT_UPDATE:
      return { ...state, currentScript: action.payload };
    case QUESTIONS_UPDATE:
      return { ...state, questions: action.payload };
    case CREATING_NEW_QUESTION_UPDATE:
      return { ...state, creatingNewQuestion: action.payload };
    case UPDATE_CURRENT_ANSWER:
      return { ...state, currentAnswer: action.payload };
    case DISABLE_GLOSSARY:
      return { ...state, disableGlossary: action.payload };
    default:
      return state;
  }
}
