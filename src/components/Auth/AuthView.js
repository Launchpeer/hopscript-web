import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Card, CenterThis, FullScreenCenter } from '../common';
import { Colors, BorderRadius } from '../../config/styles';
import { SignInForm, BrokerageSignUpForm } from './';
import { clearError } from './AuthActions';

const SignIn = (
  <div className="tc">
    <div className="dib pr1" style={{ color: Colors.gray }}>
      Already have an account?
    </div>

    <div
      className="underline pointer dib"
      onClick={() => {
        browserHistory.push('/', { authType: 'signin' });
      }}
      role="button"
      style={{ color: Colors.brandPrimary }}
    >
      Sign in
    </div>
  </div>
);

const SignUp = (
  <div className="tc">
    <div className="dib pr1" style={{ color: Colors.gray }}>
      Don't have an account?
    </div>

    <div
      className="underline pointer dib"
      onClick={() => {
        browserHistory.push('/signup');
      }}
      role="button"
      style={{ color: Colors.brandPrimary }}
    >
      Sign Up
    </div>
  </div>
);

class AuthView extends Component {
  componentDidMount() {
    this.props.clearError();
  }

  render() {
    return (
      <FullScreenCenter color={Colors.brandPrimary}>
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
            {this.props.route.authType === 'signin' ? (
              <div>
                <Card
                  classOverrides="mw6 mb4 bg-white"
                  boxShadow
                  bottomContent={SignUp}
                  bottomColor="lightGray"
                >
                  <SignInForm />
                </Card>
                <CenterThis>
                  <div
                    className="underline pointer dib p5 mb7"
                    style={{
                      color: Colors.white
                    }}
                    role="button"
                    onClick={() => browserHistory.push('/forgot-password')}
                    onKeyPress={() => browserHistory.push('/forgot-password')}
                  >
                    Forgot your password?
                  </div>
                </CenterThis>
              </div>
            ) : (
              <Card
                classOverrides="mw6 mb5 bg-white"
                boxShadow
                bottomContent={SignIn}
                bottomColor="lightGray"
              >
                <BrokerageSignUpForm />
              </Card>
            )}
          </CenterThis>
        </div>
      </FullScreenCenter>
    );
  }
}

export default connect(null, { clearError })(AuthView);
