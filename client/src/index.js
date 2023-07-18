import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadStripe } from '@stripe/stripe-js';
import dotenv from 'dotenv';

dotenv.config();

const KEY = process.env.REACT_APP_STRIPE;
const stripePromise = loadStripe(KEY);

stripePromise.then(stripe => {
  //set the stripe publishable key
  stripe.setPublishableKey(KEY);


  //render the application
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

});
