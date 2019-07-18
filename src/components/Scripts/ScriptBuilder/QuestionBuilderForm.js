/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to create a question
 * question, description, category, audio, boolean for closing statement
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import { Modal } from 'antd'
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
import { createNewQuestion, fetchScript, updateQuestion, recordAudio, } from './ScriptBuilderActions';


class QuestionBuilderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: null,
      record: true,
      audio: null,
      text: props.currentQuestion.attributes.hasOwnProperty('description') ? props.currentQuestion.attributes.description: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleRecord = this.toggleRecord.bind(this);
    this.saveAudio = this.saveAudio.bind(this);
  }

  handleFormSubmit(data) {
    if (this.state.audio) {
      this.props.updateQuestion({
        data, description: this.state.text, audio: this.state.audio, scriptId: this.props.currentScript.id, questionId: this.props.currentQuestion.id
      });
      this.setState({ saved: moment().format('h:mm a, MMM D Y') });
    } else {
      this.props.updateQuestion({
        data, description: this.state.text, scriptId: this.props.currentScript.id, questionId: this.props.currentQuestion.id
      });
      this.setState({ saved: moment().format('h:mm a, MMM D Y') });
    }

    this.handleCancel()
  }


  toggleRecord() {
    this.setState({ record: !this.state.record, audio: null });
  }

  saveAudio(r) {
    this.setState({ audio: r });
  }

  handleCancel =() => {
    this.setState({
      visibleModal: false,
    }, () => this.props.closeModal())
  }

  handleNotesChange = (value) => {
    this.setState({ text: value });
  }

  render() {
    const {
      handleSubmit, loading, toggleStep, currentQuestion, handleNotesChange, text, visibilityModal
    } = this.props;
    const { saved, record, visibleModal } = this.state;
    return (
      <div>
        <Modal
          visible={visibilityModal}
          title="Title"
          onCancel={this.handleCancel}
          footer={null}
        >
        <LoaderOrThis loading={loading}>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className="single-line-textarea">
              <InputTextArea name="body" placeholder="Write Question Here" />
            </div>
            <div className="flex mt4 justify-between">
              <div className="w-20">Description</div>
              <div className="w-80">
                <div className="block-textarea-quill">
                  {/*<InputNotesQuill handleChange={handleNotesChange} text={text} placeholder="Optional description." />*/}
                  <InputNotesQuill handleChange={this.handleNotesChange} text={this.state.text} placeholder="Optional description." />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-20">Audio</div>

              { record ?
                <div className="w-80 pt4">
                  <RecordAudio saveAudio={this.saveAudio} disableGlossary={this.toggleDisableGlossary} />
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

            <div className="flex flex-row justify-end mt3 w-100">
              <HSButton backgroundColor={Colors.brandGreen}>Update Question</HSButton>

            </div>
            {saved && <div className="silver i fr">Last saved {saved}</div>}
          </form>
        </LoaderOrThis>
        </Modal>
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
    questions,
  };
};

export default connect(mapStateToProps, {
  createNewQuestion, fetchScript, updateQuestion, recordAudio,
})(Form);
