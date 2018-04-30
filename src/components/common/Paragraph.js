// This is a presentational component that provides a styled paragraph for content throughout the app.
// Configurable props: color, fontSize
import React from 'react';
import { Colors } from '../../config/styles';

const Paragraph = props => (

  <div
    className={
      `w-100
      ${props.classes}`
    }
    style={{
      color: Colors[props.fontColor] || Colors.black,
    }}>
    {props.children}
  </div>
);

export default Paragraph;
