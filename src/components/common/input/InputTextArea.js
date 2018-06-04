import React from 'react';
import { Field } from 'redux-form';
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
      <textarea
        {...input}
        placeholder={placeholder}
        className="ba w-100 f5 pa2 mt2 input-reset outline-0"
        rows="10"
        style={{
          color: fontColor || Colors.inputFontColor,
          borderRadius: borderRadius || BorderRadius.all,
          borderColor: fieldStateColor()
        }}
      />
      {error && showError &&
        (
          <div className="mb4 mt4">
            <RenderAlert error={{ message: error }} />
          </div>
        )
      }
    </div>
  );
};

const InputTextArea = props => (
  <InputUI component={renderTextAreaInput} {...props} />
);

export default InputTextArea;
