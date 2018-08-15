import React from 'react';

import { Colors } from '../../config/styles';
import { Button } from './';

const HSButton = ({
  children, onClick, backgroundColor, borderWidth, borderColor, fontColor, classOverrides
}) => (
  <div className={`w-100 flex items-end flex-column ${classOverrides}`}>
    <Button
      fontColor={fontColor || Colors.white}
      borderWidth={borderWidth || "0px"}
      borderColor={borderColor || Colors.brandGreen}
      borderRadius="4px"
      backgroundColor={backgroundColor || Colors.brandGreen}
      onClick={onClick}
      classOverrides="f5 pl5 pr5" >
      {children}
    </Button>
  </div>
);

export default HSButton;
