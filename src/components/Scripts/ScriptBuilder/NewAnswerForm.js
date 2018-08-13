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
  InputDropDown,
  LoaderOrThis,
  PlusIcon
} from '../../common';
import { addAnswersToQuestion } from './ScriptBuilderActions';

class NewAnswerForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    this.props.toggleForm();
    this.props.addAnswersToQuestion(data, this.props.currentQuestion.id, this.props.currentScript.id);
  }

  render() {
    const {
      questions, loading, handleSubmit, toggleForm
    } = this.props;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
          >
            <div className="flex mt4 mb2">
              <div className="w-10">
                <div className="h2 w2 bg-brand-green white br-100 flex justify-center items-center" />
              </div>
              <div className="w-10">Answer</div>
              <div className="w-70">
                <div className="w-95 fr">
                  <div className="block-textarea">
                    <InputTextArea name="answer" body="answer" placeholder="Type Answer here" />
                  </div>
                </div>
              </div>
              <div className="w-10 flex items-end flex-column">
                <div
                  role="button"
                  className="bg-light-gray flex items-center justify-center pa2 w3 h3 ml2 pointer"
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
              <div className="w-10">Route to</div>
              <div className="w-70">
                <div className="w-95 fr">
                  {questions
                  ? <InputDropDown
                    name="route"
                    type="dropdown"
                    placeholder="Route to"
                    options={questions.map(question => ({ value: question.id, id: question.id, display: question.attributes.body }))}
                    borderColor={Colors.moonGray}
                   />
                 : <div>N/A</div>
                }
                </div>
              </div>
              <div className="w-10 flex items-end flex-column">
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
        </LoaderOrThis>
      </div>
    );
  }
}

const Form = reduxForm({
  form: 'answerBuilder'
})(NewAnswerForm);

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    error, loading, currentQuestion, currentScript
  } = ScriptBuilderReducer;
  return {
    loading,
    error,
    initialValues: currentQuestion,
    currentQuestion,
    currentScript
  };
};

export default connect(mapStateToProps, { addAnswersToQuestion })(Form);
