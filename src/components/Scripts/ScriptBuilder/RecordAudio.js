import React, { Component } from 'react';
import Microm from 'microm';
import { BorderRadius } from '../../../config/styles';


class RecordAudio extends Component {
  constructor(props) {
    super(props);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }


  startRecord(e, microm) {
    e.preventDefault();
    microm.record().then(() => {
      console.log('recording...');
    }).catch(() => {
      console.log('error recording');
    });
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
        console.log('base64data', base64data[1]);
        this.props.saveAudio(base64data[1]);
      };
    });
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
        </div>
      </div>
    );
  }
}
export default RecordAudio;
