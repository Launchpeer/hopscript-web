import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Colors } from '../../../config/styles';
import { CardRight, HSButton } from '../../common';
import { fetchCall, fetchToken, startACall, playAudio, stopAudio, hangUpCall, nextLeadGroupCall, setCurrentQuestion } from '../CallActions';
import { QuestionsGlossaryView, QuestionView, NotesView } from './';


class InCallView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: false,
      questions: true,
      text: '',
      callSid: null,
      audio: false
    };

    if (!this.props.currentCall) {
      this.props.fetchCall(this.props.params.id);
    } else {
      const { phone } = this.props.currentCall.attributes.lead.attributes;
      this.props.fetchToken().then((token) => {
        Twilio.Device.setup(token);
      });

      Twilio.Device.ready(() => {
        Twilio.Device.connect();
        this.props.startACall(phone, this.props.params.id);
      });

      Twilio.Device.connect((conn) => {
        this.setState({ callSid: conn.parameters.CallSid });
      });

      Twilio.Device.error(err => (err));
    }
    this.handleHangUp = this.handleHangUp.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  handleHangUp(e) {
    e.preventDefault();
    const endTime = new Date().getTime();
    Twilio.Device.disconnectAll();
    if (this.props.callType === 'leadGroup') {
      this.props.hangUpCall(this.props.params.id, this.state.text, endTime, this.props.leadGroup.id);
      this.props.nextLeadGroupCall(this.props.leadGroup, this.props.leadGroupIndex);
    } else {
      this.props.hangUpCall(this.props.params.id, this.state.text, endTime);
      browserHistory.push('/start-call');
    }
  }

  setCurrentQuestion(data) {
    this.props.setCurrentQuestion(data);
  }

  handleNotesChange(value) {
    this.setState({ text: value });
  }

  playAudio(audio) {
    this.setState = ({ audio: true });
    this.props.playAudio(this.state.callSid, this.props.currentCall.attributes.conferenceSid, audio._url);
  }

  stopAudio(e) {
    e.preventDefault();
    this.setState = ({ audio: false });
    this.props.stopAudio(this.state.callSid, this.props.currentCall.attributes.conferenceSid);
  }

  render() {
    const { currentCall, currentQuestion } = this.props;
    const { notes, questions, audio } = this.state;
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
              <div className="flex flex-column items-end pr4">
                <div className="b f5 mb2">{currentCall.attributes.lead && currentCall.attributes.lead.attributes.name}</div>
                <div className="silver f5">{currentCall.attributes.lead && currentCall.attributes.lead.attributes.phone}</div>
              </div>
            </div>
            <div className="w-100 mt4 flex flex-row">

              <div className="flex flex-column ml4 mr5 mv4 w-40 pa2">
                <div className="pb2">
                  <div className="flex flex-row">
                    <div style={notesStyle} className="pointer b bb w4 tc pb2 bw2 f4" role="button" onClick={() => this.setState({ notes: true, questions: false })}>
                  Notes
                    </div>
                    <div style={questionsStyle} className="pointer b bb w4 tc pb2 bw2 f4" role="button" onClick={() => this.setState({ notes: false, questions: true })}>
                  Questions
                    </div>
                  </div>
                  {notes && <NotesView handleChange={this.handleNotesChange} text={this.state.text} />}
                  {questions &&
                    (currentCall.attributes.script.attributes.questions
                      ?
                        <QuestionsGlossaryView questions={currentCall.attributes.script.attributes.questions} setCurrentQuestion={this.setCurrentQuestion} currentQuestion={currentQuestion} />
                      : <div>No Questions</div>)
                  }
                </div>
              </div>
              <div className="w-60 ph3 mv4">
                <div className="w-100">
                  {currentQuestion
                     ? <QuestionView currentQuestion={currentQuestion} audioState={this.state.audio} playAudio={this.playAudio} stopAudio={e => this.stopAudio(e)}setCurrentQuestion={this.setCurrentQuestion} />
                     : <div>Select a Question to get Started!</div>}
                </div>
              </div>
            </div>
            <div className="mr5 mb4">
              <HSButton backgroundColor={Colors.brandRed} onClick={e => this.handleHangUp(e)}>End Call</HSButton>
            </div>
          </div>
        }
      </CardRight>
    );
  }
}


const mapStateToProps = ({ CallReducer }) => {
  const {
    loading,
    currentCall,
    currentQuestion,
    callType,
    leadGroup,
    leadGroupIndex
  } = CallReducer;
  return {
    loading,
    currentCall,
    currentQuestion,
    callType,
    leadGroup,
    leadGroupIndex
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
  setCurrentQuestion
})(InCallView);
