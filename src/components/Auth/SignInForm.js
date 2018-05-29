import { connect } from 'react-redux';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { AuthInput } from './';
import { signInUser, clearError } from './AuthActions';
import { Button, RenderAlert, Loader } from '../common';
import { Colors, BorderRadius } from '../../config/styles';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ email, password }) {
    this.props.signInUser(email, password);
  }

  render() {
    const { handleSubmit, error, loading } = this.props;
    return (
      <div>
        {loading && <Loader />}
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <AuthInput
            name="email"
            type="text"
            label="email address"
            placeholder="Email address"
          />
          <AuthInput
            name="password"
            type="password"
            label="password"
            placeholder="Password"
          />
          <Button classOverrides="w-100" backgroundColor={Colors.brandGreen}>
            Log In
          </Button>
          <RenderAlert error={error} />
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = '*required';
  }
  if (!values.password) {
    errors.password = '*required';
  }

  return errors;
}

const mapStateToProps = ({ AuthReducer }) => {
  const { error, authenticated, loading } = AuthReducer;
  return {
    error,
    authenticated,
    loading
  };
};

export default reduxForm({
  form: 'signin',
  validate
})(connect(mapStateToProps, {
  signInUser,
  clearError
})(SignInForm));
