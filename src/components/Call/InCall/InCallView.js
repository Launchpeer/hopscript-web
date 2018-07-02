import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ArrowLeftCircle } from 'react-feather';
import { Colors } from '../../../config/styles';
import { CardRight, HSButton } from '../../common';
import { fetchCall, setCurrentQuestion } from '../CallActions';
import { NotesView, QuestionsGlossaryView, QuestionView } from './';

class InCallView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: false
    };
    if (!this.props.currentCall) {
      this.props.fetchCall(this.props.params.id);
    }
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
  }

  setCurrentQuestion(data) {
    this.props.setCurrentQuestion(data);
  }


  render() {
    const { currentCall, currentQuestion } = this.props;
    const { notes } = this.state;
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
              <div className="flex flex-column mv4 w-40 pa3">
                <div className="pb2">
                  <div className="flex flex-row">
                    <div style={notesStyle} className="pointer b bb w4 tc pb2 bw2 f4" role="button" onClick={() => this.setState({ notes: true })}>
                  Notes
                    </div>
                    <div style={questionsStyle} className="pointer b bb w4 tc pb2 bw2 f4" role="button" onClick={() => this.setState({ notes: false })}>
                  Questions
                    </div>
                  </div>
                </div>
                {notes
                  ?
                    <NotesView />
                  :
                    currentCall.attributes.script.attributes.questions
                      ?
                        <QuestionsGlossaryView questions={currentCall.attributes.script.attributes.questions} setCurrentQuestion={this.setCurrentQuestion} currentQuestion={currentQuestion} />
                      : <div>No Questions</div>
                }
              </div>
              <div className="w-60 pr3 pl3">
                <div className="mv4 w-100">
                  {currentQuestion
                    ? <QuestionView currentQuestion={currentQuestion} setCurrentQuestion={this.setCurrentQuestion} />
                    : <div>Select a Question to get Started!</div>}
                </div>
                <div className="mb4 fr">
                  <HSButton backgroundColor={Colors.brandRed} onClick={() => console.log('This will end the call')}>End Call</HSButton>
                </div>
              </div>
            </div>
          </div>
        }
      </CardRight>
    );
  }
}


const mapStateToProps = ({ CallReducer }) => {
  const { loading, currentCall, currentQuestion } = CallReducer;
  console.log(currentQuestion);
  return {
    loading,
    currentCall,
    currentQuestion
  };
};

export default connect(mapStateToProps, { fetchCall, setCurrentQuestion })(InCallView);
