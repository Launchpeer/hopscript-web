import { connect } from 'react-redux';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { AuthInput } from './';

import { resetPassword } from './AuthActions';
import { fetchUser } from '../UserActions';

// components
import { Button, RenderAlert, Loader } from '../common';

import { Colors } from '../../config/styles';

class AgentOnboardForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.openPdf = this.openPdf.bind(this);
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  handleFormSubmit({ password }) {
    this.props.resetPassword(password, this.props.user.username);
  }

  openPdf() {
    window.open('./terms_pdf_example.pdf', '_blank', 'fullscreen=yes');
  }


  render() {
    const {
      handleSubmit, error, loading, user
    } = this.props;
    return (
      <div>
        {loading ? <Loader /> :
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>`Welcome, ${user.name}. Please enter a new password to log in.`</div>
          <AuthInput
            name="password"
            type="password"
            label="password"
            placeholder="Password" />
          <div className="tc center w-100 mb4 moonGray">
              * By clicking Create Account, you agree to our
            <div className="brand-primary pointer w-100"
              role="button"
              onKeyPress={this.openPdf}
              onClick={this.openPdf}>
                Terms of Service, Privacy Policy, and End User Agreement
            </div>
          </div>
          <Button classOverrides="w-100" backgroundColor={Colors.brandPrimary}>
            Create Account
          </Button>
          <RenderAlert error={error} />
        </form>
        }
      </div>
    );
  }
}

function validate(values) {
  const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
  const errors = {};
  if (!values.password) {
    errors.password = '*required';
  }
  if (!passwordRegex.test(values.password)) {
    errors.password =
      'Password must contain a minimum of eight characters, one uppercase letter, one lowercase letter, one digit and one special character';
  }

  return errors;
}

const mapStateToProps = ({ AuthReducer, UserReducer }) => {
  const { error, authenticated, loading } = AuthReducer;
  const { user } = UserReducer;
  return {
    error,
    authenticated,
    loading,
    user
  };
};

export default reduxForm({ form: 'onboard', validate })(connect(mapStateToProps, {
  fetchUser,
  resetPassword
})(AgentOnboardForm));
