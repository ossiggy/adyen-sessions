import { useRef, useEffect } from 'react';
import { useSubmitDetails } from "../../hooks";

const RedirectHandler = ({ sessionId, redirectResult }) => {
  const [checkout] = useSubmitDetails(sessionId, redirectResult);
  const componentIsMounted = useRef(true);

  useEffect(() => {
      return () => {
          componentIsMounted.current = false
      }
  }, []);

  checkout.create('dropin').mount('#checkout');

  return (
    <div id="checkout"></div>
  );
};

export default RedirectHandler;