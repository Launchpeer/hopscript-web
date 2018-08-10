/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to create an answer
 * answer, description, category, audio, boolean for closing statement
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors, BorderRadius } from '../../../config/styles';
import {
  InputTextArea,
  InputDropDown
} from '../../common';
import { updateAnswer, setCurrentAnswer } from './ScriptBuilderActions';

class UpdateAnswerForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    console.log('data!!', data);
    this.props.toggleForm();
    this.props.setCurrentAnswer(null);
    this.props.updateAnswer(data, this.props.answer.id, this.props.currentScript.id);
  }

  render() {
    const {
      questions, handleSubmit, toggleForm, answer
    } = this.props;
    return (
      <div>
        <form
          onSubmit={handleSubmit(this.handleFormSubmit)}
          >
          <div className="flex mt4">
            <div className="w-10">
              <div className="h2 w2 bg-brand-green white br-100 flex justify-center items-center" />
            </div>
            <div className="w-10 b mr2">Answer</div>
            <div className="w-60">
              <div className="block-textarea">
                <InputTextArea name="body" body="answer" placeholder="Type Answer here" />
              </div>
            </div>
            <div className="w-20 flex items-end flex-column">
              <div
                className="bg-light-gray flex items-center justify-center w3 h3 ml2 pointer bn"
                role="button"
                style={{ borderRadius: BorderRadius.all }}
                onClick={toggleForm}
                >
                  X
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10">
              <div className="h2 w2 bg-white white br-100 flex justify-center items-center" />
            </div>
            <div className="w-10 b mr2">Route to</div>
            <div className="w-60">
              {questions
                ? <InputDropDown
                  name="route"
                  type="dropdown"
                  placeholder={answer.attributes.route.attributes.body}
                  options={questions.map(question => ({ value: question.id, id: question.id, display: question.attributes.body }))}
                  borderColor={Colors.moonGray}
                 />
               : <div>N/A</div>
              }
            </div>
            <div className="w-20 flex items-end flex-column">
              <button
                className="bg-light-gray flex items-center justify-center w3 h3 ml2 pointer bn"
                style={{ borderRadius: BorderRadius.all }}
                type="submit"
                >
                <div className="bg-brand-green br-100 flex items-center justify-center white" style={{ height: '1.25rem', width: '1.25rem' }}>
                    +
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const AnswerForm = reduxForm({
  form: 'updateAnswer',
  enableReinitialize: true
})(UpdateAnswerForm);

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    error, loading, currentQuestion, currentScript, currentAnswer
  } = ScriptBuilderReducer;
  return {
    loading,
    error,
    currentQuestion,
    currentScript,
    initialValues: { body: currentAnswer.attributes.body }
  };
};

export default connect(mapStateToProps, { updateAnswer, setCurrentAnswer })(AnswerForm);
