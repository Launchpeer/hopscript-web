// This is a presentational component that provides left and right padding

import React from 'react';

const PaddingX = props => (
  <div className="pl2 pr2">
    {props.children}
  </div>
);

export default PaddingX;
