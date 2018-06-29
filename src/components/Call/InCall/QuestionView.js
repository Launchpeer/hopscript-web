import React from 'react';
import { AnswersList } from './';

const QuestionView = ({ currentQuestion, setCurrentQuestion }) => (
  <div>
    <div className="b f3 mb4 brand-near-black">{currentQuestion.attributes.body || 'Unnamed Question'}</div>
    {currentQuestion.attributes.description && <div className="f5 mb4">{currentQuestion.attributes.description}</div>}
    {currentQuestion.attributes.audio &&
      <div>
        <div className="f4 b brand-near-black mb2">Play audio</div>
        <div className="f5 mb4 pa3 bg-light-gray">has audio</div>
      </div>
    }
    {currentQuestion.attributes.answers
      ?
        <AnswersList answers={currentQuestion.attributes.answers} setCurrentQuestion={setCurrentQuestion} />
      :
        <div>No answers</div>
    }
  </div>
)

export default QuestionView;
