import Parse from 'parse';
import { browserHistory } from 'react-router';
import {
  STRIPE_LOADING,
  STRIPE_SUCCESS,
  STRIPE_ERROR
} from "./StripeTypes";

export const connectingToStripe = () => ({
  type: STRIPE_LOADING,
});

export const sendStripeIdToParse = stripeAuthToken => (dispatch) => {
  dispatch({ type: STRIPE_LOADING });
  Parse.Cloud.run('getStripeConnectId', { code: stripeAuthToken }).then((res) => {
    const responseData = JSON.parse(res);
    const currentUser = Parse.User.current();
    currentUser.set('stripe_connect_id', responseData.stripe_user_id);
    currentUser.save()
      .then(() => {
        dispatch({
          type: STRIPE_SUCCESS
        });
        browserHistory.push('/dashboard');
      })
      .catch(() => ({
        type: STRIPE_ERROR
      }));
  });
};


const createStripeCustomer = (data) => (dispatch) => {
    dispatch({ type: STRIPE_LOADING });
    Parse.Cloud.run('createStripeCustomer', {
      number: data.cardNumber,
      expMonth: data.expiry.slice(0,2),
      expYear: data.expiry.slice(5,8),
      cvc: data.cvc
    })
      .then(() => {
        dispatch({
          type: STRIPE_SUCCESS
        });
        browserHistory.push('/agents-list');
      })
}

export { createStripeCustomer };
