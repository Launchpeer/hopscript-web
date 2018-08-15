import React, { Component } from 'react';
import { BorderRadius, Colors } from '../../../config/styles';
import InputUI from './InputUI';

const renderTextInput = (fieldProps) => {
  const {
    input,
    type,
    placeholder,
    fontColor,
    borderRadius,
    borderColor,
    maxLength,
    showError,
    normalize,
    backgroundColor,
    classOverrides,
    meta: { dirty, touched, error }
  } = fieldProps;

  const fieldStateColor = () => {
    if (error && showError) {
      return Colors.warning;
    } else if (borderColor) {
      return borderColor;
    }
    return Colors.inputBorderColor;
  };

  return (
    <div classOverrides={`${classOverrides}`}>
      <input
        {...input}
        type="checkbox"
        className={`${borderColor ? 'ba' : 'bn'} w-100 checkbox pointer`}
      />
    </div>
  );
};

const InputCheckbox = props => <InputUI component={renderTextInput} {...props} />;

export default InputCheckbox;
