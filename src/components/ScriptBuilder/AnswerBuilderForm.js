/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to create an answer
 * answer, description, category, audio, boolean for closing statement
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors, BorderRadius } from '../../config/styles';
import {
  InputTextArea,
  InputDropDown,
  LoaderOrThis,
  Button,
  TrashIcon,
  PlusIcon
} from '../common';
import { batchImportAnswers } from './ScriptBuilderActions';

const AnswerBlock = ({ answer, removeAnswer, idx }) => {
 return (<div>
   <div className="flex mt4">
     <div className="w-10">
       <div className="h2 w2 bg-brand-green white br-100 flex justify-center items-center">{idx + 1}</div>
     </div>
     <div className="w-10">Answer</div>
     <div className="w-60">
       <div className="block-textarea">
         <InputTextArea name={`answer${idx}`} body="answer" placeholder="Type Answer here" />
       </div>
     </div>
     <div className="w-30">
       <div
         className="bg-light-gray flex items-center justify-center pa2 w3 h3 ml2 pointer"
         style={{ borderRadius: BorderRadius.all}}
         onClick={() => removeAnswer(idx)}
        >
         <TrashIcon color={Colors.silver} width="1rem" height="1rem" />
       </div>
     </div>
   </div>
   <div className="flex items-center">
     <div className="w-10">Route to</div>
     <div className="w-60">
       <InputDropDown
         name={`route${idx}`}
         type="dropdown"
         placeholder="Route to"
         options={['Lead Type 1', 'Lead Type 2', 'Lead Type 3']}
         borderColor={Colors.moonGray}
       />
     </div>
   </div>
 </div>)
}


class AnswerBuilderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [{
        'key': 1,
        'answer': 'answer1',
        'route': 'route1'
      }]
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
  }

  handleFormSubmit(data) {
    this.props.batchImportAnswers({
      data,
      questionId: this.props.currentQuestion.id,
      scriptId: this.props.currentScript.id
    })
  }

  addAnswer() {
    this.setState({ answers: [...this.state.answers, { name: null, route: null, key: this.state.answers.length + 1 }]});
  }

  removeAnswer(idx) {
    this.setState({ answers: this.state.answers.filter((item, index) => index !== idx)})
  }

  render() {
    const {
      handleSubmit, valid, loading, error, onSubmit, toggleStep
    } = this.props;
    const { answers } = this.state;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
          >
          <div className="single-line-textarea">
            <InputTextArea name="name" placeholder="Write Question Here"/>
          </div>
            {answers && answers.map((answer, idx) => (
              <AnswerBlock answer={answer} idx={idx} key={idx} removeAnswer={this.removeAnswer}/>
            ))}
            <div className="flex items-center pointer" onClick={this.addAnswer}>
              <PlusIcon color={Colors.brandNearBlack} width="2rem" height="2rem"/>
              <div className="b brand-near-black">Add answer</div>
            </div>
            <div className="flex justify-end mt6">
              <Button
                onClick={(e) => {e.preventDefault(); toggleStep('question')}}
                borderColor={Colors.brandGreen}
                borderWidth="1px"
                fontColor={Colors.brandGreen}
                classOverrides="flex items-center mr2"
              >
                Back to Step 1: Questions
              </Button>
              <Button backgroundColor={Colors.brandGreen}>Go to Next Question</Button>
            </div>
          </form>
        </LoaderOrThis>
      </div>
    );
  }
}

let Form = reduxForm({
  form: 'answerBuilder',
  enableReinitialize: true
})(AnswerBuilderForm);

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const { error, loading, currentQuestion, currentScript } = ScriptBuilderReducer;
  return {
    loading,
    error,
    initialValues: currentQuestion,
    currentQuestion,
    currentScript
  };
};

export default connect(mapStateToProps, { batchImportAnswers })(Form);
