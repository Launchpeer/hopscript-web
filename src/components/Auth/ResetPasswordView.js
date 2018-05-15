import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { AuthInput } from './';
import { Colors } from '../../config/styles';
import {
  Card,
  Button,
  RenderAlert,
  Loader,
  FullScreenCenter,
  CenterThis
} from '../common';
import { resetPassword, clearError } from './AuthActions';

const successBlock = () => (
  <div className="tc mt4">
    <div className="di">
      Your password has been reset. Log into your account
    </div>
    <div
      className="di brandPrimary ml1 pointer"
      onKeyPress={() => browserHistory.push('/')}
      onClick={() => browserHistory.push('/')}
      role="button"
    >
      here.
    </div>
  </div>
);

const returnToLogin = (
  <div className="tc">
    <div
      className="underline pointer dib"
      onClick={() => {
        browserHistory.push('/', { authType: 'signin' });
      }}
      role="button"
      style={{ color: Colors.brandPrimary }}
    >
      Return to Login
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
      <FullScreenCenter>
        <div className="w-100">
          <CenterThis>
            <div
              className="mw5 mb5 mt6 f2 b"
              style={{
                color: Colors.white
              }}
            >
              Swift Script
            </div>
          </CenterThis>
          <CenterThis>
            <Card
              classOverrides="mw6"
              boxShadow
              borderRadius="medium"
              bottomContent={returnToLogin}
              bottomColor="lightGray"
            >
              <div className="pa3">
                {loading ? (
                  <Loader />
                ) : (
                  <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <AuthInput
                      name="password"
                      type="password"
                      label="password"
                      placeholder="Password"
                    />
                    <Button
                      classOverrides="w-100"
                      backgroundColor={Colors.brandPurple}
                    >
                      Reset Password
                    </Button>
                    <RenderAlert error={error} />
                    {success && successBlock()}
                  </form>
                )}
              </div>
            </Card>
          </CenterThis>
        </div>
      </FullScreenCenter>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.password) {
    errors.password = '*required';
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
