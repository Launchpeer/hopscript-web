import React from 'react';
import { Field } from 'redux-form';
import Label from './Label';


const InputUI = (props) => {
  const {
    name, label, classOverrides, component, normalize
  } = props;
  return (
    <div className={`${classOverrides}`}>
      <Label name={name} label={label} />
      <Field component={component} {...props} normalize={normalize} />
    </div>
  );
};

export default InputUI;
