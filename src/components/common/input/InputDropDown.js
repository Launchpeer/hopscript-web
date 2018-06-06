import React, { Component } from 'react';
import { Field } from 'redux-form';
import { BorderRadius, Colors } from '../../../config/styles';
import InputUI from './InputUI';

const renderDropDown = (fieldProps) => {
  const {
    options,
    input,
    fontColor,
    borderRadius,
    borderColor,
    placeholder,
    display,
    meta: { touched, error }
  } = fieldProps;
  return (
    <div
      className="ba mt2 mb3 f5 pa2 relative flex items-center bg-white"
      style={{
        color: fontColor || Colors.inputFontColor,
        borderRadius: borderRadius || BorderRadius.all,
        borderColor: borderColor || Colors.inputBorderColor
      }}
    >
      <div className="absolute right-0 mr2">
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: `5px solid ${Colors.inputBorderColor}`
          }}
        />
      </div>
      <select {...input} className="w-100 bn f5 bg-white input-reset">
        <option value="" hidden defaultValue disabled>
          {placeholder}
        </option>
        {options &&
          options.map(option => (
            <option
              value={option.value || option}
              key={option.id || option}
              className="f3 dark-gray"
            >
              {option.display || option}
            </option>
          ))}
      </select>
      {touched && error && <div className="orange">{error}</div>}
    </div>
  );
};

const InputDropDown = props => <InputUI component={renderDropDown} {...props} />;

export default InputDropDown;
