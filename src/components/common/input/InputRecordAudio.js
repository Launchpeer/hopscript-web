import { ReactMic } from 'react-mic';
import React, { Component } from 'react';

class InputRecordAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      save: false
    };
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

  onSave() {
    this.setState({
      save: false,
    });
  }

  onStop(state) {
    console.log('recordedBlob is: ', state.blobURL);
  }

  render() {
    const { record, save } = this.state;
    return (
      <div>
        <ReactMic
          record={record}
          save={save}
          className="sound-wave"
          onSave={this.onSave}
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <div onClick={e => this.startRecording(e)} className="pointer pa3 ba" role="button">Start</div>
        <div onClick={e => this.stopRecording(e)} className="pointer pa3 ba" role="button">Stop</div>
        <div onClick={e => this.saveRecording(e)} className="pointer pa3 ba" role="button">Save</div>
      </div>
    );
  }
}
export default InputRecordAudio;
