import React from 'react';
import { GridIcon, CheckCircle } from '../common';
import { Colors } from '../../config/styles';

const GlossaryItem = ({ question, idx, step, currentQuestion, setCurrentQuestion }) => {
  return (
    <div className="flex justify-between items-center pointer mb2" onClick={() => setCurrentQuestion(question)}>
      <GridIcon width="1rem" height="1rem" fill={Colors.moonGray} />
      { step === 'question'
        ? <div
          className="w2 h2 bg-light-gray br-100 flex items-center justify-center"
          style={{
            backgroundColor: (currentQuestion.id === question.id || !currentQuestion) ? Colors.brandGreen : Colors.lightGray,
            color: (currentQuestion.id === question.id || !currentQuestion) ? Colors.white : Colors.brandNearBlack,

          }}
          ></div>
        : <div>
            {currentQuestion.id === question.id
              ? <CheckCircle width="2rem" height="2rem" color={Colors.brandGreen} checked={question.attributes.questions} />
              : <CheckCircle width="2rem" height="2rem" color={Colors.lightGray} checked={question.attributes.questions} />
            }
          </div>
      }
      {question.attributes.body || 'create question'}
      {question.attributes.answers ? question.attributes.answers.length : 0}
    </div>
  )
}

const GlossaryView = ({ step, questions, currentQuestion, setCurrentQuestion }) => {
  return (
  <div className="pt5 br b--near-white h-100">
    <div className="flex justify-between b brand-near-black mb4">
      <div>Intro</div>
      <div>Answers</div>
    </div>
    <div>
      {questions.map((question, idx) => <GlossaryItem question={question} key={question.id} idx={idx} step={step} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />)}
    </div>
  </div>
)}

export default GlossaryView;
