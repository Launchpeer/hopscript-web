import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { AuthInput } from './';
import { Colors } from '../../config/styles';
import { Card, Button, RenderAlert, Loader, FullScreenCenter, CenterThis } from '../common';
import { resetPassword, clearError } from './AuthActions';

const successBlock = () => (
  <div className="tc mt4">
    <div className="di">
      Your password has been reset. Log into your account
    </div>
    <div className="di brandPrimary ml1 pointer"
      onKeyPress={() => browserHistory.push('/')}
      onClick={() => browserHistory.push('/')}
      role="button">
      here.
    </div>
  </div>
);

class ResetPasswordView extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ password }) {
    this.props.resetPassword(password, this.props.location.query.username);
  }

  componentDidMount() {
    this.props.clearError();
  }

  render() {
    const {
      handleSubmit, error, loading, success
    } = this.props;
    return (
      <FullScreenCenter color={Colors.brandPrimary}>
        <div className="w-100">
          <CenterThis>
            <div className="mw5 mb5 mt6">
              <img src="/images/stubbin_big_logo.png" alt="stubbin-logo" />
            </div>
          </CenterThis>
          <CenterThis>
            <Card classOverrides="mw6" boxShadow borderRadius="medium" bottomColor="nearWhite">
              <div>
                {loading ?
                  <Loader /> :
                  <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <AuthInput
                      name="password"
                      type="password"
                      label="password"
                      placeholder="Password"
                    />
                    <Button classOverrides="w-100">Reset Password</Button>
                    <RenderAlert error={error} />
                    {success && successBlock()}
                  </form>
              }
              </div>
            </Card>
          </CenterThis>
          <CenterThis>
            <div className="underline pointer mt4 p5 white" role="button" onClick={() => browserHistory.push('/')} onKeyPress={() => browserHistory.push('/')}>Return to login</div>
          </CenterThis>
        </div>
      </FullScreenCenter>
    );
  }
}

function validate(values) {
  const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  const errors = {};
  if (!values.password) {
    errors.password = '*required';
  }
  if (!passwordRegex.test(values.password)) {
    errors.password = 'Password must contain a minimum of eight characters, one uppercase letter, one lowercase letter, one digit and one special character';
  }
  return errors;
}

const mapStateToProps = ({ AuthReducer }) => {
  const { error, loading, success } = AuthReducer;
  return {
    error,
    loading,
    success
  };
};

export default reduxForm({
  form: 'reset',
  validate
})(connect(mapStateToProps, {
  resetPassword,
  clearError
})(ResetPasswordView));
