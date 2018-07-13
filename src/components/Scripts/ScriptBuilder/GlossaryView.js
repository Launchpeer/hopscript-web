import React from 'react';
import { GlossaryListItem } from './';

const GlossarySection = ({
  questions, header, currentQuestion, setCurrentQuestion
}) => (
  <div className="mb4">
    <div className="flex justify-between b brand-near-black mb4">
      <div>{header}</div>
      <div className="mr1">Answers</div>
    </div>
    <div>
      {questions && questions.filter(question => question.attributes.category === header).map(categoryItem => <GlossaryListItem question={categoryItem} key={categoryItem.id} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />)}
    </div>
    <div className="mh1 bb bb--near-white" style={{ borderWidth: '3px' }} />
  </div>
);

const sections = ['Intro', 'Prequalifying', 'Provoking', 'Objection', 'Close'];

const GlossaryView = ({
  questions, currentQuestion, setCurrentQuestion, onClick, step
}) => (
  <div className="pt4 pl2 pr3 br b--near-white h-100">
    { step === 'answers' &&
      <div role="button"
        className="pointer brand-green w-100 tc pa3 mb3 b bg-light-gray mb4"
        onClick={onClick}
    > Create New Question
      </div> }
    {sections.map(section => <GlossarySection questions={questions} header={section} key={section} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />)}

  </div>

);

export default GlossaryView;
