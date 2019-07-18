import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NewAnswerForm } from './';
import { PlusIcon, Button } from '../../common';
import { Colors } from '../../../config/styles';
import AnswerBlock from './AnswerBlock';
import { removeAnswer } from './ScriptBuilderActions';

const AddAnswerButton = ({ toggleForm }) => (
  <div className="flex items-center pointer" onClick={toggleForm}>
    <div className="w-10">
      <div className="bg-brand-near-black br-100 flex items-center justify-center white w2 h2">
          +
      </div>
    </div>
    <div className="b brand-near-black">Add answer</div>
  </div>
);

class AnswerBuilderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuestionOpen: props.addQuestionStatus
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
  }

  toggleForm() {
    this.setState({ newQuestionOpen: !this.state.newQuestionOpen });
  }

  removeAnswer(answerId) {
    this.props.removeAnswer(answerId, this.props.currentScript.id, this.props.currentQuestion.id);
  }

  render() {
    const {
      currentQuestion, answers, questions, toggleStep
    } = this.props;
    return (
      <div>
        {this.state.newQuestionOpen
        ? <NewAnswerForm toggleForm={this.toggleForm} questions={questions} />
        : <AddAnswerButton toggleForm={this.toggleForm} />
        }
        {currentQuestion && currentQuestion.attributes.answers && currentQuestion.attributes.answers.map((answer, idx) => (
          <AnswerBlock answer={answer} idx={idx} key={idx} removeAnswer={this.removeAnswer} questions={questions} edit={false} />
        ))}
      </div>
    );
  }
}

export default connect(null, { removeAnswer })(AnswerBuilderView);
