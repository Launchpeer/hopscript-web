import React from 'react';
import { User } from 'react-feather';

const AvatarIcon = ({ backgroundColor, scale, iconColor }) => {
  const iconSize = scale * 10;
  return (
    <div className="br-100 flex items-center justify-center mb2"
      style={{
      width: `${scale}rem`,
      height: `${scale}rem`,
      backgroundColor
    }}
    >
      <User color={iconColor} size={iconSize} />
    </div>
  );
};

export default AvatarIcon;
