import { ReactMic } from 'react-mic';
import React, { Component } from 'react';
import { Colors } from '../../../config/styles';

class RecordAudio extends Component {
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
      <div className="w-100">
        <ReactMic
          record={record}
          save={save}
          onSave={this.onSave}
          onStop={this.onStop}
          strokeColor={Colors.nearWhite}
          className="w-100"
          backgroundColor={Colors.brandGreen} />
        <div className="flex flex-row">
          <div onClick={e => this.startRecording(e)} className="pointer pa3 ba b--moon-gray br" role="button">Start</div>
          <div onClick={e => this.stopRecording(e)} className="pointer mh3 pa3 ba b--moon-gray br" role="button">Stop</div>
          <div onClick={e => this.saveRecording(e)} className="pointer pa3 ba b--moon-gray br" role="button">Save</div>
        </div>
      </div>
    );
  }
}
export default RecordAudio;
