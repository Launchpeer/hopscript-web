import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Card, CenterThis, FullScreenContainer, HeadphonesIcon } from '../common';
import { Colors, BorderRadius } from '../../config/styles';
import { SignInForm, BrokerageSignUpForm } from './';
import { clearError } from './AuthActions';

const SignIn = (
  <div className="tc">
    <div className="dib pr3" style={{ color: Colors.white }}>
      Already have an account?
    </div>

    <div
      className=" pointer dib pa2"
      onClick={() => {
        browserHistory.push('/', { authType: 'signin' });
      }}
      role="button"

      style={{ color: Colors.brandPrimary, backgroundColor: Colors.white, borderRadius: '4px' }}
    >
      Log In
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


/*
<div className="w-100 flex items-end">
  <SignIn />
</div>
*/

class AuthView extends Component {
  componentDidMount() {
    this.props.clearError();
  }

  render() {
    return (
      <FullScreenContainer color={Colors.brandPrimary}>
        <div className="fr pa4">
          { this.props.route.authType === 'signin' ? null : SignIn }
        </div>

        <div className="w-100">
          <CenterThis>
            <div className="mt5 tc">
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
              <div className="w-40-l mw6">
                <Card
                  classOverrides="mb5 bg-white"
                  boxShadow
              >
                  <BrokerageSignUpForm />
                </Card>
              </div>
            )}
          </CenterThis>
        </div>
      </FullScreenContainer>

    );
  }
}

export default connect(null, { clearError })(AuthView);
