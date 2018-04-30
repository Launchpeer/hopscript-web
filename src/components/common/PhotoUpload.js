import React from 'react';
import Dropzone from 'react-dropzone';
import { User } from 'react-feather';

const PhotoUpload = (field) => {
  const files = field.input.value;
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
    <div className="rounded-profile bg-white p-3 relative">
      {!files[0] && (<User className="absolute abs-center white pointer-none" strokeWidth={1} size={100} />)}
      <Dropzone
        name={field.name}
        accept="image/jpeg, image/png, image/jpg"
        style={dropzoneStyle}
        className={`${field.dropClass} w-100 h-100 br-100 pointer hov-primary`}
        onDrop={filesToUpload => field.input.onChange(filesToUpload)}
        onDragOver={field.onDragOver}
        onDragExit={field.onDragExit}
        onDragLeave={field.onDragLeave} />
      {!files[0] && field.displayText && <div className="mt2 brand-primary">{field.displayText}</div>}
      {files[0] && files[0].preview && field.editType === "text" && (
        <div className="pointer brand-primary tc mt2"
          role="button"
          onClick={() => { field.input.onChange(null); if (field.resetPhoto) { field.resetPhoto(); } }}
          >
          {field.editText || 'Edit Logo'}
        </div>)}
      {files[0] && files[0].preview && field.editType !== "text" && (<i className="fa fa-times brand-primary white pointer absolute"
        style={{ right: 0, bottom: 10 }}
        role="button"
        onClick={() => { field.input.onChange(null); if (field.resetPhoto) { field.resetPhoto(); } }} />)}
      {field.meta.error &&
      <span className="error">{field.meta.error}</span>}
    </div>
  );
};
export default PhotoUpload;
