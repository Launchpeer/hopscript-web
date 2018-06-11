import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Colors } from '../../../config/styles';
import { Label } from '../';

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

    <div
      className="ba w-100 f5 pa2 mt2 bn"
      style={{
        color: fontColor ? Colors[fontColor] : Colors.primaryGrey
      }}
    >
      {cash && '$ '}
      {placeholder}
    </div>
    {!noEdit && (
      <div
        className="pointer"
        style={{
          color: Colors.stripe
        }}
        role="button"
        onClick={onClick}
      >
        Edit
      </div>
    )}
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
    normalize,
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
        borderBottom: borderColor ? `1px solid ${borderColor}` : Colors.moonGray
      }}
    >
      <input
        {...input}
        type={type}
        placeholder={placeholderCashCheck()}
        className="ba w-100 f5 pa2 mt2 bn"
        style={{
          color: fontColor ? Colors[fontColor] : Colors.black
        }}
        normalize={normalize}
      />
      <div
        className="pointer"
        style={{
          color: Colors.stripe
        }}
        role="button"
        onClick={onClick}
      >
        Save
      </div>
    </div>
  );
};

class InputTextEditable extends Component {
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
      normalize,
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
              normalize={normalize}
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

export default InputTextEditable;
