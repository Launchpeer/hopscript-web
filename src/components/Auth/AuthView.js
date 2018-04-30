import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Card, CenterThis, FullScreenCenter } from '../common';
import { Colors } from '../../config/styles';
import { SignInForm, SignUpForm } from './';
import { clearError } from './AuthActions';

const bottomContent = authType => (
  <div className="tc">
    <div className="di silver">
      {authType === 'signin' ? 'New to LGND?' : 'Already have an account?'}
    </div>
    <div className="di underline ml2 silver" role="button">
      {authType === 'signin' ? 'Sign Up' : 'Sign In'}
    </div>
  </div>
);
// do we want to use "pointer" when hovering over "sign up", even though it is disabled?
// do we want to leave "sign up" onClick function in there & disable? If so I will have to
// change it from a div with a button role into a <Button>
// https://github.com/facebook/react/issues/8977

/*
const bottomContent = authType => (
  <div className="tc">
    <div className="di silver">
      {authType === 'signin' ? 'New to LGND?' : 'Already have an account?'}
    </div>
    <div
      className="di underline ml2 pointer brand-primary"
      role="button"
      onClick={() =>
        browserHistory.push(`${authType === 'signin' ? '/signup' : '/'}`)
      }
      onKeyPress={() =>
        browserHistory.push(`${authType === 'signin' ? '/signup' : '/'}`)
      }
    >
      {authType === 'signin' ? 'Sign Up' : 'Sign In'}
    </div>
  </div>
);
*/

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
              classOverrides="mw6 mb5"
              boxShadow
              borderRadius="medium"
              bottomColor="nearWhite"
            >
              {this.props.route.authType === 'signin' ? (
                <SignInForm />
              ) : (
                <SignUpForm />
              )}
            </Card>
          </CenterThis>
          <CenterThis>
            <div
              className="underline pointer p5 mb6"
              style={{
                color: Colors.brandPrimary
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
