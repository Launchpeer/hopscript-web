import React from 'react';
import { GridIcon } from '../../common';
import { Colors } from '../../../config/styles';

const GlossaryItem = ({
  question, currentQuestion, setCurrentQuestion
}) => {
  console.log('question', question.id);
  return (
    <div className="flex justify-between items-center pointer mb2" onClick={() => setCurrentQuestion(question)}>
      <GridIcon width="1rem" height="1rem" fill={Colors.moonGray} />
      <div
        className="w2 h2 bg-light-gray br-100 flex items-center justify-center"
        style={{
          backgroundColor: (currentQuestion.id === question.id || !currentQuestion) ? Colors.brandGreen : Colors.lightGray,
          color: (currentQuestion.id === question.id || !currentQuestion) ? Colors.white : Colors.brandNearBlack,

        }}
         />
      {question.attributes.body || 'create question'}
      {question.attributes.answers ? question.attributes.answers.length : 0}
    </div>
  );
};

const GlossaryView = ({
  step, questions, currentQuestion, setCurrentQuestion, creatingNewQuestion
}) => (
  <div className="pt5 br b--near-white h-100">
    <div className="flex justify-between b brand-near-black mb4">
      <div>Intro</div>
      <div>Answers</div>
    </div>
    <div>
      {(questions && currentQuestion) && questions.map((question, idx) => <GlossaryItem question={question} key={question.id} idx={idx} step={step} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />)}
    </div>
    <div className="mt4 pointer"
      style={{ color: creatingNewQuestion ? 'green' : 'black' }}
      onClick={() => setCurrentQuestion(null)}>create new question
    </div>
  </div>
);
export default GlossaryView;
