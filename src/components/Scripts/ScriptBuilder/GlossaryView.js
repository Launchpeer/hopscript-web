import React from 'react';
import { GlossaryListItem } from './';

const GlossarySection = ({
  questions, header, currentQuestion, setCurrentQuestion, disableGlossary
}) => (
  <div className="mb4">
    <div className="flex flex-wrap justify-between b brand-near-black mb4">
      <div>{header}</div>
      <div className="mr1">Answers</div>
    </div>
    <div>
      {questions && questions.filter(question => question.attributes.category === header).map(categoryItem => <GlossaryListItem disableGlossary={disableGlossary} question={categoryItem} key={categoryItem.id} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />)}
    </div>
    <div className="mh1 bb bb--near-white" style={{ borderWidth: '3px' }} />
  </div>
);

const sections = ['Intro', 'Prequalifying', 'Provoking', 'Objection', 'Close'];

const GlossaryView = ({
  questions, currentQuestion, setCurrentQuestion, onClick, disableGlossary
}) => (
  <div className="pt4 pl2 pr3 br b--near-white h-100">
    <div role="button"
      className="brand-green w-100 tc pa3 mb3 b bg-light-gray mb4"
      style={{ cursor: `${disableGlossary ? 'not-allowed' : 'pointer'}` }}
      onClick={disableGlossary === false && onClick}
    > Create New Question
    </div>
    {sections.map(section => <GlossarySection disableGlossary={disableGlossary} questions={questions} header={section} key={section} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />)}

  </div>

);

export default GlossaryView;
