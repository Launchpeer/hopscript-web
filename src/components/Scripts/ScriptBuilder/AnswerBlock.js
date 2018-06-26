import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Edit } from 'react-feather';
import { Colors, BorderRadius } from '../../../config/styles';
import {
  InputTextArea,
  InputDropDown,
  LoaderOrThis,
  Button,
  TrashIcon,
  PlusIcon
} from '../../common';
import { addAnswersToQuestion } from './ScriptBuilderActions';
import UpdateAnswerForm from './UpdateAnswerForm';

const AnswerEdit = ({
  answer, removeAnswer, questions, onClick
}) => (
  <div>
    <div className="flex mt4 mb2">
      <div className="w-10">
        <div className="h2 w2 bg-brand-green white br-100 flex justify-center items-center"></div>
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
          onClick={() => removeAnswer(answer.attributes.id)}
          >
          <TrashIcon color={Colors.silver} width="1rem" height="1rem" />
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
      <div className="w-20 flex items-end flex-column">
        <div
          className="bg-light-gray flex items-center justify-center pa2 w3 h3 ml2 pointer bn"
          style={{ borderRadius: BorderRadius.all }}
          onClick={onClick}
          >
          <TrashIcon color={Colors.brandGreen} width="1rem" height="1rem" />
        </div>
      </div>
    </div>
  </div>);

const AnswerDisplay = ({ answer, onClick, removeAnswer }) => {
  return (<div>
    <div className="flex mt4 mb2">
      <div className="w-10">
        <div className="h2 w2 bg-brand-green white br-100 flex justify-center items-center"></div>
      </div>
      <div className="w-10">Answer</div>
      <div className="w-60">
        <div className="block-textarea">
          {answer.attributes && answer.attributes.body}
        </div>
      </div>
      <div className="w-20 flex items-end flex-column">
        <div
          className="bg-light-gray flex items-center justify-center pa2 w3 h3 ml2 pointer"
          style={{ borderRadius: BorderRadius.all }}
          onClick={() => removeAnswer(answer.id)}
          >
          <TrashIcon color={Colors.silver} width="1rem" height="1rem" />
        </div>
      </div>
    </div>
    <div className="flex items-center">
      <div className="w-10">
        <div className="h2 w2 bg-brand-white br-100 flex" />
      </div>
      <div className="w-10">Route to</div>
      <div className="w-60">
        NA
      </div>
      <div className="w-20 flex items-end flex-column">
        <div
          className="bg-light-gray flex items-center justify-center pa2 w3 h3 ml2 pointer bn"
          style={{ borderRadius: BorderRadius.all }}
          onClick={onClick}
          >
          <Edit color={Colors.brandGreen} size={16}/>
        </div>
      </div>
    </div>
                                                  </div>);
}

class AnswerBlockEditable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
    console.log('block life', this.props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('clicked');
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const {
      answer,
      idx,
      removeAnswer,
      questions
    } = this.props;
    return (
      <div>
        {!this.state.edit
          ?
          <AnswerDisplay
            answer={answer}
            onClick={() => {
              this.setState({ edit: !this.state.edit });
            }}
            removeAnswer={removeAnswer}
          />
          :
          <UpdateAnswerForm
            answer={answer}
            questions={questions}
            onClick={() => {
              this.setState({ edit: !this.state.edit });
            }}
            toggleForm={() => {
              this.setState({ edit: !this.state.edit });
            }}
          />
        }
      </div>
    );
  }
}

export default AnswerBlockEditable;
