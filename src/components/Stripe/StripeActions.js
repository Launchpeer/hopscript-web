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
