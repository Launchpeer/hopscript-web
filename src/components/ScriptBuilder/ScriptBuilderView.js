import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChevronLeftCircle, ChevronRight, GridIcon, CheckCircle } from '../common';
import { Colors } from '../../config/styles';
import { fetchScript } from './ScriptBuilderActions';
import { QuestionBuilderForm, ScriptNameForm, AnswerBuilderForm } from './';

const ScriptInfo = ({ name, step, scriptId }) => (
  <div className="ml4">
    <ScriptNameForm name={name} scriptId={scriptId}/>
    {step === 'question' && <div className="brand-near-black">STEP 1: Add Questions to your Script</div>}
    {step === 'answers' && <div className="brand-near-black">STEP 2: Add Answers to your Question</div>}
  </div>
)

const StepIndicator = ({ step, toggle }) => (
  <div
    className="flex items-center steps pointer"
    style={{ backgroundColor: step === 'answers' ? Colors.brandPrimary : Colors.nearWhite }}
    >
    <div
      className="bg-brand-primary flex items-center h2 pl4 step-1 white pr3"
      onClick={() => toggle('question')}
    >STEP 1</div>
  <div
    className="half-circle bg-brand-primary items-center flex justify-center white"
    onClick={() => toggle('question')}
  >
    <ChevronRight width="1rem" height="1rem" stroke="white"/>
  </div>
    <div
      className="h2 flex items-center tc pr4 pl4 step-2"
      style={{
        backgroundColor: step === 'answers' ? Colors.brandPrimary : Colors.nearWhite,
        color: step === 'answers' ? Colors.white : Colors.brandNearBlack
      }}
      onClick={() => toggle('answers')}
      >STEP 2</div>
  </div>
)

const Glossary = () => (
  <div className="pa3 pt5 w-30 br b--near-white h-100">
    <div className="flex justify-between b brand-near-black mb4">
      <div>Intro</div>
      <div>Answers</div>
    </div>
    <div>
      <div className="flex justify-between items-center">
        <GridIcon width="1rem" height="1rem" fill={Colors.moonGray} />
        <CheckCircle width="2rem" height="2rem" fill={Colors.brandGreen} />
        <div className="brand-near-black">Do you need some money...</div>
        <div className="b brand-near-black">3</div>
      </div>
    </div>
  </div>
)

class ScriptBuilderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 'question'
    }
    this.props.fetchScript(this.props.params.id);
    this.toggleStep = this.toggleStep.bind(this);
  }

  toggleStep(step) {
    this.setState({ currentStep: step });
  }

  render() {
    const { currentStep } = this.state;
    const { currentScript } = this.props;
    const { currentQuestion } = this.props;
    return (
      <div>
          {currentScript &&
            <div>
              <div className="flex justify-between items-center pa3 bb bw1 b--near-white">
                  <div className="flex items-center">
                    <ChevronLeftCircle width="2rem" height="2rem" fill="black"/>
                    <ScriptInfo step={currentStep} name={currentScript.attributes.name} scriptId={currentScript.id} />
                  </div>
                  <StepIndicator step={currentStep} toggle={this.toggleStep}/>
              </div>
              <div className="w-100 flex">
                <Glossary step={currentStep} question={currentQuestion} />
                <div className="w-70 pa3">
                  {currentStep === 'question' ? <QuestionBuilderForm /> : <AnswerBuilderForm toggleStep={this.toggleStep}/>}
                </div>
              </div>
            </div>
          }
      </div>
    )
  }
};

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const { currentScript, currentQuestion } = ScriptBuilderReducer;
  return {
    currentScript,
    currentQuestion
  };
};

export default connect(mapStateToProps, {
  fetchScript
})(ScriptBuilderView);
