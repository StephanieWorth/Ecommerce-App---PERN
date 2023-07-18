import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { loadStripe } from '@stripe/stripe-js';
import { persistor, store } from './redux/store';


// Access the publishable key from the environment variable
const publishableKey = process.env.REACT_APP_STRIPE;

const stripePromise = loadStripe(publishableKey);

stripePromise.then(stripe => {
  //render the application
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate> 
    </Provider>,
    document.getElementById('root')
  );

});
