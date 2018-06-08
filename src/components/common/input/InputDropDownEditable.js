import React, { Component } from 'react';
import { BorderRadius, Colors } from '../../../config/styles';
import InputUI from './InputUI';

const renderEditableDropDown = (fieldProps) => {
  const {
    options,
    input,
    fontColor,
    borderRadius,
    borderColor,
    placeholder,
    onClick,
    meta: { touched, error, }
  } = fieldProps;
  return (
    <div className="flex flex-row justify-between">
      <div
        className="w-100 ba mt2 mb2 f5 pa3 relative flex items-center bg-white"
        style={{
        color: fontColor || Colors.inputFontColor,
        borderRadius: borderRadius || BorderRadius.all,
        borderColor: borderColor || Colors.inputBorderColor
      }}
        role="button"
        onClick={onClick}
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
        <select {...input} className="bn w-100 f5 bg-white input-reset">
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
      </div>
      {touched && error && <div className="orange">{error}</div>}
    </div>
  );
};


class InputDropDownEditable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }
  handleClick() {
    this.setState({});
  }

  render() {
    const { onSubmit } = this.props;
    return (
      this.state.edit ?
        <div className="w-100 flex flex-row">
          <div className="w-100">
            <InputUI
              component={renderEditableDropDown}
              {...this.props}
             />
          </div>
          <div
            className="pointer fr flex items-center pl2 stripe"
            role="button"
            onClick={() => { onSubmit(); this.setState({ edit: !this.state.edit }); }} >
                Save
          </div>
        </div>
        :
        <InputUI component={renderEditableDropDown}
          {...this.props}
          onClick={() => {
            this.setState({ edit: !this.state.edit });
          }} />
    );
  }
}


export default InputDropDownEditable;
