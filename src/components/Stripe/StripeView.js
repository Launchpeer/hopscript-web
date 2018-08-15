import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
  Card,
  CenterThis,
  FullScreenContainer,
  HeadphonesIcon,
  Button,
  Loader
} from '../common';
import { StripeForm } from './';

import { STRIPE_CONNECT_URI } from '../../config/globals';
import { connectingToStripe, sendStripeIdToParse, stripeError } from './StripeActions';

import { BorderRadius, Colors } from '../../config/styles';

class StripeView extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.getStripeIdFromUrl = this.getStripeIdFromUrl.bind(this);
    if (this.props.location.search.includes("code=")) this.getStripeIdFromUrl();
    if (this.props.location.search.includes("error=")) this.props.stripeError();
  }


  onButtonClick() {
    location.href = `${STRIPE_CONNECT_URI}`;
    this.props.connectingToStripe();
  }

  getStripeIdFromUrl() {
    const callbackString = this.props.location.search;
    const stripeId = callbackString.substr(callbackString.indexOf("ac_"));
    this.props.sendStripeIdToParse(stripeId);
  }

  render() {
    const { loading, error } = this.props;
    return (
      <FullScreenContainer color={Colors.nearWhite}>
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
        <CenterThis>
          <div className="w-40-l mw6 mt6 mb5">
            <img alt="hopscript logo" src="/images/HopscriptLogo.png" />
          </div>
        </CenterThis>
        {loading && <Loader />}
        <CenterThis>
          <Card
            boxShadow
            borderRadius="medium"
            classOverrides="mw6 justify-center items-center flex flex-column"
            >
            <div className="flex justify-center mb3"><img style={{ height: '100px', alignSelf: 'center' }} alt="Stripe" src="/images/stripe-logo.png" /></div>
            <StripeForm />
            {error && <div className="pb4" style={{ color: 'red' }}>An error occurred. Please try again.</div>}
          </Card>
        </CenterThis>
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = ({ StripeReducer }) => {
  const { loading, error } = StripeReducer;
  return {
    loading,
    error
  };
};

export default connect(mapStateToProps, {
  connectingToStripe,
  sendStripeIdToParse,
  stripeError
})(StripeView);
