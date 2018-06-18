import React from 'react';
import { BorderRadius, Colors } from '../../../config/styles';
import InputUI from './InputUI';

const renderSearchInput = (fieldProps) => {
  const {
    input,
    height,
    placeholder,
    fontColor,
    borderColor,
    maxLength,
    normalize,
    backgroundColor,
    classOverrides
  } = fieldProps;

  return (
    <div classOverrides={`${classOverrides}`}>
      <input
        {...input}
        type="text"
        placeholder={placeholder}
        className={`${borderColor ? 'ba' : 'bn'} w-100 pa3`}
        style={{
          color: fontColor || Colors.inputFontColor,
          borderRadius: BorderRadius.all,
          borderColor: borderColor || Colors.moonGray,
          borderStyle: 'solid',
          borderWidth: '1px',
          height,
          backgroundColor
        }}
        maxLength={maxLength}
        normalize={normalize}
      />
    </div>
  );
};

const InputSearch = props => <InputUI component={renderSearchInput} {...props} />;

export default InputSearch;
