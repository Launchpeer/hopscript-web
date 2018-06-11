import React from 'react';

const Title = props => (
  <div className={`w-100 pa3 f4 b brand-green ${props.classOverrides}`}>
    <div className="pa2">
      {props.children}
    </div>
  </div>
);

export default Title;
