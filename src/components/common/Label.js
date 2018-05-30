import React from "react";
import { Colors } from '../../config/styles';

const Label = ({ name, label }) => (
  <label htmlFor={name}
    className="f6 b"
    style={{
      color: Colors.black
    }}
    >{label}
  </label>
);

export default Label;
