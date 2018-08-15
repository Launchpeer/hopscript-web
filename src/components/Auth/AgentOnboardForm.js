import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { AuthInput } from './';
import { resetPassword } from './AuthActions';
import { Button, RenderAlert, LoaderOrThis } from '../common';
import { Colors } from '../../config/styles';

const successBlock = () => (
  <div className="tc">
    <div className="di">
      Your password has been reset. <br />Log into your account
    </div>
    <div
      className="di brand-primary ml1 pointer b"
      onClick={() => browserHistory.push('/')}
      role="button" >
      here.
    </div>
  </div>
);

class AgentOnboardForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.openPdf = this.openPdf.bind(this);
  }


  handleFormSubmit({ password }) {
    this.props.resetPassword(password, this.props.user.attributes.username);
  }

  openPdf() {
    window.open('./terms.pdf', '_blank', 'fullscreen=yes');
  }


  render() {
    const {
      handleSubmit, error, loading, user, success
    } = this.props;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          {success ? successBlock() :
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className="tc">
              <div className="b">Welcome, {user.attributes.name}. </div>
              <div className="pb3">Please enter a new password to log in.</div>
            </div>
            <AuthInput
              name="password"
              type="password"
              label="password"
              placeholder="New Password" />
            <div className="tc center w-100 mb4 moonGray">
                * By clicking Set Password, you agree to our
              <div className="brand-primary pointer w-100"
                role="button"
                onKeyPress={this.openPdf}
                onClick={this.openPdf}>
                  Terms of Service, Privacy Policy, and End User Agreement
              </div>
            </div>
            <Button classOverrides="w-100" backgroundColor={Colors.brandPrimary}>
              Set Password
            </Button>
            <RenderAlert error={error} />
            {success && successBlock()}
          </form>
          }

        </LoaderOrThis>
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
  const {
    error, authenticated, loading, success
  } = AuthReducer;
  const { user } = UserReducer;
  return {
    error,
    authenticated,
    loading,
    user,
    success
  };
};

export default reduxForm({ form: 'onboard', validate })(connect(mapStateToProps, {
  resetPassword
})(AgentOnboardForm));
