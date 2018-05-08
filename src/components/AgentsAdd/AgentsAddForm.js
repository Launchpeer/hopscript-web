/**
 * The purpose of this file is provide a ReduxForm component that allows a Brokerage to create and invite an Agent to their Brokerage.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Parse from 'parse';
import { Colors } from '../../config/styles';
import { InputText, Button, LoaderOrThis, RenderAlert } from '../common';

import { inviteAgent, clearError } from './AgentsAddActions';

class AgentsAddForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  handleFormSubmit(data) {
    this.props.inviteAgent(data);
  }

  clearError() {
    if(this.props.error) {
      this.props.clearError();
    }
  }

  render() {
    const { user, handleSubmit, valid, loading, error, dirty } = this.props;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <h1>New Agent</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit)} onClick={this.clearError}>
            <InputText
              name="name"
              type="text"
              placeholder="Full Name"
              borderColor="white"
            />
            <InputText
              name="email"
              type="text"
              placeholder="Email"
              borderColor="white"
            />
          {valid && <Button backgroundColor={Colors.brandPrimary}>Invite</Button>}
          {error && <RenderAlert error={error} />}
          </form>
        </LoaderOrThis>
      </div>
    );
  }
}

const mapStateToProps = ({ AgentsAddReducer }) => {
  const { error, loading } = AgentsAddReducer;
  return {
    loading,
    error
  };
};

function validate(values) {
  const errors = {};
  if (!values.name || !values.email) {
    errors._error = 'All fields required';
  }

  return errors;
}

export default reduxForm({
  form: 'inviteAgent',
  validate
})(connect(mapStateToProps, {
  inviteAgent,
  clearError
})(AgentsAddForm));
