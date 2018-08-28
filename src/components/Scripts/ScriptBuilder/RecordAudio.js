import React, { Component } from 'react';
import { connect } from 'react-redux';
import Microm from 'microm';
import { Play, Square, Save, X } from 'react-feather';
import { MicrophoneIcon } from '../../common';
import { BorderRadius, Colors } from '../../../config/styles';
import { toggleDisableGlossary } from './ScriptBuilderActions';

const microm = new Microm();

const recordUI = (state) => {
  if (state === true) {
    return "pointer ph3 pv2 w4 tc ba b--green-glow brand-green flex flex-row items-center justify-center";
  }
  return "pointer ph3 pv2 w4 tc ba b--brand-green brand-green flex flex-row items-center justify-center";
};

const playUI = (state) => {
  if (state === true) {
    return "pointer ph3 pv2 w4 tc ba b--brand-green green-glow white flex flex-row items-center justify-center";
  }
  return "pointer ph3 pv2 w4 tc ba b--brand-green bg-brand-green white flex flex-row items-center justify-center";
};

class RecordAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audio: false,
      saved: false,
      playing: false
    };
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.play = this.play.bind(this);
    this.save = this.save.bind(this);
    this.reRecord = this.reRecord.bind(this);
    this.stopPlay = this.stopPlay.bind(this);
  }


  startRecord() {
    microm.record().then(() => {
      this.setState({ recording: true });
    });
    this.props.toggleDisableGlossary(true);
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
    this.setState({ playing: true });
    microm.play();
  }

  stopPlay() {
    this.setState({ playing: false });
    microm.stop();
  }

  save() {
    this.setState({ saved: true });
    this.props.toggleDisableGlossary(false);
  }

  reRecord() {
    this.setState({
      recording: false,
      audio: false,
      saved: false,
      playing: false
    });
    this.props.toggleDisableGlossary(false);
  }

  render() {
    const {
      recording, audio, saved, playing
    } = this.state;
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
            <div className="flex flex-column">
              <div className="flex flex-row">
                <div
                  onClick={() => this.play()}
                  style={{ borderRadius: BorderRadius.all }}
                  className={playUI(playing)}
                  role="button">
                  <Play />
                  <div className="ph2">Play</div>
                </div>
                <div
                  onClick={() => this.stopPlay()}
                  style={{ borderRadius: BorderRadius.all }}
                  className="pointer ml3 pv2 ph3 w4 tc ba b--brand-green bg-brand-green white flex flex-row items-center justify-center"
                  role="button">
                  <Square />
                  <div className="ph2">Stop</div>

                </div>
                <div
                  onClick={() => this.save()}
                  style={{ borderRadius: BorderRadius.all }}
                  className="pointer mh3 pv2 ph3 w4 tc ba b--brand-green bg-brand-green white flex flex-row items-center justify-center"
                  role="button">
                  <Save />
                  <div className="ph2">Save</div>


                </div>
                <div
                  onClick={() => this.reRecord()}
                  style={{ borderRadius: BorderRadius.all }}
                  className="pointer pv2 ph3 w4 tc ba b--dark-red dark-red flex flex-row items-center justify-center"
                  role="button">
                  <X />
                  <div className="ph2">Cancel</div>
                </div>
              </div>
              <div className="silver f6">* Playback during script builder might sound choppy until saved and used on a call.</div>
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


export default connect(null, {
  toggleDisableGlossary
})(RecordAudio);
