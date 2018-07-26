import React from 'react';
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
    meta: { touched, error }
  } = fieldProps;
  return (
    <div>
      <div
        className="ba mt2 mb2 f5 pa3 relative flex items-center bg-white"
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
              className="f5 dark-gray"
            >
              {option.display || option}
            </option>
          ))}
        </select>
      </div>
      {touched && error && <div className="orange">{error}</div>}
    </div>
  );
};

const InputDropDown = props => <InputUI component={renderDropDown} {...props} />;

export default InputDropDown;
