import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ArrowLeftCircle } from 'react-feather';
import { Colors } from '../../../config/styles';
import { CardRight, HSButton } from '../../common';
import { fetchCall, fetchToken } from '../CallActions';

class InCallView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: true
    };
    if (!this.props.currentCall) {
      this.props.fetchCall(this.props.params.id);
    }
    this.props.fetchToken().then((token) => {
      Twilio.Device.setup(token);
    });
    Twilio.Device.ready(() => {
      console.log('Phone is connected');
      Twilio.Device.connect({ phone: '+13236211433' });
    });

    Twilio.Device.error(err => console.log('err', err));
  }


  render() {
    const { currentCall } = this.props;
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

              <div className="flex flex-column ml4 mr5 mv4 w-40 pa2">
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
                {notes &&
                <div>
                  notes
                </div>
               }
              </div>
              <div className="mr5 mv4 w-60">
              Question, audio player, answers
              </div>

            </div>
            <div className="mr5 mb4">
              <HSButton backgroundColor={Colors.brandRed} onClick={() => console.log('This will end the call')}>End Call</HSButton>
            </div>
          </div>
        }
      </CardRight>
    );
  }
}


const mapStateToProps = ({ CallReducer }) => {
  const { loading, currentCall } = CallReducer;
  console.log('currentCall', currentCall);
  return {
    loading,
    currentCall
  };
};

export default connect(mapStateToProps, { fetchCall, fetchToken })(InCallView);
