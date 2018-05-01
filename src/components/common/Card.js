// This is a presentational component that provides a card UI
// configurable props: borderRadius, bottomContent, maxWidth, bottomColor

import React from 'react';
import { BorderRadius, MaxWidth, Colors } from '../../config/styles';

const Card = (props) => {
  if (!props.bottomContent) {
    return (
      <div
        className={`w-100 pa4 bg-white pl5 pr5 ${props.classOverrides}`}
        style={{
          borderRadius: '4px',
          maxWidth: props.maxWidth ? MaxWidth[props.maxWidth] : '',
          boxShadow: props.boxShadow ? `0 2px 8px rgba(0,0,0,0.25)` : 'none'
        }}
      >
        {props.children}
      </div>
    );
  }
  return (
    <div
      className={`w-100 ${props.classOverrides}`}
      style={{
        boxShadow: props.boxShadow ? `0 2px 8px rgba(0,0,0,0.25)` : 'none',
        borderRadius: '4px'
      }}
    >
      <div
        className="w-100 pa4 pl5 pr5 bg-white"
        style={{
          borderRadius: '4px 4px 0px 0px'
        }}
      >
        {props.children}
      </div>
      <div
        className="w-100 pa4 pl5 pr5"
        style={{
          backgroundColor: Colors[props.bottomColor],
          borderRadius: '0px 0px 4px 4px'
        }}
      >
        {props.bottomContent}
      </div>
    </div>
  );
};

export default Card;
