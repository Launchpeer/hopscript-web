import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GridIcon, ModalCard, Button } from '../../common'
import * as AntComponents from 'antd'
import { Colors } from '../../../config/styles'
import { deleteQuestion, removeAnswer, setCurrentAnswer, deleteQuestionAndUpdateAnswer } from './ScriptBuilderActions'
import { Collapse } from 'antd'
import NewAnswerForm from './NewAnswerForm'
import NewNextQuestionForm from './NewNextQuestionForm'
import QuestionBuilderForm from './QuestionBuilderForm'
import UpdateAnswerForm from './UpdateAnswerForm'

const { confirm } = AntComponents.Modal
const { Panel } = Collapse

// These functions are helpers for Glossary GlossaryItem
const questionTrimmer = question => (
  question.length > 50 ? `${question.slice(0, 40)}...` : question
)

const selectedButton = (
  <div className="w2 h2 br-100 bg-brand-green ml2 flex items-center justify-center" />
)

const unSelectedButton = (
  <div
    className="w2 h2 br-100 ml2 bg-moon-gray flex items-center justify-center" />
)

const deleteButton = onClick => (
  <div
    className="w2 h2 bg-moon-gray white br-100 flex items-center justify-center hov-danger"
    role="button"
    onClick={onClick}>
    X
  </div>
)

const renderAnswers = question => (
  <div className="b mr2">
    {question.attributes.answers ? question.attributes.answers.length : 0}
  </div>
)

class GlossaryListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      modalOpen: false,
      showQuestionAddForm: false,
      newQuestionOpen: false,
      visibleAddQuestionFormKey: null,
      visibleAddAnswerFormKey: null,
      newNextQuestionOpen: false,
      editQuestionForm: false,
      editAnswerForm: false,
      editQuestionId: null,
      editAnswerId: null,
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleDeleteQuestionAction = this.handleDeleteQuestionAction.bind(this)
    this.handleDeleteAnswerAction = this.handleDeleteAnswerAction.bind(this)
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  mouseOut() {
    this.setState({ hover: false })
  }

  mouseOver() {
    this.setState({ hover: true })
  }

  handleDeleteQuestionAction(questionId, scriptId, answerData) {
    if(answerData){
      this.props.deleteQuestionAndUpdateAnswer(questionId, scriptId, answerData)
    } else {
      this.props.deleteQuestion(questionId, scriptId)
    }
  }

  handleDeleteAnswerAction(answerData, question) {
    const { currentScript } = this.props
    this.props.removeAnswer(answerData.id, currentScript.id, question.id)
  }

  callback(key) {
  }

  getQuestionForAnswer = (question, questions, resultObject) => {
    if (question.attributes.hasOwnProperty('answers')) {
      _.forEach(question.attributes.answers, (questionAnswer) => {
        resultObject.answers.push({
          answerData: questionAnswer,
        })
        if (questionAnswer.attributes.hasOwnProperty('route')) {
          let existsQuestion = _.findIndex(questions, { id: questionAnswer.attributes.route.id })
          if (existsQuestion === -1) {
            resultObject.children = []
          } else {
            resultObject.children = {
              questionData: questions[existsQuestion],
              answers: [],
              children: [],
            }
            this.getQuestionForAnswer(questions[existsQuestion], questions, resultObject.children)
          }
        }
      })
    }

    return resultObject
  }

  handleCloseModal = () => {
    this.setState({
      editQuestionForm: false,
      editQuestionId: null,
    })
  }

  handleAnswerEditCloseModal = () => {
    this.setState({
      editAnswerForm: false,
      editAnswerId: null,
    })
  }

  renderEditQuestionModalForm = (currentScript, currentQuestion, uniqueKey) => {
    const { editQuestionForm } = this.state
    return (
      <div key={uniqueKey}>
        <QuestionBuilderForm
          visibilityModal={editQuestionForm}
          scriptId={currentScript.id}
          // toggleStep={this.toggleStep}
          currentQuestion={currentQuestion}
          closeModal={this.handleCloseModal}
          // text={this.state.text}
        />
      </div>
    )
  }

  renderEditAnswerModalForm = (answer, questions, uniqueKey) => {
    const { editAnswerForm } = this.state
    return (
      <div key={uniqueKey}>
        <UpdateAnswerForm
          visibilityEditAnswerModal={editAnswerForm}
          answer={answer}
          questions={questions}
          onClick={() => {
            this.setState({ edit: !this.state.edit })
          }}
          toggleForm={() => {
            this.setState({ edit: !this.state.edit })
          }}
          closeModal={this.handleAnswerEditCloseModal}
        />
      </div>
    )
  }

  checkAnswerHaveQuestion = (answerData, questions) => {
    if(answerData.attributes.hasOwnProperty('route')) {
      let exitsElement = _.some(questions, { id: answerData.attributes.route.id})
      return !exitsElement
    } else {
      return true
    }
  }

  renderOneLevelComponent = (treeData, prevAnswerData = null) => {
    const {
      questions, currentScript,
    } = this.props
    const { visibleAddAnswerFormKey, visibleAddQuestionFormKey, editQuestionForm, editQuestionId, editAnswerForm, editAnswerId } = this.state

    return treeData.map((dataItem, dataItemIndex) => {
      return (
        <div key={`${dataItem.questionData.id}_${dataItemIndex}_div_key`}>
          {(editQuestionForm && editQuestionId === dataItem.questionData.id) && this.renderEditQuestionModalForm(currentScript, dataItem.questionData, `${dataItem.questionData.id}_${dataItemIndex}_modal_key`)}
          <Collapse onChange={this.callback} key={`${dataItem.questionData.id}_${dataItemIndex}_collapse_key`}
                    style={{ marginBottom: '5px' }}>
            <Panel style={{ backgroundColor: '#ADD8E6' }}
                   header={this.renderQuestionHeader(dataItem.questionData, currentScript, prevAnswerData)}
                   key={`${dataItem.questionData.id}_${dataItemIndex}_panel_key`}>
              <div className="pb1" style={{ height: '36px' }}>
                <AntComponents.Button
                  icon="plus"
                  onClick={() => this.showAddQuestionForm(dataItem.questionData.id)}
                >
                  Add answer
                </AntComponents.Button>
              </div>
              {(visibleAddAnswerFormKey && visibleAddAnswerFormKey === dataItem.questionData.id) &&
              <NewAnswerForm toggleForm={this.toggleForm} parentQuestion={dataItem.questionData}
                             questions={questions} />}
              {!_.isEmpty(dataItem.answers) && dataItem.answers.map((answerItem, answerItemIndex) => {
                return (
                  <div>
                    {(editAnswerForm && editAnswerId === answerItem.answerData.id) && this.renderEditAnswerModalForm(answerItem.answerData, questions, `${answerItem.answerData.id}_${answerItemIndex}_modal_key`)}
                    <Collapse key={`${answerItem.answerData.id}_${answerItemIndex}_collapse_key`}>
                      <Panel style={{ backgroundColor: '#90EE90' }}
                             header={this.renderAnswerHeader(answerItem.answerData, dataItem.questionData, questions)}
                             key={`${answerItem.answerData.id}_${dataItemIndex}_panel_key`}>
                        {this.checkAnswerHaveQuestion(answerItem.answerData, questions) && <div className="pb1" style={{ height: '36px' }}>
                          <AntComponents.Button
                            icon="plus"
                            onClick={() => this.showAddNextQuestionForm(answerItem.answerData.id)}
                          >
                            Add question
                          </AntComponents.Button>
                        </div>}
                        {(visibleAddQuestionFormKey && visibleAddQuestionFormKey === answerItem.answerData.id) &&
                        <NewNextQuestionForm answerData={answerItem.answerData} toggleStep={() => this.toggleStep()} />}
                        {(answerItem.answerData.attributes.hasOwnProperty('route') && !_.isEmpty(dataItem.children)) && this.renderOneLevelComponent([dataItem.children], answerItem.answerData)}
                      </Panel>
                    </Collapse>
                  </div>
                )
              })}
            </Panel>
          </Collapse>
        </div>
      )
    })
  }

  renderRouteToComponent = () => {
    const { question, questions } = this.props
    let resultObject = {
      questionData: question,
      answers: [],
      children: [],
    }

    let questionForAnswer = this.getQuestionForAnswer(question, questions, resultObject)
    return this.renderOneLevelComponent([questionForAnswer])
  }

  showDeleteQuestionConfirm(question, currentScript, answerData) {
    confirm({
      title: 'Do you want to delete these Question?',
      content: question.attributes.body,
      onOk: () => this.handleDeleteQuestionAction(question.id, currentScript.id, answerData),
      onCancel() {
      },
    })
  }

  showDeleteAnswerConfirm(answerData, question) {
    confirm({
      title: 'Do you want to delete these Answer?',
      content: answerData.attributes.body,
      onOk: () => this.handleDeleteAnswerAction(answerData, question),
      onCancel() {
      },
    })
  }

  handleEditQuestion = (e, question, currentScript) => {
    e.stopPropagation()
    this.props.setCurrentQuestion(question)
    this.setState({
      editQuestionForm: true,
      editQuestionId: question.id,
    })
  }

  handleEditAnswer = (e, answerData, question) => {
    e.stopPropagation()
    this.props.setCurrentQuestion(question)
    this.props.setCurrentAnswer(answerData)
    this.setState({
      editAnswerForm: true,
      editAnswerId: answerData.id,
    })
  }

  handleDeleteQuestion = (e, question, currentScript, answerData) => {
    e.stopPropagation()
    this.showDeleteQuestionConfirm(question, currentScript, answerData)
  }

  handleDeleteAnswer = (e, answerData, question) => {
    e.stopPropagation()
    this.showDeleteAnswerConfirm(answerData, question)
  }

  renderQuestionHeader = (question, currentScript, answerData) => {
    let deleteDisabled = false

    if(!_.isEmpty(question.attributes.answers)) {
      deleteDisabled = true
    }

    return (
      <div>
        {question.attributes.body}
        <AntComponents.Button style={{ float: 'right', paddingRight: '10px' }} icon="delete"
                              onClick={(e) => this.handleDeleteQuestion(e, question, currentScript, answerData)}
                              disabled={deleteDisabled} />
        <AntComponents.Button style={{ float: 'right', marginRight: '10px' }} icon="edit"
                              onClick={(e) => this.handleEditQuestion(e, question, currentScript)} />

      </div>
    )
  }

  renderAnswerHeader = (answerData, question,questions) => {
    // answerData.attributes.body

    let deleteDisabled = this.checkAnswerHaveQuestion(answerData, questions)

    return (
      <div>
        {/*{questionTrimmer(answerData.attributes.body)}*/}
        {answerData.attributes.body}
        <AntComponents.Button style={{ float: 'right', paddingRight: '10px' }} icon="delete"
                              onClick={(e) => this.handleDeleteAnswer(e, answerData, question)}
                              disabled={!deleteDisabled} />
        <AntComponents.Button style={{ float: 'right', marginRight: '10px' }} icon="edit"
                              onClick={(e) => this.handleEditAnswer(e, answerData, question)} />

      </div>
    )
  }

  toggleForm = () => {
    this.setState({ newQuestionOpen: !this.state.newQuestionOpen })
  }

  showAddQuestionForm = (newQuestionOpenId) => {
    // const { toggle } = this.props
    let { visibleAddAnswerFormKey } = this.state
    if (visibleAddAnswerFormKey) {
      if (visibleAddAnswerFormKey === newQuestionOpenId) {
        visibleAddAnswerFormKey = null
      } else {
        visibleAddAnswerFormKey = newQuestionOpenId
      }
    } else {
      visibleAddAnswerFormKey = newQuestionOpenId
    }
    // let toogleStep = newQuestionOpen ? 'answers' : 'question'
    this.setState({
      // newQuestionOpen: newQuestionOpen,
      visibleAddAnswerFormKey: visibleAddAnswerFormKey,
    })
    // , () => {
    //   this.props.toggleAddNewQuestion(toogleStep, newQuestionOpen)
    // })
  }

  showAddNextQuestionForm = (newNextQuestionOpen) => {
    // const { toggle } = this.props
    // let toogleStep = newNextQuestionOpen ? 'answers' : 'question'
    let { visibleAddQuestionFormKey } = this.state
    if (visibleAddQuestionFormKey) {
      if (visibleAddQuestionFormKey === newNextQuestionOpen) {
        visibleAddQuestionFormKey = null
      } else {
        visibleAddQuestionFormKey = newNextQuestionOpen
      }
    } else {
      visibleAddQuestionFormKey = newNextQuestionOpen
    }
    this.setState({
      visibleAddQuestionFormKey: visibleAddQuestionFormKey,
    })
    // , () => {
    //   this.props.toggleAddNewQuestion(toogleStep, newQuestionOpen)
    // })
  }

  toggleStep = () => {
    this.setState({
      visibleAddQuestionFormKey: false,
    })
  }

  render() {
    const { hover, modalOpen, showQuestionAddForm, newQuestionOpen } = this.state
    const {
      question,
      questions,
      setCurrentQuestion,
      currentQuestion,
      currentScript,
      disableGlossary,
    } = this.props
    return this.renderRouteToComponent()
  }
}

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    currentScript, currentQuestion,
  } = ScriptBuilderReducer
  return {
    currentScript,
    currentQuestion,
  }
}

export default connect(mapStateToProps, {
  deleteQuestion,
  removeAnswer,
  setCurrentAnswer,
  deleteQuestionAndUpdateAnswer,
})(GlossaryListItem)
