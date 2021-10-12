import { useStartSession } from "../../hooks";
import Dropin from "./Dropin";

const Initialize = ({ options }) => {
  const [sessionInfo] = useStartSession(options);

  if (!!sessionInfo) {
    return <Dropin sessionId={sessionInfo.id} sessionData={sessionInfo.sessionData}/>
  };

  return <div></div>
};

export default Initialize;