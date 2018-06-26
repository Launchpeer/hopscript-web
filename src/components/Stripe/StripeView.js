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
      <FullScreenContainer color={Colors.brandPrimary}>
        <div className="tc absolute right-0 pa3">
          <div className="dib pr3" style={{ color: Colors.white }}> Already have an account?</div>
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
          <div className="mt5 tc">
            <HeadphonesIcon width="20%" fill={Colors.white} />
          </div>
        </CenterThis>
        <CenterThis>
          <div
            className="mw5 mb5 f1"
            style={{
              color: Colors.white
            }}
          >
            Hopscript
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
            <div style={{ color: Colors.brandNearBlack, textAlign: 'center' }}>Please log in or create a Stripe account to pay for you account.</div>
            {error && <div className="pb4" style={{ color: 'red' }}>An error occurred. Please try again.</div>}
            <Button backgroundColor={Colors.brandGreen} onClick={this.onButtonClick} classOverrides="w-100 mt5" borderRadius={BorderRadius.none}>Connect to Stripe</Button>
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
