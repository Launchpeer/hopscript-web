import React from 'react';
import { GridIcon } from '../../common';
import { Colors } from '../../../config/styles';

const questionTrimmer = question => (
  question.length > 25 ? `${question.slice(0, 25)}...` : question
);

const GlossaryItem = ({
  question, setCurrentQuestion, currentQuestion
}) => (
  <div role="button" className="flex justify-between items-center pointer mb2" onClick={() => setCurrentQuestion(question)}>
    <div className="flex flex-row items-center">
      <GridIcon width="1rem" height="1rem" color={Colors.moonGray} />

      {currentQuestion === question ?
        <div
          className="w2 h2 bg-light-gray br-100 ml2 flex items-center justify-center"
          style={{
            backgroundColor: Colors.brandGreen,
            color: Colors.white
                }} />
      :
        <div
          className="w2 h2 bg-light-gray br-100 ml2 flex items-center justify-center"
          style={{
            backgroundColor: Colors.moonGray,
            color: Colors.white
                }} />
      }
      <div className="ml2"> {questionTrimmer(question.attributes.body)}</div>
    </div>
    <div className="b mr2">
      {question.attributes.answers ? question.attributes.answers.length : 0}
    </div>
  </div>
);

const GlossarySection = ({
  questions, header, currentQuestion, setCurrentQuestion
}) => (
  <div className="mb4">
    <div className="flex justify-between b brand-near-black mb4">
      <div>{header}</div>
      <div className="mr1">Answers</div>
    </div>
    <div>
      {questions && questions.filter(question => question.attributes.category === header).map(categoryItem => <GlossaryItem question={categoryItem} key={categoryItem.id} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />)}
    </div>
    <div className="mh1 bb b--near-white" style={{ borderWidth: '3px' }} />
  </div>
);

const sections = ['Intro', 'Prequalifying', 'Provoking', 'Objection', 'Close'];

const GlossaryView = ({
  questions, currentQuestion, setCurrentQuestion, onClick
}) => (
  <div className="pt5 pl2 pr3 br b--near-white h-100">
    {sections.map(section => <GlossarySection questions={questions} header={section} key={section} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />)}
    <div role="button"
      className="pointer brand-green w-100 tc pa3 b bg-light-gray"
      onClick={onClick}
    > Create New Question
    </div>
  </div>

);
export default GlossaryView;
