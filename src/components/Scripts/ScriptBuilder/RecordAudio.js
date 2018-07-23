import { ReactMic } from 'react-mic';
import React, { Component } from 'react';
import lamejs from 'lamejs';
import { Colors, BorderRadius } from '../../../config/styles';


class RecordAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    };
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

  /*
  onSave() {
    if (this.state.recording) {
      console.log('this.state.recording', this.state.recording);
      const reader = new FileReader();
      reader.readAsDataURL(this.state.recording);
      reader.onloadend = () => {
        const url = reader.result;
        const base64data = url.split(',')[1];
        this.props.saveAudio(base64data);
      };
    }
  }


  onSave() {
    if (this.state.recording) {
      const audioURL = URL.createObjectURL(this.state.recording);
      console.log('audioURL', audioURL);
      this.props.saveAudio(audioURL);
    }
  }
*/

  /*
  // https://github.com/zhuker/lamejs
  onStop(data) {
    console.log('data', data);
    const samples = new Int16Array(data.blobURL);
    console.log('samples', samples);
    const mp3Data = [];
    const mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128);
    let mp3Tmp = mp3encoder.encodeBuffer(samples);
    mp3Data.push(mp3Tmp);
    mp3Tmp = mp3encoder.flush();
    mp3Data.push(mp3Tmp);
    const blob = new Blob(mp3Data, { type: 'audio/mp3' });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const url = reader.result;
      const base64data = url.split(',')[1];
      this.props.saveAudio(base64data);
    };
  }
  */

  //
  onStop(data) {
    const blob = new Blob(data.blobURL, { type: 'audio/mp3' });
    console.log('blob', blob);
  }


  render() {
    const { record } = this.state;
    return (
      <div className="w-100">
        <ReactMic
          record={record}
          onStop={this.onStop}
          strokeColor={Colors.nearWhite}
          className="w-100 steps"
          backgroundColor={Colors.brandGreen} />
        <div className="flex flex-row">
          <div onClick={e => this.startRecording(e)} style={{ borderRadius: BorderRadius.all }} className="pointer pa3 ba b--moon-gray" role="button">Start</div>
          <div onClick={e => this.stopRecording(e)} style={{ borderRadius: BorderRadius.all }} className="pointer mh3 pa3 ba b--moon-gray" role="button">Stop</div>
        </div>
      </div>
    );
  }
}
export default RecordAudio;
