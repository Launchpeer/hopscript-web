import React from 'react';

const HalfGrid = props => (
  <div className={`fl w-100 w-50-ns ${props.classOverrides}`}>
    {props.children}
  </div>
);

export default HalfGrid;
