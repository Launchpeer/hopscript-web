/**
 * The purpose of this file is provide a ReduxForm component that allows an Agent to manually add a Lead.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Parse from 'parse';
import { Colors } from '../../config/styles';
import {
  InputText,
  InputDropDown,
  Button,
  LoaderOrThis,
  RenderAlert
} from '../common';

import { createLead, clearError } from './LeadsAddActions';

class LeadsAddForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  handleFormSubmit(data) {
    this.props.createLead(data);
  }

  clearError() {
    if (this.props.error) {
      this.props.clearError();
    }
  }

  render() {
    const {
      user, handleSubmit, valid, loading, error, dirty
    } = this.props;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <h1>New Lead</h1>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
            onClick={this.clearError}
          >
            <InputText
              name="name"
              type="text"
              placeholder="Full Name"
              borderColor="white"
            />
            <InputText
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              borderColor="white"
            />
            <InputDropDown
              name="leadType"
              type="dropdown"
              label="Type of Lead"
              placeholder="Type of Lead"
              options={['Lead Type 1', 'Lead Type 2', 'Lead Type 3']}
              borderColor="white"
              borderRadius="none"
            />
            <InputDropDown
              name="leadGroup"
              type="dropdown"
              label="Lead Group"
              placeholder="Lead Group"
              options={['Lead Group 1', 'Lead Group 2', 'Lead Group 3']}
              borderColor="white"
              borderRadius="none"
            />

            {valid && (
              <Button backgroundColor={Colors.brandPrimary}>Invite</Button>
            )}
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
  if (
    !values.name ||
    !values.phoneNumber ||
    !values.leadType ||
    !values.leadGroup
  ) {
    errors._error = 'All fields required';
  }

  return errors;
}

export default reduxForm({
  form: 'addLead',
  validate
})(connect(mapStateToProps, {
  createLead,
  clearError
})(LeadsAddForm));
