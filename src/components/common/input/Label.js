import React from "react";
import { Colors } from '../../../config/styles';

const Label = ({ name, label }) => (
  <label htmlFor={name}
    className="f6"
    style={{
      color: Colors.primaryGrey
    }}
    >{label}
  </label>
);

export default Label;
