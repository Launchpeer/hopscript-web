import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Card, CenterThis, FullScreenCenter } from '../common';
import { Colors, BorderRadius } from '../../config/styles';
import { SignInForm, BrokerageSignUpForm } from './';
import { clearError } from './AuthActions';

/*
<Card classOverrides="mw6 mb5" boxShadow>
  {this.props.route.authType === 'signin' ? (
    <SignInForm />
  ) : (
    <BrokerageSignUpForm />
  )}
</Card>
*/
/*
const SignIn = onClick => (
  <div>
    Already have an account?
    <div
      onClick={browserHistory.push({ pathname: '/', authType: 'signin' })}
      role="button"
    >
      Sign in
    </div>
  </div>
);
*/
const SignIn = <div className="tc gray">Already have an account? Sign in</div>;

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
            {this.props.route.authType === 'signin' ? (
              <div>
                <Card classOverrides="mw6 mb5" boxShadow>
                  <SignInForm />
                </Card>
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
            ) : (
              <Card
                classOverrides="mw6 mb5"
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
