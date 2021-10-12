import { useState, useEffect } from 'react';
import AdyenCheckout from '@adyen/adyen-web';
import { CLIENT_KEY, ENVIRONMENT } from '../config';

export const useCheckout = (sessionId, sessionData) => {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [checkout, setCheckout] = useState(null);

  console.log('initializing checkout with sessionInfo:', sessionId, sessionData);

  useEffect(() => {
    const configuration = {
      environment: ENVIRONMENT, // Change to 'live' for the live environment.
      clientKey: CLIENT_KEY, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
      session: {
        id: sessionId, // Unique identifier for the payment session.
        sessionData, // The payment session data.
      },
      onPaymentCompleted: (result, component) => {
          console.info(result, component);
          setResult(result);
      },
      onError: (error, component) => {
          console.error(error.name, error.message, error.stack, component);
          setError(error);
      }
    };

    const initializeCheckout = async config => {
      const component = await new AdyenCheckout(config);
      setCheckout(component);
    };

    initializeCheckout(configuration);
  }, [sessionId, sessionData]);

  return [checkout, result, error];
};