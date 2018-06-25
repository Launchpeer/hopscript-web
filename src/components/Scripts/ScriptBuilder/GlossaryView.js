import React from 'react';
import { GridIcon } from '../../common';
import { Colors } from '../../../config/styles';

const GlossaryItem = ({
  question, currentQuestion, setCurrentQuestion
}) => {
  console.log('current', currentQuestion)
  return (
    <div className="flex justify-between items-center pointer mb2" onClick={() => setCurrentQuestion(question)}>
      <GridIcon width="1rem" height="1rem" fill={Colors.moonGray} />
      <div
        className="w2 h2 bg-light-gray br-100 flex items-center justify-center"
        style={{
          backgroundColor: Colors.brandGreen,
          color: Colors.white,

        }}
         />
      {question.attributes.body || 'create question'}
      {question.attributes.answers ? question.attributes.answers.length : 0}
    </div>
  );
};

const GlossarySection = ({ questions, header, currentQuestion, setCurrentQuestion }) => {
  return (
    <div>
      <div className="flex justify-between b brand-near-black mb4">
        <div>{header}</div>
        <div>Answers</div>
      </div>
      <div>
        {questions && questions.filter(question => question.attributes.category === header).map((categoryItem) => <GlossaryItem question={categoryItem} key={categoryItem.id} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />)}
      </div>
    </div>
  );
}

const sections = ['Intro', 'Prequalifying', 'Provoking', 'Objection', 'Close'];

const GlossaryView = ({
  step, questions, currentQuestion, setCurrentQuestion, creatingNewQuestion
}) => (
  <div className="pt5 br b--near-white h-100">
    {sections.map(section => <GlossarySection questions={questions} header={section} key={section} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />)}
    <div className="mt4 pointer"
      style={{ color: creatingNewQuestion ? 'green' : 'black' }}
      onClick={() => setCurrentQuestion(null)}>create new question
    </div>
  </div>
);
export default GlossaryView;
