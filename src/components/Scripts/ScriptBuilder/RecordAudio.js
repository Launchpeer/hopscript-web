import React, { Component } from 'react';
import Microm from 'microm';
import { Play, Square, Save } from 'react-feather';
import { MicrophoneIcon } from '../../common';
import { BorderRadius, Colors } from '../../../config/styles';

const microm = new Microm();

const recordUI = (state) => {
  if (state === true) {
    return "pointer ph3 pv2 w4 tc ba b--green-glow brand-green flex flex-row items-center justify-center";
  }
  return "pointer ph3 pv2 w4 tc ba b--brand-green brand-green flex flex-row items-center justify-center";
};

class RecordAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audio: false,
      saved: false
    };
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.play = this.play.bind(this);
    this.save = this.save.bind(this);
    this.reRecord = this.reRecord.bind(this);
  }


  startRecord() {
    microm.record().then(() => {
      this.setState({ recording: true });
    });
  }


  stopRecord() {
    microm.stop().then((result) => {
      this.setState({ audio: true });
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

  save() {
    this.setState({ saved: true });
  }

  reRecord() {
    this.setState({
      recording: false,
      audio: false,
      saved: false
    });
  }

  render() {
    const { recording, audio, saved } = this.state;
    return (
      <div className="w-100">
        <div className="flex flex-column">
          { audio === false && saved === false &&
            <div className="flex flex-row">
              <div
                onClick={() => this.startRecord()}
                style={{ borderRadius: BorderRadius.all }}
                className={recordUI(recording)}
                role="button">
                <MicrophoneIcon width="1.5rem" height="1.5rem" color={Colors.brandGreen} />
                <div className="ph2">Record</div>
              </div>
              { recording &&
              <div
                onClick={() => this.stopRecord()}
                style={{ borderRadius: BorderRadius.all }}
                className="pointer mh3 pv2 ph3 w4 tc ba b--brand-green brand-green flex flex-row items-center justify-center"
                role="button">
                <Square />
                <div className="ph2">Stop</div>

              </div>}
            </div>
          }

          {audio && saved === false &&
            <div className="flex flex-row">
              <div
                onClick={() => this.play()}
                style={{ borderRadius: BorderRadius.all }}
                className="pointer ph3 pv2 w4 tc ba b--brand-green bg-brand-green white flex flex-row items-center justify-center"
                role="button">
                <Play />
                <div className="ph2">Play</div>
              </div>
              <div
                onClick={() => this.save()}
                style={{ borderRadius: BorderRadius.all }}
                className="pointer mh3 pv2 ph3 w4 tc ba b--brand-green bg-brand-green white flex flex-row items-center justify-center"
                role="button">
                <Save />
                <div className="ph2">Save</div>

              </div>
            </div>}

          {saved &&
            <div className="flex flex-row">
              <div className="i">
                Recorded audio saved.
              </div>
              <div className="brand-green underline pointer pl2" role="button" onClick={() => this.reRecord()}>Re-Record</div>
            </div>

            }
        </div>
      </div>
    );
  }
}
export default RecordAudio;
