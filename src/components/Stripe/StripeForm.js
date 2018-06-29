/**
 * The purpose of this file is to provide a credit card form for brokerages to add their payment info to stripe
 */

import React, { Component } from 'react';
import CreditCardInput from 'react-credit-card-input';
import { connect } from 'react-redux';

import { Colors, BorderRadius } from '../../config/styles';
import { Button, LoaderOrThis } from '../common';
import { createStripeCustomer } from './StripeActions';

class StripeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      expiry: '',
      cvc: ''
    };
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
    this.handleCardCVCChange = this.handleCardCVCChange.bind(this);
    this.handleStripeSubmit = this.handleStripeSubmit.bind(this);
  }

  handleCardNumberChange(e) {
    this.setState({ cardNumber: e.target.value });
  }

  handleCardExpiryChange(e) {
    this.setState({ expiry: e.target.value });
  }

  handleCardCVCChange(e) {
    this.setState({ cvc: e.target.value });
  }

  handleStripeSubmit() {
    this.props.createStripeCustomer(this.state);
  }

  render() {
    const { cardNumber, expiry, cvc } = this.state;
    const { loading } = this.props;
    return (
      <LoaderOrThis loading={loading}>
        <form>
          <CreditCardInput
            cardNumberInputProps={{ value: cardNumber, onChange: this.handleCardNumberChange }}
            cardExpiryInputProps={{ value: expiry, onChange: this.handleCardExpiryChange }}
            cardCVCInputProps={{ value: cvc, onChange: this.handleCardCVCChange }}
            fieldClassName="input"
          />
          <Button backgroundColor={Colors.brandPrimary} onClick={this.handleStripeSubmit} classOverrides="w-100 mt5" borderRadius={BorderRadius.none}>Connect to Stripe</Button>
        </form>
      </LoaderOrThis>
    );
  }
}

const mapStateToProps = ({ StripeReducer }) => {
  const {
    error, loading
  } = StripeReducer;
  return {
    loading,
    error
  };
};

export default connect(mapStateToProps, { createStripeCustomer })(StripeForm);
