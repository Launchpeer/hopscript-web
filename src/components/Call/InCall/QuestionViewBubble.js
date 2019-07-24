import React, { useState, useEffect } from 'react';
import Parser from 'html-react-parser';
import { Play, Square } from 'react-feather';
import { AnswersList } from './';
import { Colors } from '../../../config/styles';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuidv4 from 'uuid/v4';
import cx from 'classnames'

const stopUI = (state) => {
  if (state === true) {
    return "brand-near-black pa2 mh2 items-center bg-light-grey pointer";
  }
  return "near-white pa2 mh2 items-center bg-brand-green pointer";
};

const playUI = (state) => {
  if (state === true) {
    return "near-white pa2 mh2 items-center green-glow pointer";
  }
  return "brand-near-black pa2 mh2 items-center bg-light-grey pointer";
};

const notesConverter = notes => (
  React.createElement('div', {}, Parser(notes)));


const renderViewContent = (currentQuestion, setCurrentQuestion, playAudio, stopAudio, audioState, goToPreviousQuestion, previousQuestion) => {
  return (<React.Fragment>
      {_.isObject(currentQuestion) ? (<div key={currentQuestion.attributes.id}>
        <div
          className="flex w-50 fl items-center justify-between pa3 pointer list-hover circleBase type-500"
          onClick={() => goToPreviousQuestion()}
          role="button"
          style={{
            backgroundColor: (currentQuestion && currentQuestion.attributes.id === currentQuestion.id) ? Colors.lightGray : Colors.white,
          }}
        >
          <p
            style={{
              color: (currentQuestion && currentQuestion.attributes.id === currentQuestion.id) ? Colors.brandGreen : Colors.brandNearBlack,
            }}
          >{currentQuestion.attributes.body || 'unnamed question'}
          </p>
        </div>

        <div className="w-40 answer-container">
          {currentQuestion.attributes.answers && currentQuestion.attributes.answers.map((answer, index) => {
            return (
            <div
              className="w-20 fl mv3 mh2 items-center justify-between pa3 pointer list-hover circleBase type-200-answer"
              onClick={answer.attributes.hasOwnProperty('route') ? () => setCurrentQuestion(answer.attributes.route) : null}
              role="button"
              style={{
                cursor: answer.attributes.hasOwnProperty('route') ? 'pointer' : 'default',
              }}
              key={index}
            >
              <p
                style={{
                  // color: (currentQuestion && currentQuestion.id === question.id) ? Colors.brandGreen : Colors.brandNearBlack,
                }}
              >{answer.attributes.body || 'unnamed question'}
              </p>
            </div>
          )})}
        </div>
      </div>): null}
    </React.Fragment>
  )
}

const QuestionViewBubble = ({
                              currentQuestion, setCurrentQuestion, playAudio, stopAudio, audioState, goToPreviousQuestion,
                              showRender, goForwardStatus, previousQuestion, nextQuestionToRout
                            }) => {

  let viewContent = renderViewContent(
    nextQuestionToRout,
    setCurrentQuestion,
    playAudio,
    stopAudio,
    audioState,
    goToPreviousQuestion
  )

  const [upperBubble, setUpperBubble] = useState(viewContent);
  const [lowerBubble, setLowerBubble] = useState(viewContent);


  useEffect(() => {
    if (showRender) {
      setUpperBubble(viewContent)
    } else {
      setLowerBubble(viewContent)
    }
  }, [showRender])

  return (
    <div className={cx({ forward : goForwardStatus, back:!goForwardStatus })} >
      <CSSTransition
        in={showRender}
        timeout={2000}
        classNames="background"
        unmountOnExit
      >
        <React.Fragment>
          {upperBubble}
        </React.Fragment>
      </CSSTransition>
      <CSSTransition
        in={!showRender}
        timeout={2000}
        classNames="background"
        unmountOnExit
      >
        <React.Fragment>
          {lowerBubble}
        </React.Fragment>
      </CSSTransition>
    </div>

  );
};

export default QuestionViewBubble;
