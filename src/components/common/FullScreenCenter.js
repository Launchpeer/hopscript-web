// This is a presentational component that provides a full height, full width, container that centers it's children and is capable of being customized with a background color

import React from 'react';

const FullScreenCenter = props => (

  <div className={`flex justify-center w-100 ${props.classOverrides}`} style={{ backgroundColor: props.color }}>
    {props.children}
  </div>
);

export default FullScreenCenter;
