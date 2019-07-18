import React from 'react'
import { GlossaryListItem } from './index'
import { Row, Col, Button, Modal } from 'antd'


const GlossarySection = ({
                           questions,
                           currentQuestion,
                           setCurrentQuestion,
                           disableGlossary,
                           toggleAddNewQuestion,
                           handleDeleteInformationQuestion,
                         }) => (
  <div className="mb4">
    <div className="flex flex-wrap justify-between b brand-near-black mb4">
      {/*<div>{header}</div>*/}
      {/*<div className="mr1">Answers</div>*/}
    </div>
    <div>
      {questions && questions.filter(question => question.attributes.category === 'informationQuestion').map(categoryItem =>
        <div className="information-bubble-container">
          <div>
            <p>{categoryItem.attributes.body}</p>
            <Button style={{ float: 'right' }} icon="delete"
                    onClick={(e) => handleDeleteInformationQuestion(e, categoryItem)} />
          </div>

        </div>,
      )}
      {questions && questions.filter(question => question.attributes.category === 'mainQuestion').map(categoryItem =>
        <GlossaryListItem
          disableGlossary={disableGlossary}
          question={categoryItem}
          questions={questions}
          key={categoryItem.id}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          toggleAddNewQuestion={toggleAddNewQuestion}
        />)}
    </div>
    {/*<div className="mh1 bb bb--near-white" style={{ borderWidth: '3px' }} />*/}
  </div>
)

const sections = ['Intro', 'Prequalifying', 'Provoking', 'Objection', 'Close']

const GlossaryView = ({
                        questions,
                        currentQuestion,
                        setCurrentQuestion,
                        onClick,
                        createInformationBubble,
                        disableGlossary,
                        existInformationBubble,
                        addQuestionTitle,
                        currentStep,
                        NewQuestionFormChildren,
                        addQuestionStatus,
                        toggleAddNewQuestion,
                        handleDeleteInformationQuestion,
                      }) => {
  return (
    <div className="pt4 pl2 pr3 br b--near-white h-100">
      <div role="button"
           className="brand-green w-20 tc pa3 mb3 b bg-light-gray mb4"
           style={{ cursor: `${disableGlossary ? 'not-allowed' : 'pointer'}` }}
           onClick={disableGlossary === false && onClick}
      > Create New Question
      </div>
      <div role="button"
           className="brand-green w-20 tc pa3 mb3 b bg-light-gray mb4"
           style={{ cursor: 'pointer', display: `${existInformationBubble ? 'none' : 'block'}` }}
           onClick={createInformationBubble}
      > Create information bubble
      </div>
      {addQuestionStatus &&
      <div className="pt4">
        <strong>{addQuestionTitle}</strong>
        {NewQuestionFormChildren}
      </div>
      }
      <div>
        <Row>
          <Col span={20}>
            <Row>
              <Col span={4}>
                <div className="question-legend-color">&nbsp;</div>
                <strong>Questions</strong>
              </Col>
              <Col span={4}>
                <div className="answer-legend-color">&nbsp;</div>
                <strong>Answers</strong>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <GlossarySection
        disableGlossary={disableGlossary}
        questions={questions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        toggleAddNewQuestion={toggleAddNewQuestion}
        handleDeleteInformationQuestion={handleDeleteInformationQuestion}
      />
    </div>

  )
}

export default GlossaryView
