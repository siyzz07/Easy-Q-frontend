import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { zegoToken } from "../../Services/ApiService/ChatApiService";
import { decodeToken } from "../../utils/tokenUtils";

export default function VideoCall() {


  console.log('in vedion call')
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const meetingRef = useRef<HTMLDivElement>(null);
  const zpRef = useRef<any>(null); 
  useEffect(() => {
    let isMounted = true; 

    const startCall = async () => {
      console.log('roomId :>> ', roomId);
      if (!roomId) return;
      try {
        const decoded = decodeToken();
        if (!decoded?.userId) {
             console.error("User ID not found");
             navigate(-1);
             return;
        }

        console.log('response :>> ');
        const response = await zegoToken(roomId, decoded.userId);
          console.log('response :>> ', response);
        if (!isMounted) return;

        const data = response?.data?.data;
        const token = data?.token;
        const appId = data?.appId;
        const userName = data?.userName;

        if (!token || !appId) {
             console.error("Invalid token response details", data);
             navigate(-1);
             return;
        }


        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          appId,
          token,
          roomId,
          decoded.userId,
          userName || decoded.userId
        );


        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current = zp;

        if (meetingRef.current) {
            zp.joinRoom({
                container: meetingRef.current,
                scenario: {
                   mode: ZegoUIKitPrebuilt.VideoConference
                },
                showScreenSharingButton: true,
                showPreJoinView: false,
                onLeaveRoom: () => navigate(-1)
            });
        }
      } catch (error) {
        console.error("Failed to start video call", error);
        if (isMounted) navigate(-1);
      }
    };

    startCall();

    const callLeave = () =>{
      
      navigate(-1)
    }

    return () => {
      isMounted = false;
      if (zpRef.current) {
        zpRef.current.destroy();
        zpRef.current = null;
      }
    };
  }, [roomId, navigate]);

  return (
    <div
      ref={meetingRef}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000"
      }}
    />
  );
}
