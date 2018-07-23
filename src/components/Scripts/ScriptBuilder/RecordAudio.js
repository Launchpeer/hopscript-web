import React, { Component } from 'react';
import Microm from 'microm';
import { Play, Square } from 'react-feather';
import { MicrophoneIcon } from '../../common';
import { BorderRadius, Colors } from '../../../config/styles';

const microm = new Microm();

class RecordAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audio: false
    };
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.play = this.play.bind(this);
  }


  startRecord() {
    microm.record().then(() => {
      this.setState({ recording: true });
    });
  }


  stopRecord() {
    microm.stop().then((result) => {
      this.setState({ recording: false, audio: true });
      const reader = new FileReader();
      reader.readAsDataURL(result.blob);
      reader.onloadend = () => {
        const url = reader.result;
        const base64data = url.split(',');
        this.props.saveAudio(base64data[1]);
      };
    });
  }

  play() {
    microm.play();
  }

  render() {
    const { recording, audio } = this.state;
    return (
      <div className="w-100">
        <div className="flex flex-row">
          <div
            onClick={() => this.startRecord()}
            style={{ borderRadius: BorderRadius.all }}
            className="pointer ph3 pv2 w4 tc ba b--brand-green brand-green flex flex-row items-center justify-center"
            role="button">
            <MicrophoneIcon width="2rem" height="2rem" color={Colors.brandGreen} />
            <div className="ph2">Start</div>
          </div>
          <div
            onClick={() => this.stopRecord()}
            style={{ borderRadius: BorderRadius.all }}
            className="pointer mh3 pv2 ph3 w4 tc ba b--brand-green brand-green flex flex-row items-center justify-center"
            role="button">
            <Square />
            <div className="ph2">Stop</div>

          </div>
          <div
            onClick={() => this.play()}
            style={{ borderRadius: BorderRadius.all }}
            className="pointer ph3 pv2 w4 tc ba b--brand-green brand-green flex flex-row items-center justify-center"
            role="button">
            <Play />
            <div className="ph2">Play</div>
          </div>
        </div>
      </div>
    );
  }
}
export default RecordAudio;
