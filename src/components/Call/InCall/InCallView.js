import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Square, CheckSquare } from 'react-feather';
import uuidv4 from 'uuid/v4';
import { Colors } from '../../../config/styles';
import { CardRight, HSButton, InputNotesQuill } from '../../common';
import { fetchCall, fetchToken, startACall, playAudio, stopAudio, hangUpCall, hangUpLGCall, nextLeadGroupCall, setCurrentQuestion, fetchAndSetToken, goToPreviousQuestion } from '../CallActions';
import { updateLead } from '../../Leads/LeadsActions';
import { QuestionsGlossaryView, QuestionView, QuestionsGlossaryBubbleView, QuestionViewBubble } from './';


class InCallView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: false,
      questions: true,
      text: '',
      callSid: null,
      playingAudio: false,
      noAnswer: false,
      showRender: false,
      goForwardStatus: true,
      showStartQuestions: false,
      showMainQuestions: false,
      showMainQuestionsContent: 'visible',
      nextQuestionToRout: null,
    };

    this.handleHangUp = this.handleHangUp.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
    this.playAudioFile = this.playAudioFile.bind(this);
    this.stopAudio = this.stopAudio.bind(this);
    this.showMainQuestion = _.debounce(this.showMainQuestion, 500)
  }

  componentDidMount() {
    const conferenceName = uuidv4();

    if (!this.props.currentCall) {
      this.props.fetchCall(this.props.params.id);
    } else {
      const { phone } = this.props.currentCall.attributes.lead.attributes;

      Twilio.Device.setup(this.props.token);


      Twilio.Device.ready(() => {
        Twilio.Device.connect({ conferenceName });
        this.props.startACall(phone, this.props.params.id, conferenceName);
      });

      Twilio.Device.connect((conn) => {
        this.setState({ callSid: conn.parameters.CallSid });
      });

      Twilio.Device.error(err => (err));
    }
  }

  handleHangUp() {
    const endTime = new Date().getTime();
    const data = { lastContact: endTime, lastCallTitle: this.props.currentCall.attributes.title, lastCallNotes: this.state.text };

    if(Twilio.Connection) {
      Twilio.Device.disconnectAll();
      Twilio.Device.destroy();
    }

    this.props.updateLead(data, this.props.currentCall.attributes.lead.id);
    if (this.props.callType === 'leadGroup') {
      const leadGroupList = this.props.leadGroup.attributes.leads.map(lead => lead.id);
      const nextLeadIdx = (leadGroupList.indexOf(this.props.currentCall.attributes.lead.id) + 1);
      this.props.hangUpCall(this.props.params.id, this.state.text, endTime, this.state.noAnswer, this.props.leadGroup.id);
      if (this.props.leadGroup.attributes.leads[nextLeadIdx]) {
        browserHistory.push(`/next-call/${this.props.leadGroup.attributes.leads[nextLeadIdx].id}/${this.props.leadGroup.id}/${this.props.currentCall.attributes.script.id}/${this.props.currentCall.attributes.title}`);
        window.location.reload(true);
      } else {
        browserHistory.push('/start-call');
        window.location.reload(true);
      }
    } else {
      this.props.hangUpCall(this.props.params.id, this.state.text, endTime, this.state.noAnswer);
      browserHistory.push('/start-call');
      window.location.reload(true);
    }
  }

  toogleRenderBubble(goForwardStatus = true){
    let showRender = !this.state.showRender
    this.setState({
      showRender,
      goForwardStatus
    })
  }

  setCurrentQuestion(data) {
    this.toogleRenderBubble(true)
    let questionHistory = _.cloneDeep(this.props.previousQuestion);
    this.props.fetchCall(this.props.params.id);
    this.setState({
      showMainQuestionsContent: 'hide',
      nextQuestionToRout: data,
    }, () => {
      setTimeout(() => {
        this.props.setCurrentQuestion(data);
        questionHistory.push(data);
        this.props.goToPreviousQuestion(questionHistory);
      }, 800)
    })
  }

  goToPreviousQuestion = () => {
      this.toogleRenderBubble(false)
      const prevQuestionHistory = _.cloneDeep(this.props.previousQuestion);
      prevQuestionHistory.splice(prevQuestionHistory.length - 1, 1)
      this.props.fetchCall(this.props.params.id);
      if (!_.isEmpty(prevQuestionHistory)) {
        this.setState({
          nextQuestionToRout: prevQuestionHistory[prevQuestionHistory.length - 1],
        }, () => {
          this.props.setCurrentQuestion(prevQuestionHistory[prevQuestionHistory.length - 1]);
          this.props.goToPreviousQuestion(prevQuestionHistory);
        })
      } else {
        this.setState({
          showMainQuestionsContent: 'visible',
          nextQuestionToRout: null,
        }, () => {
          setTimeout(() => {
        this.props.setCurrentQuestion(null);
        this.props.goToPreviousQuestion([]);
          }, 500)
        })
      }
  }

  handleNotesChange(value) {
    this.setState({ text: value });
  }

  playAudioFile() {
    this.props.playAudio(this.state.callSid, this.props.currentCall.attributes.conferenceSid, this.props.currentQuestion.attributes.audioURI);
  }


  stopAudio() {
    this.props.stopAudio(this.state.callSid, this.props.currentCall.attributes.conferenceSid);
  }

  showMainQuestion = () => {
    this.setState({
      showMainQuestions: true,
    })
  }

  showMainQuestions = () => {
    this.setState({
      showStartQuestions: true,
    }, () => {
      this.showMainQuestion()
      }
    )
  }

  render() {
    const { currentCall, currentQuestion, previousQuestion } = this.props;

    const {
      notes, questions, playingAudio, noAnswer, showMainQuestions, showStartQuestions, showMainQuestionsContent
    } = this.state;
    const notesStyle = notes ? { color: Colors.brandPrimary, borderColor: Colors.brandPrimary } : { color: Colors.black, borderColor: Colors.lightGray };
    const questionsStyle = !notes ? { color: Colors.brandPrimary, borderColor: Colors.brandPrimary } : { color: Colors.black, borderColor: Colors.lightGray };

    return (
      <CardRight>
        {currentCall &&
        <div>
          <div className="flex flex-row justify-between bb bw1 b--light-gray pa3 f4 mt2">
            <div className="flex flex-row items-center">
              <div className="pl3 b">{currentCall.attributes.title}</div>
            </div>
            <div className="flex flex-row items-center pr4">
              <div className="flex flex-column items-end pr4">
                <div className="b f5 mb2">{currentCall.attributes.lead && currentCall.attributes.lead.attributes.name}</div>
                <div className="silver f5">{currentCall.attributes.lead && currentCall.attributes.lead.attributes.phone}</div>
              </div>
              <div className="circle-button green-glow pointer-none">
                <i className="fa fa-phone white" />
              </div>
            </div>
          </div>
          <div className="w-100 mt4 flex flex-row">

            {_.isEmpty(previousQuestion) && <div className="flex flex-column ml4 mr5 mv4 w-60 pa2">
              <div className="pb2">
                {!showMainQuestions && <div
                  className={`flex w-100 fl items-center justify-between pa3 pointer list-hover circleBase type-500-start ${showStartQuestions ? 'start-button-bubble-hide' : 'start-button-bubble-visible'}`}
                  onClick={this.showMainQuestions}
                  role="button"
                >
                  <p>Start</p>
                </div>}
                {(questions && showMainQuestions) &&
                (currentCall.attributes.script.attributes.questions
                  ?
                  <QuestionsGlossaryBubbleView
                    questions={currentCall.attributes.script.attributes.questions}
                    setCurrentQuestion={this.setCurrentQuestion}
                    currentQuestion={currentQuestion}
                    additionalClassName={`start-button-bubble-${showMainQuestionsContent}`}
                  />
                  : <div>No Questions</div>)
                }
              </div>
            </div>}
            {!_.isEmpty(previousQuestion) && <div className="w-100 ph3 mv4">
              <div className="w-100">
                <div className="animation-bubble-wrapper">

                  <div className="bubble-child-wrapper">
                    <QuestionViewBubble
                      currentQuestion={currentQuestion}
                      previousQuestion={previousQuestion}
                      audioState={playingAudio}
                      playAudio={() => { this.setState({ playingAudio: true }); this.playAudioFile(); }}
                      stopAudio={() => { this.setState({ playingAudio: false }); this.stopAudio(); }}
                      setCurrentQuestion={this.setCurrentQuestion}
                      goToPreviousQuestion={this.goToPreviousQuestion}
                      showRender={this.state.showRender}
                      goForwardStatus={this.state.goForwardStatus}
                      nextQuestionToRout={this.state.nextQuestionToRout}
                    />
                  </div>

                </div>
              </div>
            </div>}
          </div>
          <div className="flex flex-column items-end pr5 pv3 w-100" >
            <div className="flex flex-row items-center">
              <div className="pr2" role="button" onClick={() => this.setState({ noAnswer: !noAnswer })}>
                {!noAnswer ? <Square /> : <CheckSquare /> }
              </div>
              <div>Check if no answer</div>
            </div>
          </div>

          <div className="mr5 mb4">
            <HSButton backgroundColor={Colors.brandRed} onClick={(e) => { e.preventDefault(); this.handleHangUp(); }}>End Call</HSButton>
          </div>
        </div>
        }
      </CardRight>
    );
  }
}


const mapStateToProps = ({ CallReducer }) => {
  const {
    currentCall,
    currentQuestion,
    previousQuestion,
    callType,
    leadGroup,
    leadGroupIndex,
    token
  } = CallReducer;
  return {
    currentCall,
    currentQuestion,
    previousQuestion,
    callType,
    leadGroup,
    leadGroupIndex,
    token
  };
};

export default connect(mapStateToProps, {
  fetchCall,
  fetchToken,
  startACall,
  nextLeadGroupCall,
  playAudio,
  stopAudio,
  hangUpCall,
  hangUpLGCall,
  setCurrentQuestion,
  goToPreviousQuestion,
  updateLead,
  fetchAndSetToken
})(InCallView);
