import { useState } from 'react';
import { useStartSession } from "../../hooks";
import Dropin from "./Dropin";

const Initialize = ({ options }) => {
  const [redirectInfo, setRedirectInfo] = useState(null);
  const [sessionInfo] = useStartSession(options);

  if (!!sessionInfo) {
    return <Dropin 
    sessionId={sessionInfo.id} 
    sessionData={sessionInfo.sessionData}
    redirectInfo={redirectInfo}
    setRedirectInfo={setRedirectInfo}
    />
  };

  return <div></div>
};

export default Initialize;