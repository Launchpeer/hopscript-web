/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to create a question
 * question, description, category, audio, boolean for closing statement
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';
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
import { createNewQuestion, fetchScript, updateQuestion, recordAudio, stopRecord } from './ScriptBuilderActions';

const formatAudioName = audio => audio.split('https://hopscript.s3.amazonaws.com/');

class QuestionBuilderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: null
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleFormSubmit(data) {
    this.props.updateQuestion({
      data, description: this.props.text, scriptId: this.props.currentScript.id, questionId: this.props.currentQuestion.id
    });
    const time = () => {
      const now = moment().format('h:mm a, MMM D Y');
      return now;
    };
    this.setState({ saved: time() });
  }


  render() {
    const {
      handleSubmit, loading, toggleStep, currentQuestion, handleNotesChange, text
    } = this.props;
    const { saved } = this.state;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className="single-line-textarea">
              <InputTextArea name="body" placeholder="Write Question Here" />
            </div>
            <div className="flex mt4 justify-between">
              <div className="w-20">Description</div>
              <div className="w-80">
                <div className="block-textarea-quill">
                  <InputNotesQuill handleChange={handleNotesChange} text={text} placeholder="Optional description." />
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
            {currentQuestion.attributes.audioURI ?
              <div className="flex">
                <div className="w-20">Audio</div>
                <div className="w-80">
                  <div className="ph3">
                    {formatAudioName(currentQuestion.attributes.audioURI)}
                  </div>
                </div>
              </div> :
              <div className="flex">
                <div className="w-20">Audio</div>
                <div className="w-80">
                  <InputAudio name="audio" />
                  <InputRecordAudio name="audio" record={this.props.recordAudio()} />
                </div>
              </div>}
            <div className="flex flex-row justify-end mt6 w-100">
              <HSButton backgroundColor={Colors.white} borderColor={Colors.brandGreen} borderWidth="1px" fontColor={Colors.brandGreen} onClick={(e) => { e.preventDefault(); toggleStep('answers'); }}>Add Answers</HSButton>
              <HSButton backgroundColor={Colors.brandGreen}>Save Question</HSButton>

            </div>
            {saved && <div className="silver i fr">Last saved {saved}</div>}
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
    initialValues: currentQuestion.attributes,
    currentQuestion,
    currentScript,
    questions
  };
};

export default connect(mapStateToProps, {
  createNewQuestion, fetchScript, updateQuestion, recordAudio, stopRecord
})(Form);
