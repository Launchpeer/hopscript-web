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
  LoaderOrThis,
  HSButton,
  InputNotesQuill
} from '../../common';
import { RecordAudio } from './';
import { createNewQuestion, fetchScript, uploadRecordedAudio } from './ScriptBuilderActions';

class NewQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      record: true,
      audio: null
    };

    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleRecord = this.toggleRecord.bind(this);
    this.saveAudio = this.saveAudio.bind(this);
  }

  handleFormSubmit(data) {
    this.props.createNewQuestion({
      question: data, audio: this.state.audio, description: this.state.text, scriptId: this.props.currentScript.id
    });
    this.props.toggleStep('answers');
  }

  handleNotesChange(value) {
    this.setState({ text: value });
  }

  toggleRecord() {
    this.setState({ record: !this.state.record });
  }

  saveAudio(r) {
    this.setState({ audio: r });
  }


  render() {
    const {
      handleSubmit, loading
    } = this.props;
    const { record } = this.state;
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

                { record ?
                  <div className="w-80 pt4">
                    <RecordAudio />
                    <div className="brand-green pointer pt2 underline" role="button" saveAudio={this.saveAudio} onClick={this.toggleRecord}>Switch to Upload Audio</div>
                  </div>
                  :
                  <div className="w-80 pt4">
                    <InputAudio name="audio" />
                    <div className="brand-green pointer pt2 underline" role="button" onClick={this.toggleRecord}>Switch to Record Audio</div>
                  </div>
                }


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

export default connect(mapStateToProps, {
  createNewQuestion, fetchScript, uploadRecordedAudio
})(Form);
