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
  InputAudio,
  InputRecordAudio,
  LoaderOrThis,
  HSButton,
  InputNotesQuill
} from '../../common';
import { createNewQuestion, fetchScript, recordAudio } from './ScriptBuilderActions';

class NewQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.recordAudio = this.recordAudio.bind(this);
  }

  handleFormSubmit(data) {
    this.props.createNewQuestion({ question: data, description: this.state.text, scriptId: this.props.currentScript.id });
    this.props.toggleStep('answers');
  }

  handleNotesChange(value) {
    this.setState({ text: value });
  }

  recordAudio() {
    this.props.recordAudio();
  }

  render() {
    const {
      handleSubmit, loading
    } = this.props;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
          >
            <div className="mb6">
              <div className="single-line-textarea">
                <InputTextArea name="body" placeholder="Write Question Here" />
              </div>
              <div className="flex mt4 justify-between">
                <div className="w-20">Description</div>
                <div className="w-80">
                  <div className="block-textarea-quill">
                    <InputNotesQuill handleChange={this.handleNotesChange} text={this.state.text} placeholder="Optional description." />
                  </div>
                </div>
              </div>
              <div className="flex mt4 items-center justify-between">
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
              <div className="flex items-center justify-between">
                <div className="w-20">Audio</div>
                <div className="w-80">
                  <InputAudio name="audio" />
                  <InputRecordAudio name="audio" record={this.recordAudio} />
                </div>
              </div>
            </div>
            <div className="pt5">
              <HSButton backgroundColor={Colors.brandGreen}>Save Question</HSButton>
            </div>

          </form>
        </LoaderOrThis>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.category) {
    errors.category = '*required';
  }

  return errors;
}

const Form = reduxForm({
  form: 'newQuestion',
  validate
})(NewQuestionForm);

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    error, loading, currentScript
  } = ScriptBuilderReducer;
  return {
    loading,
    error,
    currentScript,
  };
};

export default connect(mapStateToProps, { createNewQuestion, fetchScript, recordAudio })(Form);
