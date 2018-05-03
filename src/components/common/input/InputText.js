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
    <div>
      <input
        {...input}
        type="text"
        placeholder={placeholder}
        className="ba w-100 pa3 mb3 f5 mt2"
        style={{
          color: fontColor || Colors.inputFontColor,
          borderRadius: BorderRadius.all,
          borderColor: Colors.moonGray
        }}
        maxLength={maxLength}
      />
      {dirty &&
        error &&
        showError && (
          <div className="mb4 mt4">
            <RenderAlert error={{ message: error }} />
          </div>
        )}
    </div>
  );
};

const InputText = props => <InputUI component={renderTextInput} {...props} />;

export default InputText;
