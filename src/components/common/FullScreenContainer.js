// This is a presentational component that provides a full height, full width container capable of being customized with a background color

import React from 'react';

const FullScreenContainer = props => (
  <div
    className={`w-100 ${props.classOverrides}`}
    style={{ backgroundColor: props.color }}
  >
    <div className="">{props.children}</div>
  </div>
);

export default FullScreenContainer;
