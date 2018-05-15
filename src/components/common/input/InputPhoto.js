import React, { Component } from 'react';
import { Field } from 'redux-form';
import Dropzone from 'react-dropzone';
import { User } from 'react-feather';

class renderPhotoUpload extends Component {
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
      displayText,
      editText,
      meta: { error }
    } = this.props;
    const files = input.value;
    let dropzoneStyle = { zIndex: 20000 };
    let backgroundHolder;
    if (files[0] && files[0].preview) {
      backgroundHolder = files[0].preview;
      dropzoneStyle = {
        backgroundImage: `url(${backgroundHolder})`, backgroundPosition: 'center', backgroundSize: 'cover', zIndex: 1000,
      };
    } else if (files && typeof (files) === 'string') {
      backgroundHolder = files;
      dropzoneStyle = {
        backgroundImage: `url(${backgroundHolder})`, backgroundPosition: 'center', backgroundSize: 'cover', zIndex: 1000,
      };
    }
    return (
      <div className="p-3">
        <div className="rounded-profile relative">
          {!files[0] && (<User className="absolute abs-center pointer" color="white" strokeWidth={1} size={100} />)}
          <Dropzone
            name={name}
            accept="image/jpeg, image/png, image/jpg"
            style={dropzoneStyle}
            className={`${this.state.photoDragging === true ? "bg-brand-primary" : "hov-image-uploader"} br-100 pointer w-100 h-100 `}
            onDrop={filesToUpload => input.onChange(filesToUpload)}
            dropClass={this.state.photoDragging === true ? "bg-brand-primary" : "bg-moon-grey"}
            onDragOver={() => this.setState({ photoDragging: true })}
            onDragLeave={() => this.setState({ photoDragging: false })}
          />
          {files[0] && files[0].preview &&
            (
              <i className="fa fa-times brand-primary white pointer absolute"
                style={{ right: 0, bottom: 10 }}
                role="button"
                onClick={() => { input.onChange(null); }}
              />
            )
          }
        </div>
        {!files[0] && displayText && <div className="mt2 mb2 brand-primary">{displayText}</div>}
        {files[0] && editText && <div className="mt2 mb2 brand-primary">{editText}</div>}
        {error &&
        <span className="error">{error}</span>}
      </div>
    );
  }
}

const InputPhoto = props => (
  <div className="w-100 tc">
    <Field {...props} component={renderPhotoUpload} />
  </div>
);

export default InputPhoto;
