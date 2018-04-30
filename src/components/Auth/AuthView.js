import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Card, CenterThis, FullScreenCenter } from '../common';
import { Colors, BorderRadius } from '../../config/styles';
import { SignInForm, SignUpForm } from './';
import { clearError } from './AuthActions';

class AuthView extends Component {
  componentDidMount() {
    this.props.clearError();
  }

  render() {
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
            <Card classOverrides="mw6 mb5" boxShadow>
              {this.props.route.authType === 'signin' ? (
                <SignInForm />
              ) : (
                <SignUpForm />
              )}
            </Card>
          </CenterThis>
          <CenterThis>
            <div
              className="underline pointer p5 mb7"
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
      </FullScreenCenter>
    );
  }
}

export default connect(null, { clearError })(AuthView);
