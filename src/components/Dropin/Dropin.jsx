import { useRef, useEffect } from 'react';
import { useCheckout } from "../../hooks";

const Dropin = ({ sessionId, sessionData }) => {
  const [checkout, result, error] = useCheckout(sessionId, sessionData);
  const componentIsMounted = useRef(true)

  useEffect(() => {
      return () => {
          componentIsMounted.current = false
      }
  }, [])

  const search = window.location.search.substring(1);

  if (!!search && checkout) {
    const { redirectResult } = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });

    checkout.submitDetails({details: { redirectResult }});
  }  else if (checkout) {
    checkout.create('dropin').mount('#checkout');
  }

  return (
    <div id="checkout"></div>
  );
};

export default Dropin;