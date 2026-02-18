import React from "react";
import { Phone, PhoneOff, Video } from "lucide-react";

interface IncomingCallProps {
  callerName: string;
  callerImage?: string;
  callType: "audio" | "video";
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingCallModal: React.FC<IncomingCallProps> = ({
  callerName,
  callerImage,
  callType ="video",
  onAccept,
  onDecline,
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pointer-events-none">

      <div className="pointer-events-auto animate-in fade-in slide-in-from-top-10 duration-500 w-full max-w-sm">
        <div className="bg-white/90 backdrop-blur-lg border border-white shadow-2xl rounded-3xl p-4 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-blue-100 border-2 border-white">
                {callerImage ? (
                  <img src={callerImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-blue-600 uppercase font-bold">
                    {callerName.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Caller Text */}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Incoming {callType} Call
              </span>
              <h4 className="text-gray-900 font-extrabold truncate w-32 md:w-40">
                {callerName}
              </h4>
            </div>
          </div>


          <div className="flex items-center gap-2">
            <button
              onClick={onDecline}
              className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors active:scale-90"
            >
              <PhoneOff size={20} fill="currentColor" />
            </button>
            <button
              onClick={onAccept}
              className="p-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all active:scale-90"
            >
              {callType === "video" ? <Video size={20} fill="currentColor" /> : <Phone size={20} fill="currentColor" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;