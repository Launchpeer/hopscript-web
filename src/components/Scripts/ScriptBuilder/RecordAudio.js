import React, { Component } from 'react';
import Microm from 'microm';
import { BorderRadius } from '../../../config/styles';


class RecordAudio extends Component {
  constructor(props) {
    super(props);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.play = this.play.bind(this);
  }


  startRecord(e, microm) {
    e.preventDefault();
    microm.record();
  }


  stopRecord(e, microm, mp3) {
    e.preventDefault();
    microm.stop().then((result) => {
      mp3 = result;
      const reader = new FileReader();
      reader.readAsDataURL(mp3.blob);
      reader.onloadend = () => {
        const url = reader.result;
        const base64data = url.split(',');
        this.props.saveAudio(base64data[1]);
      };
    });
  }

  play(e, microm) {
    e.preventDefault();
    microm.play();
  }

  render() {
    const microm = new Microm();
    const mp3 = null;
    return (
      <div className="w-100">
        <div>microphone</div>
        <div className="flex flex-row">
          <div onClick={e => this.startRecord(e, microm)} style={{ borderRadius: BorderRadius.all }} className="pointer pa3 ba b--moon-gray" role="button">Start</div>
          <div onClick={e => this.stopRecord(e, microm, mp3)} style={{ borderRadius: BorderRadius.all }} className="pointer mh3 pa3 ba b--moon-gray" role="button">Stop</div>
          <div onClick={e => this.play(e, microm)} style={{ borderRadius: BorderRadius.all }} className="pointer pa3 ba b--moon-gray" role="button">Play</div>
        </div>
      </div>
    );
  }
}
export default RecordAudio;
