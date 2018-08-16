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
  LoaderOrThis,
  HSButton,
  InputNotesQuill
} from '../../common';
import { RecordAudio } from './';
import { createNewQuestion, fetchScript, updateQuestion, recordAudio } from './ScriptBuilderActions';


class QuestionBuilderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: null,
      record: true,
      audio: null
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleRecord = this.toggleRecord.bind(this);
    this.saveAudio = this.saveAudio.bind(this);
  }


  handleFormSubmit(data) {
    if (this.state.audio) {
      this.props.updateQuestion({
        data, description: this.props.text, audio: this.state.audio, scriptId: this.props.currentScript.id, questionId: this.props.currentQuestion.id
      });
      this.setState({ saved: moment().format('h:mm a, MMM D Y') });
    } else {
      this.props.updateQuestion({
        data, description: this.props.text, scriptId: this.props.currentScript.id, questionId: this.props.currentQuestion.id
      });
      this.setState({ saved: moment().format('h:mm a, MMM D Y') });
    }
  }


  toggleRecord() {
    this.setState({ record: !this.state.record });
  }

  saveAudio(r) {
    this.setState({ audio: r });
  }

  render() {
    const {
      handleSubmit, loading, toggleStep, currentQuestion, handleNotesChange, text
    } = this.props;
    const { saved, record } = this.state;
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
            <div className="flex items-center justify-between">
              <div className="w-20">Audio</div>

              { record ?
                <div className="w-80 pt4">
                  <RecordAudio saveAudio={this.saveAudio} />
                  <div className="brand-green pointer pt2 underline"
                    role="button"
                    saveAudio={this.saveAudio}
                    onClick={this.toggleRecord}>
                    Switch to Upload Audio
                  </div>
                </div>
                :
                <div className="w-80 pt4">
                  <InputAudio name="audio" />
                  <div className="brand-green pointer pt2 underline"
                    role="button"
                    onClick={this.toggleRecord}>
                    Switch to Record Audio
                  </div>
                </div>
              }


            </div>
            {currentQuestion.attributes.audioURI &&
              <div className="flex">
                <div className="w-20" />
                <div className="w-80">
                    Existing audio file attached. Record or upload to overwrite.
                </div>
              </div> }

            <div className="flex flex-row justify-end mt6 w-100">
              <HSButton backgroundColor={Colors.white}
                borderColor={Colors.brandGreen}
                borderWidth="1px"
                fontColor={Colors.brandGreen}
                onClick={(e) => { e.preventDefault(); toggleStep('answers'); }}>
                Add Answers
              </HSButton>
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
  createNewQuestion, fetchScript, updateQuestion, recordAudio
})(Form);
