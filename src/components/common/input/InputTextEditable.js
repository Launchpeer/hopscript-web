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
  noEdit,
  editOrThis,
  fontSize
}) => (
  <div
    className="flex items-center justify-between"
    style={{
      borderBottom: `1px solid ${borderColor}`
    }}
  >

    <div
      className={`ba w-100 pa2 mt2 bn ${fontSize} `}
      style={{
        color: fontColor ? Colors[fontColor] : Colors.primaryGrey,
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
        {editOrThis || "Edit"}
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
    cash,
    fontSize
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
        className={`ba w-100 pa2 mt2 bn ${fontSize}`}
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
      noEdit,
      editOrThis,
      fontSize,
      disabled
    } = this.props;
    return (
      <div className={`w-100 input-height ${classOverrides}`}>
        <div>
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
              fontSize={fontSize}
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
              editOrThis={editOrThis}
              fontSize={fontSize}
              onClick={() => this.setState({ edit: !this.state.edit })}
            />
          )}
        </div>
      </div>
    );
  }
}

export default InputTextEditable;
