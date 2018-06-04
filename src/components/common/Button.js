import React from 'react';
import { BorderRadius, Colors } from '../../config/styles';

const Button = ({
  action,
  children,
  fontColor,
  borderRadius,
  backgroundColor,
  classOverrides,
  onClick,
  borderColor,
  borderWidth,
  buttonPadding,
  type
}) => (
  <button
    action={action}
    style={{
      color: fontColor || Colors.white,
      borderRadius: borderRadius || BorderRadius.all,
      backgroundColor,
      borderColor: borderColor || Colors.darkGrey,
      border: `${borderWidth} solid` || 'none'
    }}
    type={type}
    className={
      buttonPadding
        ? `${buttonPadding} tc bn f3 pointer ${classOverrides}`
        : `pa3 tc bn f3 pointer ${classOverrides}`
    }
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
