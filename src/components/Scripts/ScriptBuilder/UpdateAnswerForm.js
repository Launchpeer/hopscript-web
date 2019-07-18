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
  HSButton
} from '../../common';
import { Modal } from 'antd'
import { updateAnswer, setCurrentAnswer } from './ScriptBuilderActions';

class UpdateAnswerForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    this.props.toggleForm();

    if(this.props.answer.attributes.hasOwnProperty('route')) {
      data = _.merge({}, data, {
        route: this.props.answer.attributes.route.id
      })
    }
    this.props.updateAnswer(data, this.props.answer.id, this.props.currentScript.id);
    this.handleCancel()
  }

  handleCancel =() => {
    this.setState({
      visibleModal: false,
    }, () => this.props.closeModal())
  }

  render() {
    const {
      questions, handleSubmit, toggleForm, answer, visibilityEditAnswerModal
    } = this.props;
    return (
      <div>
        <Modal
          visible={visibilityEditAnswerModal}
          title="Title"
          onCancel={this.handleCancel}
          footer={null}
        >
        <form
          onSubmit={handleSubmit(this.handleFormSubmit)}
          >
          <div className="flex mt2">
            {/*<div className="w-10">*/}
              {/*<div className="h2 w2 bg-brand-green white br-100 flex justify-center items-center" />*/}
            {/*</div>*/}
            <div className="w-20 b mr2">Answer</div>
            <div className="w-80">
              <div className="block-textarea">
                <InputTextArea name="body" body="answer" placeholder="Type Answer here" />
              </div>
            </div>
            {/*<div className="w-20 flex items-end flex-column">*/}
              {/*<div*/}
                {/*className="bg-light-gray flex items-center justify-center w3 h3 ml2 pointer bn"*/}
                {/*role="button"*/}
                {/*style={{ borderRadius: BorderRadius.all }}*/}
                {/*onClick={toggleForm}*/}
                {/*>*/}
                  {/*X*/}
              {/*</div>*/}
            {/*</div>*/}
          </div>
          <div className="flex items-center">
            <div className="w-10">
              <div className="h2 w2 bg-white white br-100 flex justify-center items-center" />
            </div>
            {/*<div className="w-10 b mr2">Route to</div>*/}
            {/*<div className="w-60">*/}
              {/*{questions*/}
                {/*? <InputDropDown*/}
                  {/*name="route"*/}
                  {/*type="dropdown"*/}
                  {/*placeholder={answer.attributes.route ? answer.attributes.route.attributes.body : 'Route to'}*/}
                  {/*options={questions.map(question => ({ value: question.id, id: question.id, display: question.attributes.body }))}*/}
                  {/*borderColor={Colors.moonGray}*/}
                 {/*/>*/}
               {/*: <div>N/A</div>*/}
              {/*}*/}
            {/*</div>*/}
            {/*<div className="w-20 flex items-end flex-column">*/}
              {/*<button*/}
                {/*className="bg-light-gray flex items-center justify-center w3 h3 ml2 pointer bn"*/}
                {/*style={{ borderRadius: BorderRadius.all }}*/}
                {/*type="submit"*/}
                {/*>*/}
                {/*<div className="bg-brand-green br-100 flex items-center justify-center white" style={{ height: '1.25rem', width: '1.25rem' }}>*/}
                    {/*+*/}
                {/*</div>*/}
              {/*</button>*/}
            {/*</div>*/}
            <div className="flex flex-row justify-end mt3 w-100">
              {/*<HSButton backgroundColor={Colors.white}*/}
              {/*borderColor={Colors.brandGreen}*/}
              {/*borderWidth="1px"*/}
              {/*fontColor={Colors.brandGreen}*/}
              {/*onClick={(e) => { e.preventDefault(); toggleStep('answers'); }}>*/}
              {/*Add Answers*/}
              {/*</HSButton>*/}
              <HSButton backgroundColor={Colors.brandGreen}>Update Answer</HSButton>

            </div>
          </div>
        </form>
        </Modal>
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
