import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../../Services/Socket/Socket';
import IncomingCallModal from './IncomingCallModal';


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

    socket.on('incomming-vedio-call', handleIncomingCall);

    return () => {
      socket.off('incomming-vedio-call', handleIncomingCall);
    };
  }, []);

  const handleAcceptCall = () => {
    if (callDetails) {
      navigate(`/video-call/${callDetails.roomId}`);
      setCallDetails(null);
    }
  };

  const handleDeclineCall = () => {
    // Optional: Emit a 'call-declined' event back to the sender via socket here
    setCallDetails(null);
  };

  // JSX: In React, you must wrap adjacent elements or return a Fragment/null
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