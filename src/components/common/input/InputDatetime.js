import React, { Component } from 'react';
import { Field } from 'redux-form';
import Datetime from 'react-datetime';
import { BorderRadius, Colors } from '../../../config/styles';
import InputUI from './InputUI';

const valid = (current) => {
  const yesterday = Datetime.moment().subtract(1, 'day');
  return current.isAfter(yesterday);
};

const renderDatetimePicker = (fieldProps) => {
  const {
    name,
    input,
    editInput,
    borderColor,
    onClick,
  } = fieldProps;
  if (editInput) {
    return (
      <div className="flex items-center justify-between"
        style={{
          borderBottom: `1px solid ${borderColor}`
        }}
        >
        <Datetime
          name={name}
          dateFormat="MM/DD/YYYY"
          timeFormat="hh:mm A"
          onChange={(param) => {
              input.onChange(param);
            }}
          isValidDate={valid}
          inputProps={{
            className: "ba w-100 f5 pa2 mt2 bn"
          }}
        />
        <div className="pointer"
          style={{
            color: Colors.brandPrimary
          }}
          onClick={onClick}
          onKeyPress={onClick}
          role="button"
              >Save
        </div>
      </div>
    );
  }
  return (
    <Datetime
      name={input.name}
      dateFormat="MM/DD/YYYY"
      timeFormat="hh:mm A"
      onChange={(param) => {
          input.onChange(param);
        }}
      isValidDate={valid}
      inputProps={{
        className: "ba w-100 f5 pa2 mt2 pointer",
        style: {
          borderRadius: BorderRadius.medium.all,
          borderColor: Colors.inputBorderColor
        }
      }}
    />
  );
};

const InputDateTime = props => (
  <InputUI component={renderDatetimePicker} {...props} />
);

export default InputDateTime;
