import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridIcon, ModalCard, Button } from '../../common';
import { Colors } from '../../../config/styles';
import { deleteQuestion } from './ScriptBuilderActions';


// These functions are helpers for Glossary GlossaryItem
const questionTrimmer = question => (
  question.length > 25 ? `${question.slice(0, 25)}...` : question
);

const selectedButton = (
  <div className="w2 h2 br-100 bg-brand-green ml2 flex items-center justify-center" />
);

const unSelectedButton = (
  <div
    className="w2 h2 br-100 ml2 bg-moon-gray flex items-center justify-center" />
);

const deleteButton = onClick => (
  <div
    className="w2 h2 bg-moon-gray white br-100 flex items-center justify-center hov-danger"
    role="button"
    onClick={onClick}>
X
  </div>
);

const renderAnswers = question => (
  <div className="b mr2">
    {question.attributes.answers ? question.attributes.answers.length : 0}
  </div>
);

class GlossaryListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      modalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  mouseOut() {
    this.setState({ hover: false });
  }

  mouseOver() {
    this.setState({ hover: true });
  }

  handleDelete(question, script) {
    this.props.deleteQuestion(question, script);
  }

  render() {
    const { hover, modalOpen } = this.state;
    const {
      question, setCurrentQuestion, currentQuestion, currentScript
    } = this.props;
    return (
      <div role="button"
        className="flex justify-between items-center pointer mb2 pv2 list-hover"
        onMouseOut={() => this.mouseOut()}
        onBlur={() => this.mouseOut()}
        onMouseOver={() => this.mouseOver()}
        onFocus={() => this.mouseOver()}
        onClick={() => setCurrentQuestion(question)}>

        {modalOpen &&
          <ModalCard onClick={this.toggleModal}>
            <div className="pa4 tc">
            Are you sure you want to delete this question?
              <div className="w-100 flex justify-between pl4 pr4 mt4">
                <Button onClick={() => this.handleDelete(question.id, currentScript.id)} backgroundColor={Colors.darkRed}>yes</Button>
                <Button onClick={this.toggleModal} backgroundColor={Colors.silver}>cancel</Button>
              </div>
            </div>
          </ModalCard>
        }

        <div className="flex flex-row items-center">
          <GridIcon width="1rem" height="1rem" color={Colors.moonGray} />
          {currentQuestion === question ? selectedButton : unSelectedButton }
          <div className="ml2"> {questionTrimmer(question.attributes.body)}</div>
        </div>
        <div className="mr2">
          {hover ? deleteButton(this.toggleModal) : renderAnswers(question)}
        </div>
      </div>

    );
  }
}

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    currentScript, currentQuestion
  } = ScriptBuilderReducer;
  return {
    currentScript,
    currentQuestion
  };
};

export default connect(mapStateToProps, {
  deleteQuestion
})(GlossaryListItem);
