/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to manually add a Lead.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../config/styles';
import {
  InputText,
  InputDropDown,
  Button,
  LoaderOrThis,
  RenderAlert
} from '../common';
import { createLeadGroup, clearError } from './CallActions';

class CallForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  handleFormSubmit(data) {
    this.props.createLeadGroup(data);
  }

  clearError() {
    if (this.props.error) {
      this.props.clearError();
    }
  }

  render() {
    const {
      handleSubmit, valid, loading, error
    } = this.props;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <h1>New Call</h1>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
            onClick={this.clearError} >
            <InputText
              name="groupName"
              label="Group Name"
              type="text"
              placeholder="Group Name"
              borderColor="black" />
            {valid &&
              <Button backgroundColor={Colors.brandPrimary}>
                Add Lead Group
              </Button>
            }
            {error && <RenderAlert error={error} />}
          </form>
        </LoaderOrThis>
      </div>
    );
  }
}

const mapStateToProps = ({ LeadsAddReducer }) => {
  const { error, loading } = LeadsAddReducer;
  return {
    loading,
    error
  };
};

function validate(values) {
  const errors = {};
  if (!values.groupName) {
    errors._error = 'All fields required';
  }

  return errors;
}

export default reduxForm({
  form: 'createCall',
  validate
})(connect(mapStateToProps, {
  createLeadGroup,
  clearError
})(CallForm));
