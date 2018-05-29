// This is a presentational component that provides a card UI
// configurable props: borderRadius, bottomContent, maxWidth, bottomColor

import React from 'react';
import { BorderRadius, MaxWidth, Colors } from '../../config/styles';

const Card = (props) => {
  if (!props.bottomContent) {
    return (
      <div
        className={`w-100 ${props.classOverrides}`}
        style={{
          borderRadius: BorderRadius.all,
          boxShadow: props.boxShadow ? `0 2px 8px rgba(0,0,0,0.25)` : 'none'
        }}
      >
        <div
          className="w-100 pa4 pl5 pr5 bg-white"
          style={{
            borderRadius: BorderRadius.all
          }}
        >
          {props.children}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`w-100 ${props.classOverrides}`}
      style={{
        boxShadow: props.boxShadow ? `0 2px 8px rgba(0,0,0,0.25)` : 'none',
        borderRadius: BorderRadius.all
      }}
    >
      <div
        className="w-100 pt5 pl5 pr5 pb4 bg-white"
        style={{
          borderRadius: BorderRadius.top
        }}
      >
        {props.children}
      </div>
      <div
        className="w-100 pa4 pl5 pr5"
        style={{
          backgroundColor: Colors[props.bottomColor],
          borderRadius: BorderRadius.bottom
        }}
      >
        {props.bottomContent}
      </div>
    </div>
  );
};

export default Card;
