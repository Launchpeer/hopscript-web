import React from 'react';

import { Colors } from '../../config/styles';
import { Button } from './';

const HSButton = ({ children, onClick, backgroundColor, classOverrides }) => (
  <div className={`w-100 flex items-end flex-column ${classOverrides}`}>
    <Button
      borderRadius="4px"
      backgroundColor={backgroundColor || Colors.brandGreen}
      onClick={onClick}
      classOverrides="f5 pl5 pr5" >
      {children}
    </Button>
  </div>
);

export default HSButton;
