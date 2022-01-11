import { useState, useEffect } from 'react';
import AdyenCheckout from '@adyen/adyen-web';
import { CLIENT_KEY, ENVIRONMENT } from '../config';

export const useCheckout = (sessionId, sessionData, redirectResult) => {
  console.log('using checkout');
  const [checkout, setCheckout] = useState(null);

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
      },
      onError: (error, component) => {
          console.error(error.name, error.message, error.stack, component);
      }
    };
    const initializeCheckout = async config => {
      const component = await new AdyenCheckout(config);
      if (redirectResult) {
        console.log('redirectResult found', redirectResult)
        component.submitDetails({ details: { redirectResult } });
      };
      console.log(component);
      setCheckout(component);
    };

    initializeCheckout(configuration);
  }, [sessionId, sessionData, redirectResult]);

  return [checkout];
};