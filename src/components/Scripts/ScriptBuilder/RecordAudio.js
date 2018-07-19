import { ReactMic } from 'react-mic';
import React, { Component } from 'react';
import { Colors, BorderRadius } from '../../../config/styles';

class RecordAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      save: false,
      recording: null
    };
    this.onSave = this.onSave.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  startRecording(e) {
    e.preventDefault();
    this.setState({
      record: true
    });
  }

  stopRecording(e) {
    e.preventDefault();
    this.setState({
      record: false
    });
  }

  saveRecording(e) {
    e.preventDefault();
    this.setState({
      save: true
    });
  }

  onSave(e) {
    e.preventDefault();
    console.log('saved:', this.state.recording);
  }

  onStop(data) {
    this.setState({ recording: data });
  }

  render() {
    const { record, save } = this.state;
    return (
      <div className="w-100">
        <ReactMic
          record={record}
          save={save}
          onSave={e => this.onSave(e)}
          onStop={this.onStop}
          strokeColor={Colors.nearWhite}
          className="w-100 steps"
          backgroundColor={Colors.brandGreen} />
        <div className="flex flex-row">
          <div onClick={e => this.startRecording(e)} style={{ borderRadius: BorderRadius.all }} className="pointer pa3 ba b--moon-gray" role="button">Start</div>
          <div onClick={e => this.stopRecording(e)} style={{ borderRadius: BorderRadius.all }} className="pointer mh3 pa3 ba b--moon-gray" role="button">Stop</div>
          <div onClick={e => this.saveRecording(e)} style={{ borderRadius: BorderRadius.all }} className="pointer pa3 ba b--moon-gray" role="button">Save</div>
        </div>
      </div>
    );
  }
}
export default RecordAudio;
