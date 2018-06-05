/**
 * The purpose of this file is provide a ReduxForm component that allows a Brokerage to create and invite an Agent to their Brokerage.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
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
    this.props.inviteAgent(data)
      .then(() => {
        this.props.cancel();
      });
  }

  clearError() {
    if (this.props.error) {
      this.props.clearError();
    }
  }

  render() {
    const {
      valid, loading, error, cancel
    } = this.props;
    return (
      <div className="bg-brand-primary w-100" >
        <LoaderOrThis loading={loading}>
          <form onSubmit={handleSubmit(this.handleFormSubmit)} onClick={this.clearError}>
            <div className="flex pa3 items-center justify-between">
              <InputText
                name="name"
                type="text"
                placeholder="Add Agent Name"
                fontColor="white"
                backgroundColor="transparent"
                classOverrides="w-30 white-placeholder"
              />
              <InputText
                name="email"
                type="text"
                placeholder="Add Agent Email"
                fontColor="white"
                backgroundColor="transparent"
                classOverrides="w-30 white-placeholder"
              />
              <div>
                {valid && <Button borderColor="white" borderWidth="1px" backgroundColor="white" fontColor={Colors.brandPrimary} buttonPadding="pa2 pl3 pr3" classOverrides="f6 mr2 b">Invite Agent</Button>}
                <Button borderColor="white" borderWidth="1px" fontColor="white" backgroundColor="transparent" onClick={cancel} buttonPadding="pa2 pl3 pr3" classOverrides="f6">cancel</Button>
              </div>
            </div>
            {error &&
              <div className="pa2">
                <RenderAlert error={error} />
              </div>
            }
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
