import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Edit3, Save } from 'react-feather';
import { Colors } from '../../config/styles';
import { Label } from './';

const RenderInfoDisplay = ({
  placeholder,
  borderColor,
  fontColor,
  onClick,
  cash,
  noEdit
}) => (
  <div
    className="flex items-center justify-between"
    style={{
      borderBottom: `1px solid ${borderColor}`
    }}
  >
    {!noEdit && (
      <div
        className="pointer"
        style={{
          color: Colors.moonGray
        }}
        role="button"
        onClick={onClick}
      >
        <Edit3 className="pa3" />
      </div>
    )}
    <div
      className="ba w-100 f5 pa2 mt2 bn"
      style={{
        color: fontColor ? Colors[fontColor] : Colors.primaryGrey
      }}
    >
      {cash && '$ '}
      {placeholder}
    </div>
  </div>
);

const renderTextInput = (field) => {
  const {
    input,
    type,
    placeholder,
    fontColor,
    borderColor,
    onClick,
    cash
  } = field;
  const placeholderCashCheck = () => {
    if (cash) {
      return `$ ${placeholder}`;
    }
    return placeholder;
  };
  return (
    <div
      className="flex items-center justify-between"
      style={{
        borderBottom: `1px solid ${borderColor}`
      }}
    >
      <div
        className="pointer"
        style={{
          color: Colors.brandPrimary
        }}
        onClick={onClick}
        onKeyPress={onClick}
        role="button"
      >
        <Save className="pa3" />
      </div>
      <input
        {...input}
        type={type}
        placeholder={placeholderCashCheck()}
        className="ba w-100 f5 pa2 mt2 bn"
        style={{
          color: fontColor ? Colors[fontColor] : Colors.primaryGrey
        }}
      />
    </div>
  );
};

class EditInput extends Component {
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
      name,
      type,
      placeholder,
      component,
      label,
      fontColor,
      borderRadius,
      classOverrides,
      borderColor,
      onSubmit,
      cash,
      noEdit
    } = this.props;
    return (
      <div className={`w-100 input-height mb3 ${classOverrides}`}>
        <div className="pa2">
          <Label name={name} label={label} />
          {this.state.edit ? (
            <Field
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              component={component || renderTextInput}
              fontColor={fontColor}
              borderRadius={borderRadius}
              borderColor={borderColor}
              editInput
              cash={cash}
              onClick={() => {
                onSubmit();
                this.setState({ edit: !this.state.edit });
              }}
            />
          ) : (
            <RenderInfoDisplay
              placeholder={placeholder}
              borderColor={borderColor}
              fontColor={fontColor}
              cash={cash}
              noEdit={noEdit}
              onClick={() => this.setState({ edit: !this.state.edit })}
            />
          )}
        </div>
      </div>
    );
  }
}

export default EditInput;
