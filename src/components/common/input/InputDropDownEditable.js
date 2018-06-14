import React, { Component } from 'react';
import { BorderRadius, Colors } from '../../../config/styles';
import InputUI from './InputUI';

const RenderInfoDisplay = ({
  placeholder,
  fontColor,
  onClick,
  noEdit,
  editButtonName
}) => (
  <div
    className="flex items-center justify-between"
  >
    {placeholder &&
      <div
        className="ba w-100 f5 pa2 mv2 bn flex items-center"
        style={{
        color: fontColor ? Colors[fontColor] : Colors.primaryGrey
      }}
    >
        {placeholder}
      </div> }
    {!noEdit && (
      <div
        className="pointer"
        style={{
          color: Colors.stripe
        }}
        role="button"
        onClick={onClick}
      >
        {editButtonName || "Edit"}
      </div>
    )}
  </div>
);


const renderEditableDropDown = (fieldProps) => {
  const {
    options,
    input,
    fontColor,
    borderRadius,
    borderColor,
    placeholder,
    onClick,
    saveButtonName,
    meta: { touched, error, }
  } = fieldProps;
  return (
    <div className="flex flex-row justify-between">
      <div
        className="w-100 ba mv2 f5 pa3 relative flex items-center bg-white"
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
      <div
        className="pointer fr flex items-center pl2 stripe"
        role="button"
        onClick={onClick} >
        {saveButtonName || "Save"}
      </div>
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
    const {
      onSubmit, placeholder, fontColor, noEdit, editButtonName, saveButtonName
    } = this.props;
    return (
      this.state.edit ?
        <div className="w-100 flex flex-row">
          <div className="w-100">
            <InputUI
              component={renderEditableDropDown}
              saveButtonName={saveButtonName}
              onClick={() => { onSubmit(); this.setState({ edit: !this.state.edit }); }}
              {...this.props}
             />
          </div>
        </div>
        :
        <RenderInfoDisplay
          placeholder={placeholder}
          fontColor={fontColor}
          noEdit={noEdit}
          onClick={() => this.setState({ edit: !this.state.edit })}
          editButtonName={editButtonName}
        />
    );
  }
}


export default InputDropDownEditable;
