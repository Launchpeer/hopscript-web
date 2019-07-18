import React from 'react';
import { Colors } from '../../../config/styles';

const sections = ['mainQuestion', 'Prequalifying', 'Provoking', 'Objection', 'Close'];

const QuestionsGlossaryItemCustom = ({
                                       question, setCurrentQuestion, currentQuestion, additionalClassName
                                     }) => (
  <div
    className={`flex w-100 fl items-center justify-between pa3 pointer list-hover circleBase ${additionalClassName} ${(question.attributes.category === 'informationQuestion') ? 'type-400-information-bubble' : 'type-240'}`}
    onClick={(question.attributes.category === 'mainQuestion') ? () => setCurrentQuestion(question , true) : null}
    role="button"
    style={{
      backgroundColor: (currentQuestion && currentQuestion.id === question.id) ? Colors.lightGray : Colors.white,
    }}
  >
    <p
      style={{
        color: (currentQuestion && currentQuestion.id === question.id) ? Colors.brandGreen : Colors.brandNearBlack,
      }}
    >{question.attributes.body || 'unnamed question'}
    </p>
  </div>
);

const GlossarySectionCustom = ({
                                 questions, header, setCurrentQuestion, currentQuestion, additionalClassName
                               }) => (
  <div>
    {questions && questions.filter(question => (question.attributes.category === 'informationQuestion')).map(categoryItem =>
      <QuestionsGlossaryItemCustom
        question={categoryItem}
        key={categoryItem.id}
        setCurrentQuestion={setCurrentQuestion}
        currentQuestion={currentQuestion}
        additionalClassName={additionalClassName}
      />
    )}
    {questions && questions.filter(question => (question.attributes.category === 'mainQuestion')).map(categoryItem =>
      <QuestionsGlossaryItemCustom
        question={categoryItem}
        key={categoryItem.id}
        setCurrentQuestion={setCurrentQuestion}
        currentQuestion={currentQuestion}
        additionalClassName={additionalClassName}
      />
    )}
  </div>
);

const QuestionsGlossaryBubbleView = ({ questions, setCurrentQuestion, currentQuestion, additionalClassName }) => (
  <div>
    {sections.map(section => section === 'mainQuestion' &&
      <GlossarySectionCustom
      questions={questions}
      header={section}
      key={section}
      setCurrentQuestion={setCurrentQuestion}
      currentQuestion={currentQuestion}
      additionalClassName={additionalClassName}
    />)}
  </div>
);

export default QuestionsGlossaryBubbleView;
