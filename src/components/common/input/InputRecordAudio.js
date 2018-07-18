import React, { Component } from 'react';
import { Field } from 'redux-form';
import Dropzone from 'react-dropzone';
import { Colors } from '../../../config/styles';
import { MicrophoneIcon } from '../../common';

class renderAudioUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    };
    this.recordAudio = this.recordAudio.bind(this);
  }

  recordAudio() {
    console.log('here we go!');
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        console.log('stream', stream);
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
        });

        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000);
      });
  }

  render() {
    const {
      input,
      meta: { error }
    } = this.props;
    return (
      <div className="w-100 ba b--brand-green pa3">

        <div className="flex flex-row">
          <div>
            <MicrophoneIcon width="2rem" height="2rem" color={Colors.brandGreen} />
          </div>
          <div role="button" className="pointer pa3 mh2 ba" onClick={() => this.recordAudio()}>record</div>
          <div role="button" className="pointer pa3 mh2 ba" onClick={() => this.recordAudio()}>stop</div>
        </div>

        {error &&
          <span className="error">{error}</span>}
      </div>
    );
  }
}

const InputRecordAudio = props => (
  <div className="w-100 tc">
    <Field {...props} component={renderAudioUpload} />
  </div>
);

export default InputRecordAudio;
