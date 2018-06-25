import React, { Component } from 'react';
import { NewAnswerForm } from './';
import { PlusIcon } from '../../common';

const AddQuestionButton = ({ toggleForm }) => (
  <div className="flex items-center pointer" onClick={toggleForm}>
    <PlusIcon color="green" width="2rem" height="2rem" />
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
    console.log('answer builder view');
  }

  toggleForm() {
    this.setState({ newQuestionOpen: !this.state.newQuestionOpen });
  }

  render() {
    return (
      <div>
        {this.state.newQuestionOpen
        ? <NewAnswerForm toggleForm={this.toggleForm} />
        : <AddQuestionButton toggleForm={this.toggleForm} />
        }
      </div>
    );
  }
}

export default AnswerBuilderView;
