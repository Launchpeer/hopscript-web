import React from 'react';
import { AvatarIcon } from './';

const AvatarSwitcher = ({
  user,
  backgroundColor,
  iconColor,
  scale,
  classOverrides
}) => {
  const { logoImage } = user.attributes;
  return (
    <div className={`${classOverrides}`}>
      {logoImage
      ? <img src={logoImage['_url']}
        className="br-100"
        style={{
        height: `${scale}em`,
        width: `${scale}em`
      }}
        alt="avatar" />
      : <AvatarIcon scale={scale} backgroundColor={backgroundColor} iconColor={iconColor} />
      }
    </div>
  );
};
export default AvatarSwitcher;
