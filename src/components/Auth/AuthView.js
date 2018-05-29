import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Card, CenterThis, FullScreenCenter, HeadphonesIcon } from '../common';
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
    <div
      className="underline pointer dib f3"
      onClick={() => {
        browserHistory.push('/signup');
      }}
      role="button"
      style={{ color: Colors.brandPrimary }}
    >
      New to Breeze Bot? Sign Up
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
            <div className="mt6 tc">
              <HeadphonesIcon width="20%" fill="white" />
            </div>
          </CenterThis>
          <CenterThis>
            <div
              className="mw5 mb5 f1"
              style={{
                color: Colors.white
              }}
            >
              BreezeBot
            </div>
          </CenterThis>
          <CenterThis>
            {this.props.route.authType === 'signin' ? (
              <div className="w-40-l mw6">
                <Card
                  classOverrides="mb4 bg-white"
                  boxShadow
                  bottomContent={SignUp}
                  bottomColor="lightGray"
                >
                  <SignInForm />
                </Card>
                <CenterThis>
                  <div
                    className="underline pointer dib p5 mb7 f3 "
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
                classOverrides="mb5 bg-white"
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
