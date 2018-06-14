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
  }

  render() {
    const {
      input,
      name,
      classOverrides,
      meta: { error }
    } = this.props;
    const files = input.value;
    return (
      <div className="pointer">
        <div className="flex items-center w-100 ba br2 pa2" style={{ borderColor: Colors.brandGreen, height: '3rem' }}>
          {files[0] && (<div>File exists</div>)}
          <div>
            <MicrophoneIcon width="2rem" height="2rem" color={Colors.brandGreen} />
          </div>
          <div className="brand-green">Optional Audio</div>
          <Dropzone
            name='audio'
            className={`${this.state.dragging === true ? "bg-brand-primary" : "hov-image-uploader"} ${classOverrides}`}
            onDrop={filesToUpload => input.onChange(filesToUpload)}
            dropClass={this.state.dragging === true ? "bg-brand-primary" : "bg-moon-grey"}
            onDragOver={() => this.setState({ dragging: true })}
            onDragLeave={() => this.setState({ dragging: false })}
          />
        </div>
        {error &&
        <span className="error">{error}</span>}
      </div>
    );
  }
}

const InputAudio = (props) => (
  <div className="w-100 tc">
    <Field {...props} component={renderAudioUpload} />
  </div>
);

export default InputAudio;
