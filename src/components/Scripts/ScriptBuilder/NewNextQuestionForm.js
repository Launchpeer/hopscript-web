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
import { createNewQuestionAndUpdateAnswer, fetchScript, uploadRecordedAudio } from './ScriptBuilderActions';

class NewNextQuestionForm extends Component {
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
    data = _.merge({}, data, {
      category: this.props.answerData.id
    })
    if (this.state.audio) {
      this.props.createNewQuestionAndUpdateAnswer({
        question: data, audio: this.state.audio, description: this.state.text, scriptId: this.props.currentScript.id, answerData: this.props.answerData
      });
    } else {
      this.props.createNewQuestionAndUpdateAnswer({
        question: data, description: this.state.text, scriptId: this.props.currentScript.id, answerData: this.props.answerData
      });
    }

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
      <div >
        <LoaderOrThis loading={loading}>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
          >
            <div className="mb1">
              <div className="flex  mt4 justify-between">
                <div className="w-10">Name</div>
                <div className="w-90">
                  <div className="single-line-textarea">
                    <InputTextArea name="body" placeholder="Write Question Here" />
                  </div>
                </div>
              </div>
              <div className="flex  mt4 justify-between">
                <div className="w-10">Description</div>
                <div className="w-90">
                  <div className="block-textarea-quill">
                    <InputNotesQuill handleChange={this.handleNotesChange} text={this.state.text} placeholder="Optional description." />
                  </div>
                </div>
              </div>
              {/*<div className="flex mt4 items-center justify-between">*/}
                {/*<div className="w-10">Category</div>*/}
                {/*<div className="w-90">*/}
                  {/*<InputDropDown*/}
                    {/*name="category"*/}
                    {/*type="dropdown"*/}
                    {/*placeholder="Choose category"*/}
                    {/*options={['Intro', 'Prequalifying', 'Provoking', 'Objection', 'Close']}*/}
                    {/*borderColor={Colors.moonGray}*/}
                {/*/>*/}
                {/*</div>*/}
              {/*</div>*/}
              <div className="flex items-center justify-between">
                <div className="w-10">Audio</div>

                { record ?
                  <div className="w-90 pt4">
                    <RecordAudio saveAudio={this.saveAudio} />
                    <div className="brand-green pointer pt2 underline" role="button" saveAudio={this.saveAudio} onClick={this.toggleRecord}>Switch to Upload Audio</div>
                  </div>
                  :
                  <div className="w-90 pt4">
                    <InputAudio name="audio" />
                    <div className="brand-green pointer pt2 underline" role="button" onClick={this.toggleRecord}>Switch to Record Audio</div>
                  </div>
                }


              </div>
            </div>
            <div className="pt3">
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
  // if (!values.category) {
  //   errors.category = '*required';
  // }

  if (!values.body) {
    errors.body = '*required';
  }

  return errors;
}

const Form = reduxForm({
  form: 'NewNextQuestion',
  validate
})(NewNextQuestionForm);

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
  createNewQuestionAndUpdateAnswer, fetchScript, uploadRecordedAudio
})(Form);
