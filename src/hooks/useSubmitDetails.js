import { useState, useEffect } from 'react';
import AdyenCheckout from '@adyen/adyen-web';
import { CLIENT_KEY, ENVIRONMENT } from '../config';

export const useSubmitDetails = (sessionId, redirectResult) => {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {
    const configuration = {
      environment: ENVIRONMENT, // Change to 'live' for the live environment.
      clientKey: CLIENT_KEY, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
      session: {
        id: sessionId, // Unique identifier for the payment session.
      },
      onPaymentCompleted: (result, component) => {
          console.info(result, result.pspReference);
          setResult(result);
      },
      onError: (error, component) => {
          console.error(error.name, error.message, error.stack, component);
          setError(error);
      }
    };

    const submitAdditionalDetails = async config => {
      const component = await new AdyenCheckout(config);
      component.submitDetails({ details: { redirectResult } });
      console.info('here', component);
      setCheckout(component);
    };

    submitAdditionalDetails(configuration);
  }, [sessionId, redirectResult]);

  return [checkout, result, error];
};