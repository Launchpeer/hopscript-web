import React from 'react';
import { Field } from 'redux-form';
import { Colors } from '../../../config/styles';
import InputUI from './InputUI';

const renderMultiSelect = (field) => {
  const {
    options,
    input,
    onClick
  } = field;
  return (
    <div>
      {options &&
        options.map(option => (
          <button
            {...input}
            style={{
              backgroundColor:
                input.value === option
                  ? Colors.multiSelectActive
                  : Colors.multiSelectInactive,
              color:
                input.value === option
                  ? Colors.multiSelectFontColorActive
                  : Colors.multiSelectFontColorInactive
            }}
            type="button"
            key={option}
            onClick={() => { onClick(option); }}
          >
            {option}
          </button>
        ))}
    </div>
  );
};

const InputMultiSelect = props => (
  <InputUI component={renderMultiSelect} {...props} />
);

export default InputMultiSelect;
