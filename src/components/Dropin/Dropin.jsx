import { useRef, useEffect } from 'react';
import { useCheckout } from "../../hooks";
import RedirectHandler from './RedirectHandler';

const Dropin = ({ sessionId, sessionData, redirectInfo, setRedirectInfo }) => {
  const [checkout] = useCheckout(sessionId, sessionData, redirectInfo);
  const componentIsMounted = useRef(true);

  useEffect(() => {
      return () => {
          componentIsMounted.current = false
      }
  }, []);

  const search = window.location.search.substring(1);

  if (!!search && !redirectInfo) {
    const { redirectResult } = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
    setRedirectInfo(redirectResult);
  }  else if (checkout) {
    checkout.create('dropin').mount('#checkout');
  }

  return (
    <div id="checkout"></div>
  );
};

export default Dropin;