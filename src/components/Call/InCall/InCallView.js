import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors } from '../../../config/styles';
import { CardRight, HSButton, currentTime } from '../../common';
import { fetchCall, fetchToken, startACall, saveNotes, setCurrentQuestion, playAudio, joinConference } from '../CallActions';
import { NotesView, QuestionsGlossaryView, QuestionView } from './';

class InCallView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: false,
      questions: true,
      notesText: '',
      notesSave: null,
      callSid: null
    };
    if (!this.props.currentCall) {
      this.props.fetchCall(this.props.params.id);
    } else {
      const { phone } = this.props.currentCall.attributes.lead.attributes;
      this.props.fetchToken().then((token) => {
        Twilio.Device.setup(token);
      });
      Twilio.Device.ready(() => {
        this.props.startACall(phone)
          .then(() => {
            Twilio.Device.connect();
          });
      });
      Twilio.Device.connect((conn) => {
        this.setState({ callSid: conn.parameters.CallSid });
      });

      Twilio.Device.error(err => console.log('err', err));
    }
    this.handleHangUp = this.handleHangUp.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  handleHangUp(e) {
    e.preventDefault();
    Twilio.Device.disconnectAll();
  }

  setCurrentQuestion(data) {
    this.props.setCurrentQuestion(data);
  }

  handleNotes(text) {
    let thistext = text;
    thistext = thistext.split('<p>').join('').split('</p>').join('');
    const time = currentTime();
    this.setState({ saved: time });
    this.props.saveNotes(this.props.currentCall, thistext);
  }

  handleNotesChange(value) {
    this.setState({ text: value });
  }

  playAudio(e) {
    e.preventDefault();
    this.props.playAudio();
  }

  render() {
    const { currentCall, currentQuestion } = this.props;
    const { notes, questions } = this.state;
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
                  {notes && <div>notes</div>}
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
                     ? <QuestionView currentQuestion={currentQuestion} playAudio={e => this.playAudio(e)} setCurrentQuestion={this.setCurrentQuestion} />
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
  const { loading, currentCall, currentQuestion } = CallReducer;
  return {
    loading,
    currentCall,
    currentQuestion
  };
};

export default connect(mapStateToProps, {
  fetchCall, fetchToken, startACall, setCurrentQuestion, playAudio, joinConference
})(InCallView);
