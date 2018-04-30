// This is a presentational component that provides a card with a top label
// configurable props: borderRadius, topContent, topBackgroundColor, classOverrides

import React from 'react';
import { BorderRadius, Colors } from '../../config/styles';

const CardWithLabel = ({
  borderRadius,
  topContent,
  topBackgroundColor,
  classOverrides,
  children,
  boxShadow,
  topFontColor,
  borderColor,
  childrenOverrides,
  topContentClassOverrides
}) => (
  <div className={`w-100 bg-white ${classOverrides}`}
    style={{
          borderRadius: BorderRadius[borderRadius].all || BorderRadius['medium'].all,
          boxShadow: boxShadow ? `0 8px ${BorderRadius[borderRadius].all || BorderRadius.medium.all} rgba(0,0,0,0.5)` : 'none',
          border: borderColor && `1px solid ${borderColor}`
        }}>
    <div className={`w-100 pa3 flex items-center justify-between ${topContentClassOverrides}`}
      style={{
            borderBottom: `1px solid ${Colors.moonGray}`,
            color: topFontColor || Colors.brandDeepGray,
            backgroundColor: topBackgroundColor || Colors.white,
          }}>
      {topContent}
    </div>
    <div className={`pa2 ${childrenOverrides}`}>
      {children}
    </div>
  </div>
);

export default CardWithLabel;
