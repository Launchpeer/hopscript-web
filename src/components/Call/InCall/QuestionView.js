import React from 'react';
import Parser from 'html-react-parser';
import { Play, Square } from 'react-feather';
import { AnswersList } from './';

const stopUI = (state) => {
  if (state === true) {
    return "brand-near-black pa2 mh2 items-center bg-light-grey pointer";
  }
  return "near-white pa2 mh2 items-center bg-brand-green pointer";
};

const playUI = (state) => {
  if (state === true) {
    return "near-white pa2 mh2 items-center green-glow pointer";
  }
  return "brand-near-black pa2 mh2 items-center bg-light-grey pointer";
};

const notesConverter = notes => (
  React.createElement('div', {}, Parser(notes)));

const QuestionView = ({
  currentQuestion, setCurrentQuestion, playAudio, stopAudio, audioState
}) => (
  <div>
    <div className="b f3 mb4 brand-near-black">{currentQuestion.attributes.body || 'Unnamed Question'}</div>
    {currentQuestion.attributes.description && <div className="f5 mb4">{notesConverter(currentQuestion.attributes.description)}</div>}
    {currentQuestion.attributes.audioURI &&
      <div className="flex flex-row mv2 ">
        <div className="f4 b brand-near-black pa2 mh2 items-center ">Play Audio</div>
        <div
          className={stopUI(audioState)}
          role="button"
          onClick={stopAudio} >
          <Square />
        </div>
        <div
          className={playUI(audioState)}
          role="button"
          onClick={playAudio} >
          <Play />
        </div>

      </div>
    }
    {currentQuestion.attributes.answers
      ?
        <AnswersList answers={currentQuestion.attributes.answers} setCurrentQuestion={setCurrentQuestion} />
      :
        <div>No answers</div>
    }
  </div>
);

export default QuestionView;
