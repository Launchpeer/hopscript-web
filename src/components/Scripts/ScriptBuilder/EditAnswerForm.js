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
  Button,
  PlusIcon,
} from '../../common';
import { addAnswersToQuestion } from './ScriptBuilderActions';
import AnswerBlock from './AnswerBlock';

const NewAnswer = ({
  questions,
  onClick,
  onDismiss
}) => (<div>
  <div className="flex mt4">
    <div className="w-10">
      <div className="h2 w2 bg-brand-green white br-100 flex justify-center items-center" />
    </div>
    <div className="w-10">Answer</div>
    <div className="w-60">
      <div className="block-textarea">
        <InputTextArea name="answer" body="answer" placeholder="Type Answer here" />
      </div>
    </div>
    <div className="w-30">
      <div
        className="bg-light-gray flex items-center justify-center pa2 w3 h3 ml2 pointer"
        style={{ borderRadius: BorderRadius.all }}
        onClick={onDismiss}
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
    <div className="w-60">
      <InputDropDown
        name="route"
        type="dropdown"
        placeholder="Route to"
        options={questions}
        borderColor={Colors.moonGray}
       />
    </div>
    <div className="w-30">
      <div
        className="bg-light-gray flex items-center justify-center pa2 w3 h3 ml2 pointer"
        style={{ borderRadius: BorderRadius.all }}
        onClick={onClick}
        >
        <PlusIcon color={Colors.brandGreen} width="1rem" height="1rem" />
      </div>
    </div>
  </div>
       </div>);

class AnswerBuilderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAnswer: false
    };
    // options need to be { display: name, id: id, value: id };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
  }

  handleFormSubmit(data) {
    this.props.addAnswersToQuestion(data, this.props.currentQuestion.id, this.props.currentScript.id);
  }

  addAnswer() {
    console.log('dingus');
  }


  removeAnswer(idx) {
    this.setState({ answers: this.state.answers.filter((item, index) => index !== idx) });
  }

  render() {
    const {
      handleSubmit, valid, loading, error, onSubmit, toggleStep, currentQuestion
    } = this.props;
    const formattedQuestions = this.props.questions.map(question => ({
      display: question.attributes.body || 'create question',
      id: question.id,
      value: question.id
    }));
    const questions = formattedQuestions;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
          >
            {currentQuestion && currentQuestion.attributes.answers && currentQuestion.attributes.answers.map((answer, idx) => (
              <AnswerBlock answer={answer} idx={idx} key={idx} removeAnswer={this.removeAnswer} questions={questions} edit={false} />
            ))}
            {this.state.newAnswer
            ? <NewAnswer
              questions={questions}
              onClick={this.addAnswer}
              onDismiss={() => { this.setState({ newAnswer: !this.state.newAnswer }); }}
              />
            : <div className="flex items-center pointer" onClick={() => { this.setState({ newAnswer: !this.state.newAnswer }); }}>
              <PlusIcon color={Colors.brandNearBlack} width="2rem" height="2rem" />
              <div className="b brand-near-black">Add answer</div>
              </div>
            }
            <div className="flex justify-end mt6">
              <Button
                onClick={(e) => { e.preventDefault(); toggleStep('question'); }}
                borderColor={Colors.brandGreen}
                borderWidth="1px"
                fontColor={Colors.brandGreen}
                classOverrides="flex items-center mr2"
              >
                Back to Step 1: Questions
              </Button>
            </div>
          </form>
        </LoaderOrThis>
      </div>
    );
  }
}

const Form = reduxForm({
  form: 'answerBuilder',
  enableReinitialize: true
})(AnswerBuilderForm);

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    error, loading, currentQuestion, currentScript
  } = ScriptBuilderReducer;
  console.log('currentQuestion', currentQuestion);
  return {
    loading,
    error,
    initialValues: currentQuestion,
    currentQuestion,
    currentScript
  };
};

export default connect(mapStateToProps, { addAnswersToQuestion })(Form);
