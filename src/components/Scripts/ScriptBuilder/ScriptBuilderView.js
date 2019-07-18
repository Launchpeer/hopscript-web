/**
 * The purpose of this file is to provide a smart component that:
 * fetches the current script, manages state for steps,
 */


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { ChevronLeftCircle, ChevronRight, CardRight } from '../../common'
import { Colors } from '../../../config/styles'
import {
  fetchScript,
  createNewScript,
  setCurrentQuestion,
  currentScriptUpdate,
  newQuestion,
  toggleCreationState,
  deleteQuestion,
} from './ScriptBuilderActions'
import { QuestionBuilderForm, ScriptNameForm, AnswerBuilderView, GlossaryView, NewQuestionForm } from './index'
import subscribeToClass from '../../helpers/subscribeToClass'
import { Modal } from 'antd'

const { confirm } = Modal;

const ScriptInfo = ({ name, step, scriptId }) => (
  <div>
    <ScriptNameForm name={name} scriptId={scriptId} />
    {step === 'question' && <div className="brand-near-black pl2">STEP 1: Add Questions to your Script</div>}
    {step === 'answers' && <div className="brand-near-black pl2">STEP 2: Add Answers to your Question</div>}
  </div>
)

const StepIndicator = ({ step }) => (
  <div
    className="flex items-center steps"
    style={{ backgroundColor: step === 'answers' ? Colors.brandPrimary : Colors.nearWhite }}
  >
    <div className="bg-brand-primary flex items-center h2 pl4 step-1 white pr3 f6">
      STEP 1
    </div>
    <div
      className="half-circle bg-brand-primary items-center flex justify-center white"
    >
      <ChevronRight width="1rem" height="1rem" color="white" />
    </div>
    <div
      className="h2 flex items-center tc pr4 pl4 step-2 f6"
      style={{
        backgroundColor: step === 'answers' ? Colors.brandPrimary : Colors.nearWhite,
        color: step === 'answers' ? Colors.white : Colors.brandNearBlack,
      }}
    >STEP 2
    </div>
  </div>
)

class ScriptBuilderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 'question',
      addQuestionStatus: false,
      text: '',
      existInformationBubble: false,
      newQuestionCategory: 'mainQuestion',
    }

    subscribeToClass({
      columnName: 'objectId',
      columnSelector: this.props.params.id,
      className: 'Script',
      callback: data => this.handleSubscriptionCallback(data),
    })
    this.toggleStep = this.toggleStep.bind(this)
    this.createNewScript = this.createNewScript.bind(this)
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this)
    this.newQuestion = this.newQuestion.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
  }


  componentDidMount() {
    this.props.toggleCreationState(true)
    this.props.fetchScript(this.props.params.id)
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.questions, this.props.questions)) {
      let existStatus = this.checkIfExistsInformationBubble(this.props.questions)
      this.setState({
        existInformationBubble: existStatus,
      })
    }
  }

  checkIfExistsInformationBubble = (questions) => {
    let existsInfoBubble = false
    _.forEach(questions, (question) => {
      if (question.attributes.category === 'informationQuestion') {
        existsInfoBubble = true
      }
    })

    return existsInfoBubble
  }

  newQuestion(script) {
    this.toggleStep('question')
    this.props.newQuestion(script)
    this.setState({
      addQuestionStatus: !this.state.addQuestionStatus,
      newQuestionCategory: 'mainQuestion',
    })
    this.props.setCurrentQuestion(null)
  }

  createInformationBubble() {
    this.setState({
      addQuestionStatus: !this.state.addQuestionStatus,
      newQuestionCategory: 'informationQuestion',
    })
  }

  handleSubscriptionCallback(script) {
    this.props.currentScriptUpdate(script)
  }

  toggleStep(step) {
    this.setState({
      currentStep: step,
      addQuestionStatus: !this.state.addQuestionStatus,
    })
  }

  toggleAddNewQuestion() {
    this.setState({
      currentStep: step,
      addQuestionStatus: !this.state.addQuestionStatus,
      newQuestionCategory: 'mainQuestion',
    })
  }

  createNewScript() {
    this.props.createNewScript()
  }

  setCurrentQuestion(question) {
    this.props.setCurrentQuestion(question)
    this.toggleStep('question')
    this.props.toggleCreationState(false)
    this.setState({ text: question.attributes.description || '' })
  }

  handleNotesChange(value) {
    this.setState({ text: value })
  }

  showDeleteQuestionConfirm(question, currentScript) {
    confirm({
      title: 'Do you want to delete these Question?',
      content: question.attributes.body,
      onOk: () => this.props.deleteQuestion(question.id, currentScript.id),
      onCancel() {},
    });
  }

  handleDeleteInformationQuestion = (e, question) => {
    const { currentScript } = this.props
    e.stopPropagation()
    this.showDeleteQuestionConfirm(question, currentScript)
  }

  render() {
    const { currentStep, addQuestionStatus, existInformationBubble } = this.state
    const {
      currentScript, currentQuestion, questions, creatingNewQuestion, disableGlossary,
    } = this.props
    return (
      <CardRight>
        {currentScript &&
        <div>
          <div className="flex flex-wrap justify-between items-center pa3 b--near-white bb bw1">
            <div className="flex flex-wrap items-center">
              <div role="button" className="pointer" onClick={() => browserHistory.push('/scripts')}>
                <ChevronLeftCircle width="2rem" height="2rem" fill="black" />
              </div>
              <div className="flex  flex-wrap items-center pl3">
                <ScriptInfo step={currentStep} name={currentScript.attributes.name} scriptId={currentScript.id} />
              </div>
            </div>
            {/*<StepIndicator step={currentStep} toggle={this.toggleStep} />*/}
          </div>
          <div className="w-100 flex flex-wrap">
            <div className="w-100 pa3">
              <GlossaryView
                questions={questions}
                step={currentStep}
                currentQuestion={currentQuestion}
                disableGlossary={disableGlossary}
                existInformationBubble={existInformationBubble}
                toggle={this.toggleStep}
                toggleAddNewQuestion={this.toggleAddNewQuestion}
                setCurrentQuestion={this.setCurrentQuestion}
                onClick={() => this.newQuestion(currentScript)}
                createInformationBubble={() => this.createInformationBubble(currentScript)}
                handleDeleteInformationQuestion={this.handleDeleteInformationQuestion}
                addQuestionStatus={addQuestionStatus}
                addQuestionTitle={(this.state.newQuestionCategory === 'mainQuestion') ? 'Add new main question' : 'Add information bubble'}
                NewQuestionFormChildren={
                  <NewQuestionForm
                    scriptId={this.props.params.id}
                    toggleStep={this.toggleStep}
                    questionCategory={this.state.newQuestionCategory}
                  />
                }
              />
            </div>
            {/*<div className="w-60 pa3">*/}
            {/*{creatingNewQuestion*/}
            {/*?*/}
            {/*<div className="pt4">*/}
            {/*<NewQuestionForm scriptId={this.props.params.id} toggleStep={this.toggleStep} />*/}
            {/*</div>*/}
            {/*:*/}
            {/*<div className="pt4">*/}
            {/*{(currentStep === 'question')*/}
            {/*? <QuestionBuilderForm*/}
            {/*scriptId={this.props.params.id}*/}
            {/*toggleStep={this.toggleStep}*/}
            {/*currentQuestion={currentQuestion}*/}
            {/*handleNotesChange={this.handleNotesChange}*/}
            {/*text={this.state.text}*/}
            {/*/>*/}
            {/*: <AnswerBuilderView*/}
            {/*toggleStep={this.toggleStep}*/}
            {/*questions={questions}*/}
            {/*currentQuestion={currentQuestion}*/}
            {/*currentScript={currentScript}*/}
            {/*/>*/}
            {/*}*/}
            {/*</div>*/}
            {/*}*/}
            {/*</div>*/}
          </div>
        </div>
        }
      </CardRight>
    )
  }
}

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    currentScript, currentQuestion, questions, creatingNewQuestion, disableGlossary,
  } = ScriptBuilderReducer
  return {
    currentScript,
    currentQuestion,
    questions,
    creatingNewQuestion,
    disableGlossary,
  }
}

export default connect(mapStateToProps, {
  fetchScript,
  createNewScript,
  setCurrentQuestion,
  currentScriptUpdate,
  newQuestion,
  toggleCreationState,
  deleteQuestion,
})(ScriptBuilderView)
