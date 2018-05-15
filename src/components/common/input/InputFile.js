import React, { Component } from 'react';
import { Field } from 'redux-form';
import Dropzone from 'react-dropzone';

class renderFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoDragging: false,
    };
  }

  render() {
    const {
      input,
      name,
      meta: { error }
    } = this.props;
    const files = input.value;
    return (
      <div>
        <div className="rounded-profile relative">
          {files[0] && (<div>File exists</div>)}
          <Dropzone
            name={name}
            accept="text/csv"
            className={`${this.state.photoDragging === true ? "bg-brand-primary" : "hov-image-uploader"} br-100 pointer w-100 h-100 `}
            onDrop={filesToUpload => input.onChange(filesToUpload)}
            dropClass={this.state.photoDragging === true ? "bg-brand-primary" : "bg-moon-grey"}
            onDragOver={() => this.setState({ photoDragging: true })}
            onDragLeave={() => this.setState({ photoDragging: false })}
          />
        </div>
        {error &&
        <span className="error">{error}</span>}
      </div>
    );
  }
}

const InputFile = props => (
  <div className="w-100 tc">
    <Field {...props} component={renderFileUpload} />
  </div>
);

export default InputFile;
