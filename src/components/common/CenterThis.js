// This is a presentational component that centers it's children on the screen

import React from 'react';

const CenterThis = props => (
  <div className={`w-100 flex justify-center ${props.classOverrides}`}>
    {props.children}
  </div>
);

export default CenterThis;
