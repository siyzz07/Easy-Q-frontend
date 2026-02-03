import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoCall() {

  console.log('invedio call rooom');
  
  const { roomId } = useParams();              // room id from URL
  const navigate = useNavigate();
  const meetingRef = useRef<HTMLDivElement>(null);

  // You can replace these with real user data
  const userId = String(Date.now());           // unique per user
  const userName = "User";                     // customer / vendor name

  useEffect(() => {
      console.log('invedio call rooom');
    if (!roomId) return;

    joinZegoRoom();

    // cleanup when page unmounts
    return () => {
      meetingRef.current = null;
    };
  }, [roomId]);

  const joinZegoRoom = async () => {
    try {
      // 1️⃣ Get Zego token from backend (SAFE)
      const res = await axios.get("/api/zego/token", {
        params: {
          roomId,
          userId,
          userName
        }
      });

      const { token } = res.data;

      // 2️⃣ Create Zego instance
      const zp = ZegoUIKitPrebuilt.create(token);

      // 3️⃣ Join room (VIDEO CALL STARTS HERE)
      zp.joinRoom({
        container: meetingRef.current!,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference
        },
        showScreenSharingButton: true,
        showPreJoinView: false,
        onLeaveRoom: () => {
          navigate(-1); // go back when user leaves call
        }
      });

    } catch (error) {
      console.error("Failed to start video call", error);
      navigate(-1);
    }
  };

  return (
    <div
      ref={meetingRef}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000"
      }}
    />
    // <div>hai</div>
  );
}
