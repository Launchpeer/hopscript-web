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
      className="underline pointer dib f5"
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
        <div className="w-100 mt5">
          <CenterThis>
            <div className="w-30-l mt4 mb4">
              <img alt="hopscript logo" src="/images/HopscriptLogo.png" />
            </div>
          </CenterThis>
          <CenterThis>
            <div className="w-30-l">
              <Card
                classOverrides="mb4 bg-white"
                boxShadow
                bottomContent={this.props.route.authType === 'signin' ? SignUp : null}
                bottomColor="lightGray" >
                {this.props.route.authType === 'signin' ? <SignInForm /> : <BrokerageSignUpForm /> }
              </Card>
              {this.props.route.authType === 'signin' &&
              <CenterThis>
                <div
                  className="underline pointer dib p5 mb4 f5 "
                  style={{ color: Colors.gray }}
                  role="button"
                  onClick={() => browserHistory.push('/forgot-password')}
                  onKeyPress={() => browserHistory.push('/forgot-password')} >
                    Forgot your password?
                </div>
              </CenterThis> }
            </div>
          </CenterThis>
        </div>
      </FullScreenContainer>
    );
  }
}

export default connect(null, { clearError, clearUser })(AuthView);
