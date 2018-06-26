/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to create a question
 * question, description, category, audio, boolean for closing statement
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../../config/styles';
import {
  InputTextArea,
  InputDropDown,
  InputCheckbox,
  InputAudio,
  LoaderOrThis,
  Button
} from '../../common';
import { createNewQuestion, fetchScript } from './ScriptBuilderActions';

class QuestionBuilderForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNewQuestion = this.handleNewQuestion.bind(this);
  }

  handleFormSubmit(data) {
    this.props.createNewQuestion({ question: data, scriptId: this.props.currentScript.id });
    this.props.toggleStep('answers');
  }

  handleNewQuestion() {
    this.props.createNewQuestion({ question: {}, scriptId: this.props.scriptId });
    this.props.toggleStep('answers');
  }

  render() {
    const {
      handleSubmit, loading, toggleStep
    } = this.props;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className="single-line-textarea">
              <InputTextArea name="attributes.body" placeholder="Write Question Here" />
            </div>
            <div className="flex mt4 justify-between">
              <div className="w-20">Description</div>
              <div className="w-80">
                <div className="block-textarea">
                  <InputTextArea name="attributes.description" placeholder="Optional Description" />
                </div>
              </div>
            </div>
            <div className="flex items-center mt4 justify-between">
              <div className="w-20">Category</div>
              <div className="w-80">
                <InputDropDown
                  name="category"
                  type="dropdown"
                  placeholder="Choose category"
                  options={['Intro', 'Prequalifying', 'Provoking', 'Objection', 'Close']}
                  borderColor={Colors.moonGray}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-20">Audio</div>
              <div className="w-80">
                <InputAudio name="audio" />
              </div>
            </div>
            <div className="flex justify-end mt6">
              <Button
                onClick={(e) => { e.preventDefault(); toggleStep('answers'); }}
                borderColor={Colors.brandGreen}
                borderWidth="1px"
                fontColor={Colors.brandGreen}
                classOverrides="flex items-center mr2"
              >
                Go to Step 2: Answers
              </Button>
              <Button backgroundColor={Colors.brandGreen}>save</Button>
            </div>
          </form>
        </LoaderOrThis>
      </div>
    );
  }
}


const Form = reduxForm({
  form: 'questionBuilder',
  enableReinitialize: true
})(QuestionBuilderForm);

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    error, loading, currentQuestion, currentScript, questions
  } = ScriptBuilderReducer;
  return {
    loading,
    error,
    initialValues: currentQuestion,
    currentQuestion,
    currentScript,
    questions
  };
};

export default connect(mapStateToProps, { createNewQuestion, fetchScript })(Form);
