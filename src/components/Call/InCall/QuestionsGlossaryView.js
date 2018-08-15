import React from 'react';
import { Colors } from '../../../config/styles';

const sections = ['Intro', 'Prequalifying', 'Provoking', 'Objection', 'Close'];

const QuestionsGlossaryItem = ({
  question, setCurrentQuestion, currentQuestion
}) => (
  <div
    className="flex w-100 items-center justify-between pa3 pointer list-hover"
    onClick={() => setCurrentQuestion(question)}
    role="button"
    style={{
        backgroundColor: (currentQuestion && currentQuestion.id === question.id) ? Colors.lightGray : Colors.white,
      }}
    >
    <div
      style={{
          color: (currentQuestion && currentQuestion.id === question.id) ? Colors.brandGreen : Colors.brandNearBlack,
        }}
        >{question.attributes.body || 'unnamed question'}
    </div>
  </div>
);

const GlossarySection = ({
  questions, header, setCurrentQuestion, currentQuestion
}) => (
  <div className="mb4 bb bb--near-white bw1 pb3">
    <div className="flex justify-between b brand-near-black mb4">
      <div className="pa3">{header}</div>
    </div>
    <div>
      {questions && questions.filter(question => question.attributes.category === header).map(categoryItem => <QuestionsGlossaryItem question={categoryItem} key={categoryItem.id} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />)}
    </div>
  </div>
);

const QuestionsGlossaryView = ({ questions, setCurrentQuestion, currentQuestion }) => (
  <div>
    {sections.map(section => <GlossarySection questions={questions} header={section} key={section} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />)}
  </div>
);

export default QuestionsGlossaryView;
