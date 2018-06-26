import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NewAnswerForm } from './';
import { PlusIcon, Button } from '../../common';
import { Colors } from '../../../config/styles';
import AnswerBlock from './AnswerBlock';
import { removeAnswer } from './ScriptBuilderActions';

const AddAnswerButton = ({ toggleForm }) => (
  <div className="flex items-center pointer" onClick={toggleForm}>
    <PlusIcon color={Colors.brandNearBlack} width="2rem" height="2rem" />
    <div className="b brand-near-black">Add answer</div>
  </div>
);

class AnswerBuilderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuestionOpen: false
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
    const { currentQuestion, answers, questions, toggleStep } = this.props;
    return (
      <div>
        {this.state.newQuestionOpen
        ? <NewAnswerForm toggleForm={this.toggleForm} />
        : <AddAnswerButton toggleForm={this.toggleForm} />
        }
        {currentQuestion && currentQuestion.attributes.answers && currentQuestion.attributes.answers.map((answer, idx) => (
          <AnswerBlock answer={answer} idx={idx} key={idx} removeAnswer={this.removeAnswer} questions={questions} edit={false} />
        ))}
        <div className="flex justify-end mt6">
          <Button
            onClick={() => toggleStep('question')}
            borderColor={Colors.brandGreen}
            borderWidth="1px"
            fontColor={Colors.brandGreen}
            classOverrides="flex items-center mr2"
          >
            Back to Step 1: Questions
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { removeAnswer })(AnswerBuilderView);
