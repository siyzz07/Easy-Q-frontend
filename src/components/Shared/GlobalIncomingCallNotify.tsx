import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IncomingCallModal from "./IncomingCallModal";
import { decodeToken } from "../../utils/tokenUtils";
import type { RootState } from "../../Redux/Store";
import { clearIncomingCall } from "../../Redux/vediCallNotifySlice";

const GlobalIncomingCallNotify = () => {
  const callDetails = useSelector((state: RootState) => state.vediCallNotifySlice.incomingCall);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAcceptCall = () => {
    if (callDetails) {
      let decode = decodeToken();
      navigate(`${decode?.role}/video-call/${callDetails.roomId}`);
      dispatch(clearIncomingCall());
    }
  };

  const handleDeclineCall = () => {
    dispatch(clearIncomingCall());
  };

  if (!callDetails) return null;

  return (
    <IncomingCallModal
      callerName={callDetails.contractName}
      callType="video"
      onAccept={handleAcceptCall}
      onDecline={handleDeclineCall}
    />
  );
};

export default GlobalIncomingCallNotify;