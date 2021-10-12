import { useState, useEffect } from 'react';
import { MERCHANT_ACCOUNT, RETURN_URL } from '../config';

export const useStartSession = options => {
  console.log('Starting session with params', options)
  const [sessionInfo, setSessionInfo] = useState(null);
  useEffect(() => {

    const paymentData = {
      merchantAccount: MERCHANT_ACCOUNT,
      amount: {
        value: options.value * 100,
        currency: options.currency
      },
      returnUrl: RETURN_URL,
      reference: Math.floor(Math.random() * 100000000),
      countryCode: options.countryCode
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    }

    const startSession = async () => {
      try {
        const response = await fetch('http://localhost:8080/startSession', requestOptions);

        const parsed = await response.json();
        setSessionInfo(parsed);
      } catch (err) {
        console.error('Error', err.message);
      }
    };
    startSession();
  }, [options]);

  return [sessionInfo]
}