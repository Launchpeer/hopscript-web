import { connect } from 'react-redux';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { AuthInput } from './';

import { signUpUser } from './AuthActions';

// components
import { Button, RenderAlert, Loader } from '../common';
import { InputText } from '../common';

import { Colors } from '../../config/styles';

class BrokerageSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ username, email, password }) {
    this.props.signUpUser(username, email, password);
  }

  render() {
    const { handleSubmit, error, loading } = this.props;
    return (
      <div>
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <AuthInput
              name="username"
              type="text"
              label="username"
              placeholder="Brokerage Name"
              />
            <AuthInput
              name="email"
              type="email"
              label="email address"
              placeholder="Email Address"
            />
            <AuthInput
              name="password"
              type="password"
              label="password"
              placeholder="Password"
            />
            <Button classOverrides="w-100" backgroundColor={Colors.brandGreen}>
              Create Account
            </Button>
            <RenderAlert error={error} />
          </form>
        )}
      </div>
    );
  }
}

function validate(values) {
  const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
  const errors = {};
  if (!values.username) {
    errors.username = '*required';
  }
  if (!values.email) {
    errors.email = '*required';
  }
  if (!values.password) {
    errors.password = '*required';
  }
  if (!passwordRegex.test(values.password)) {
    errors.password =
      'Password must contain a minimum of eight characters, one uppercase letter, one lowercase letter, one digit and one special character';
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

export default reduxForm({ form: 'signup', validate })(connect(mapStateToProps, {
  signUpUser
})(BrokerageSignUpForm));
