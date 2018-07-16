import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Card, CenterThis, FullScreenContainer } from '../common';
import { Colors } from '../../config/styles';
import { SignInForm, BrokerageSignUpForm } from './';
import { clearError, clearUser } from './AuthActions';

const SignIn = (
  <div className="tc absolute right-0 pa3">
    <div className="dib pr3" style={{ color: Colors.brandPrimary }}> Already have an account?</div>
    <div
      className="pointer dib pa2"
      onClick={() => { browserHistory.push('/', { authType: 'signin' }); }}
      style={{
        color: Colors.brandPrimary,
        backgroundColor: Colors.white,
        borderRadius: '4px'
      }}
      role="button" >
      Log In
    </div>
  </div>
);

const SignUp = (
  <div className="tc">
    <div
      className="underline pointer dib f3"
      onClick={() => { browserHistory.push('/signup'); }}
      role="button"
      style={{ color: Colors.brandPrimary }} >
      New to Hopscript? Sign Up
    </div>
  </div>
);

class AuthView extends Component {
  componentWillMount() {
    this.props.clearError();
    this.props.clearUser();
  }

  render() {
    return (
      <FullScreenContainer color={Colors.nearWhite}>
        { this.props.route.authType !== 'signin' && SignIn }
        <div className="w-100">
          <CenterThis>
            <div className="w-40-l mw6 mt6 mb5">
              <img alt="hopscript logo" src="/images/HopscriptLogo.png" />
            </div>
          </CenterThis>
          <CenterThis>
            {this.props.route.authType === 'signin' ?
              <div className="w-40-l mw6">
                <Card
                  classOverrides="mb4 bg-white"
                  boxShadow
                  bottomContent={SignUp}
                  bottomColor="lightGray" >
                  <SignInForm />
                </Card>
                <CenterThis>
                  <div
                    className="underline pointer dib p5 mb7 f3 "
                    style={{ color: Colors.gray }}
                    role="button"
                    onClick={() => browserHistory.push('/forgot-password')}
                    onKeyPress={() => browserHistory.push('/forgot-password')} >
                    Forgot your password?
                  </div>
                </CenterThis>
              </div> :
              <div className="w-40-l mw6">
                <Card classOverrides="mb5 pl3 pr3 pt3 bg-white" boxShadow >
                  <BrokerageSignUpForm />
                </Card>
              </div>
            }
          </CenterThis>
        </div>
      </FullScreenContainer>
    );
  }
}

export default connect(null, { clearError, clearUser })(AuthView);
