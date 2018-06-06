import React from 'react';
import { Field } from 'redux-form';
import Textarea from "react-textarea-autosize";

import { BorderRadius, Colors } from '../../../config/styles';
import InputUI from './InputUI';

const renderTextAreaInput = (fieldProps) => {
  const {
    input,
    placeholder,
    fontColor,
    borderRadius,
    borderColor,
    maxLength,
    showError,
    style,
    meta: { dirty, touched, error }
  } = fieldProps;


  return (
    <Textarea {...input} style={style} placeholder={placeholder} />
  );
};

const InputTextArea = (props) => (
  <InputUI component={renderTextAreaInput} {...props} style={props.style} placeholder={props.placeholder} />
);

export default InputTextArea;
