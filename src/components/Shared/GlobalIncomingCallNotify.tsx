import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../../Services/Socket/Socket";
import IncomingCallModal from "./IncomingCallModal";
import { decodeToken } from "../../utils/tokenUtils";


const GlobalIncomingCallNotify = () => {

  const [callDetails, setCallDetails] = useState<{ contractName: string; roomId: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = getSocket();
    
    if (!socket) return;

    const handleIncomingCall = (data: { contractName: string; roomId: string }) => {
      console.log("Incoming call received:", data);
      setCallDetails(data);
    };



    socket.on("call-ended",handleDeclineCall);

    socket.on("incomming-vedio-call", handleIncomingCall);

    return () => {
      socket.off("incomming-vedio-call", handleIncomingCall);
    };
  }, []);

  const handleAcceptCall = () => {
    if (callDetails) {
      let decode = decodeToken();
      navigate(`${decode?.role}/video-call/${callDetails.roomId}`);
      setCallDetails(null);
    }
  };

  const handleDeclineCall = () => {
    
    setCallDetails(null);
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