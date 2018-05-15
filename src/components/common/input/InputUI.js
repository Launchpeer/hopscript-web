import React from 'react';
import Label from './Label';
import { Field } from 'redux-form';

const InputUI = (props) => {
  const {
    name, label, classOverrides, component, normalize
  } = props;
  return (
    <div className={`w-100 input-height ${classOverrides}`}>
      <Label name={name} label={label} />
      <Field component={component} {...props} normalize={normalize} />
    </div>
  );
};

export default InputUI;
