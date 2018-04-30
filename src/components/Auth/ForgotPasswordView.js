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
  RenderSuccess,
  Loader,
  FullScreenCenter,
  CenterThis
} from '../common';
import { sendForgotPasswordEmail } from './AuthActions';

class ForgotPasswordView extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ username }) {
    this.props.sendForgotPasswordEmail(username);
  }

  render() {
    const {
      handleSubmit, error, success, loading
    } = this.props;
    return (
      <FullScreenCenter>
        <div className="w-100">
          <CenterThis>
            <div
              className="mw5 mb5 mt6 f-5 b"
              style={{
                color: Colors.brandPrimary,
                width: 200,
                height: 86,
                size: 72
              }}
            >
              LGND
            </div>
          </CenterThis>
          <CenterThis>
            <Card
              classOverrides="mw6"
              boxShadow
              borderRadius="medium"
              bottomColor="nearWhite"
            >
              <div>
                {loading && <Loader />}
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                  <AuthInput
                    name="username"
                    type="text"
                    label="email address"
                    placeholder="Email Address"
                  />
                  <Button
                    classOverrides="w-100"
                    backgroundColor={Colors.brandSecondary}
                  >
                    Reset Password
                  </Button>
                  <RenderAlert error={error} />
                  {RenderSuccess(success)}
                </form>
              </div>
            </Card>
          </CenterThis>
          <CenterThis>
            <div
              className="underline pointer mt4 p5 white"
              style={{
                color: Colors.brandPrimary
              }}
              role="button"
              onClick={() => browserHistory.push('/')}
              onKeyPress={() => browserHistory.push('/')}
            >
              Return to login
            </div>
          </CenterThis>
        </div>
      </FullScreenCenter>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = '*required';
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
  form: 'forgot',
  validate
})(connect(mapStateToProps, {
  sendForgotPasswordEmail
})(ForgotPasswordView));
