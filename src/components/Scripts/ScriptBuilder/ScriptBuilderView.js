/**
 * The purpose of this file is to provide a smart component that:
 * fetches the current script, manages state for steps,
 */


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChevronLeftCircle, ChevronRight, CardRight } from '../../common';
import { Colors } from '../../../config/styles';
import { fetchScript, createNewScript, setCurrentQuestion, currentScriptUpdate } from './ScriptBuilderActions';
import { QuestionBuilderForm, ScriptNameForm, AnswerBuilderView, GlossaryView, NewQuestionForm } from './';
import subscribeToClass from '../../helpers/subscribeToClass';

const ScriptInfo = ({ name, step, scriptId }) => (
  <div className="ml4">
    <ScriptNameForm name={name} scriptId={scriptId} />
    {step === 'question' && <div className="brand-near-black">STEP 1: Add Questions to your Script</div>}
    {step === 'answers' && <div className="brand-near-black">STEP 2: Add Answers to your Question</div>}
  </div>
);

const StepIndicator = ({ step, toggle }) => (
  <div
    className="flex items-center steps pointer"
    style={{ backgroundColor: step === 'answers' ? Colors.brandPrimary : Colors.nearWhite }}
    >
    <div
      className="bg-brand-primary flex items-center h2 pl4 step-1 white pr3"
      onClick={() => toggle('question')}
    >STEP 1
    </div>
    <div
      className="half-circle bg-brand-primary items-center flex justify-center white"
      onClick={() => toggle('question')}
  >
      <ChevronRight width="1rem" height="1rem" stroke="white" />
    </div>
    <div
      className="h2 flex items-center tc pr4 pl4 step-2"
      style={{
        backgroundColor: step === 'answers' ? Colors.brandPrimary : Colors.nearWhite,
        color: step === 'answers' ? Colors.white : Colors.brandNearBlack
      }}
      onClick={() => toggle('answers')}
      >STEP 2
    </div>
  </div>
);

class ScriptBuilderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 'question'
    };
    subscribeToClass({
      columnName: 'objectId',
      columnSelector: this.props.params.id,
      className: 'Script',
      callback: data => this.handleSubscriptionCallback(data)
    });
    this.props.fetchScript(this.props.params.id);
    this.toggleStep = this.toggleStep.bind(this);
    this.createNewScript = this.createNewScript.bind(this);
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
  }

  handleSubscriptionCallback(script) {
    this.props.currentScriptUpdate(script);
  }

  toggleStep(step) {
    this.setState({ currentStep: step });
  }

  createNewScript() {
    this.props.createNewScript();
  }

  setCurrentQuestion(question) {
    this.props.setCurrentQuestion(question);
  }

  render() {
    const { currentStep } = this.state;
    const {
      currentScript, currentQuestion, questions, creatingNewQuestion
    } = this.props;
    return (
      <CardRight>
        {currentScript &&
        <div>
          <div className="flex justify-between items-center pa3 bb bw1 b--near-white">
            <div className="flex items-center">
              <ChevronLeftCircle width="2rem" height="2rem" fill="black" />
              <ScriptInfo step={currentStep} name={currentScript.attributes.name} scriptId={currentScript.id} />
            </div>
            <StepIndicator step={currentStep} toggle={this.toggleStep} />
          </div>
          <div className="w-100 flex">
            <div className="w-30 pa3">
              <GlossaryView
                questions={questions}
                step={currentStep}
                currentQuestion={currentQuestion}
                setCurrentQuestion={this.setCurrentQuestion}
                creatingNewQuestion={creatingNewQuestion} />
            </div>
            <div className="w-70 pa3">
              {creatingNewQuestion
              ?
                <NewQuestionForm scriptId={this.props.params.id} toggleStep={this.toggleStep} />
              :
                <div>
                  {(currentStep === 'question')
                    ? <QuestionBuilderForm
                      scriptId={this.props.params.id}
                      toggleStep={this.toggleStep}
                      />
                    : <AnswerBuilderView
                      toggleStep={this.toggleStep}
                      questions={questions}
                      />
                  }
                </div>
              }
            </div>
          </div>
        </div>
          }
      </CardRight>
    );
  }
}

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    currentScript, currentQuestion, questions, creatingNewQuestion
  } = ScriptBuilderReducer;
  return {
    currentScript,
    currentQuestion,
    questions,
    creatingNewQuestion
  };
};

export default connect(mapStateToProps, {
  fetchScript,
  createNewScript,
  setCurrentQuestion,
  currentScriptUpdate
})(ScriptBuilderView);
