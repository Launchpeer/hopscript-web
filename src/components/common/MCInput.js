import React, { Component } from 'react';
import { Field } from 'redux-form';
import { BorderRadius, Colors } from '../../config/styles';
import {
  Label,
  RenderAlert,
  PhotoUpload,
  GoogleAutocomplete,
  DatetimePicker
} from './';

const renderTextInput = (field) => {
  const {
    input,
    type,
    placeholder,
    fontColor,
    borderRadius,
    borderColor,
    maxLength,
    showError,
    meta: { dirty, touched, error }
  } = field;

  const fieldStateColor = () => {
    if (dirty) {
      return Colors.silver;
    } else if (borderColor) {
      return Colors[borderColor];
    } else if (touched) {
      return Colors.silver;
    }
    return Colors.silver;
  };

  return (
    <div>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="ba w-100 f5 pa2 mt2"
        style={{
          color: fontColor ? Colors[fontColor] : Colors.primaryGrey,
          borderRadius: borderRadius
            ? BorderRadius[borderRadius].all
            : BorderRadius['medium'].all,
          borderColor: fieldStateColor()
        }}
        maxLength={maxLength}
      />
      {dirty &&
        error &&
        showError && (
          <div className="mb4 mt4">
            <RenderAlert error={{ message: error }} />
          </div>
        )}
    </div>
  );
};

const renderTextAreaInput = (field) => {
  const {
    input,
    type,
    placeholder,
    fontColor,
    borderRadius,
    borderColor,
    maxLength,
    showError,
    meta: { dirty, touched, error }
  } = field;

  const fieldStateColor = () => {
    if (dirty) {
      return Colors.silver;
    } else if (borderColor) {
      return Colors[borderColor];
    } else if (touched) {
      return Colors.silver;
    }
    return Colors.silver;
  };

  return (
    <div>
      <textarea
        {...input}
        type={type}
        placeholder={placeholder}
        className="ba w-100 f5 pa2 mt2"
        rows="10"
        style={{
          color: fontColor ? Colors[fontColor] : Colors.primaryGrey,
          borderRadius: borderRadius
            ? BorderRadius[borderRadius].all
            : BorderRadius['medium'].all,
          borderColor: fieldStateColor()
        }}
      />
      {dirty &&
        error &&
        showError && (
          <div className="mb4 mt4">
            <RenderAlert error={{ message: error }} />
          </div>
        )}
    </div>
  );
};

const renderDropDown = (field) => {
  const {
    options,
    input,
    fontColor,
    borderRadius,
    borderColor,
    placeholder,
    meta: { touched, error }
  } = field;
  return (
    <div
      className="ba mt2 mb3 f5 pa2 relative flex items-center"
      style={{
        color: fontColor ? Colors[fontColor] : Colors.lightGrey,
        borderRadius: borderRadius
          ? BorderRadius[borderRadius].all
          : BorderRadius['medium'].all,
        borderColor: borderColor ? Colors[borderColor] : Colors.silver
      }}
    >
      <div className="absolute right-0 mr2">
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: `5px solid ${Colors.silver}`
          }}
        />
      </div>
      <select {...input} className="w-100 bn f5 bg-white input-reset">
        <option value="" hidden defaultValue disabled>
          {placeholder}
        </option>
        {options &&
          options.map(option => (
            <option value={option.id} key={option.id} className="f3 dark-gray">
              {option.attributes.city}, {option.attributes.state}
            </option>
          ))}
      </select>
      {touched && error && <div className="orange">{error}</div>}
    </div>
  );
};

// placeholder for dropdown:
// https://stackoverflow.com/questions/5805059/how-do-i-make-a-placeholder-for-a-select-box
// https://stackoverflow.com/questions/22822427/bootstrap-select-dropdown-list-placeholder

class MCInput extends Component {
  handleChange() {
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
      options,
      onChange,
      classOverrides,
      defaultSelected,
      borderColor,
      maxLength,
      showError,
      onDrop,
      dropClass,
      resetPhoto,
      pictureType,
      onDragOver,
      onDragLeave,
      editType,
      editText,
      displayText,
      normalize
    } = this.props;
    if (type === 'photo') {
      return (
        <div className="w-100 tc">
          <Field
            name={name || 'photo'}
            component={PhotoUpload}
            pictureType={pictureType}
            onChange={onDrop}
            resetPhoto={resetPhoto}
            dropClass={dropClass}
            editType={editType}
            editText={editText}
            displayText={displayText}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          />
          <Label className="tc mt5" name={name} label={label} />
        </div>
      );
    } else if (type === 'dropdown') {
      return (
        <div className="w-100 input-height">
          <div className="pa2">
            <Label name={name} label={label} />
            <Field
              name={name}
              component={renderDropDown}
              options={options}
              onChange={onChange}
              fontColor={fontColor}
              borderRadius={borderRadius}
              defaultSelected={defaultSelected}
              placeholder={placeholder}
            />
          </div>
        </div>
      );
    } else if (type === 'tel') {
      return (
        <div className={`w-100 input-height mb3 ${classOverrides}`}>
          <div className="pa2">
            <Label name={name} label={label} />
            <Field name={name} type={type} component={renderTelInput} />
          </div>
        </div>
      );
    } else if (type === 'address') {
      return (
        <div className={`w-100 input-height mb3 ${classOverrides}`}>
          <div className="pa2">
            <Label name={name} label={label} />
            <Field
              name={name}
              type="text"
              placeholder="Search Places"
              component={GoogleAutocomplete}
            />
          </div>
        </div>
      );
    } else if (type === 'datetime') {
      return (
        <div className={`w-100 input-height mb3 ${classOverrides}`}>
          <div className="pa2">
            <Label name={name} label={label} />
            <Field name={name} component={DatetimePicker} />
          </div>
        </div>
      );
    } else if (type === 'textarea') {
      return (
        <div className={` input-height mb3 w-100 ${classOverrides}`}>
          <div className="pa2">
            <Label name={name} label={label} />
            <Field
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              component={component || renderTextAreaInput}
              fontColor={fontColor}
              borderRadius={borderRadius}
              borderColor={borderColor}
              maxLength={maxLength}
              showError={showError}
              normalize={normalize}
            />
          </div>
        </div>
      );
    }
    return (
      <div className={` input-height mb3 w-100 ${classOverrides}`}>
        <div className="pa2">
          <Label name={name} label={label} />
          <Field
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            component={component || renderTextInput}
            fontColor={fontColor}
            borderRadius={borderRadius}
            borderColor={borderColor}
            maxLength={maxLength}
            showError={showError}
            normalize={normalize}
          />
        </div>
      </div>
    );
  }
}

export default MCInput;
