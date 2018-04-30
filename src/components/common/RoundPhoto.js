import React from 'react';

const RoundPhoto = props => (
  <div className="rounded-profile p-3 relative">
    <div className="w-100 h-100 br-100"
      style={{ backgroundImage: props.backgroundImage, backgroundPosition: 'center', backgroundSize: 'cover' }} />
    {props.editText && (
    <i className="fa fa-times brand-primary pointer absolute"
      style={{ right: 0, bottom: 10 }}
      role="button"
      onClick={() => props.editImage()} />)}
  </div>

);

export default RoundPhoto;
