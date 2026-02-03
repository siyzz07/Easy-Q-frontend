import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Phone,
  Video,
  Users,
  MoreVertical,
  Smile,
  Paperclip,
  Send,
  ArrowLeft,
  Search,
  CheckCheck,
  Mic,
  Image as ImageIcon,
  Trash2,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { IContractData } from "../../Shared/types/Types";
import { getChatRoomData } from "../../Services/ApiService/ChatApiService";
import { joinChatRoom, sendMessage } from "../../Services/Socket/SocketActions";
import { getSocket } from "../../Services/Socket/Socket";
import { decodeToken } from "../../utils/tokenUtils";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
  status: "sent" | "delivered" | "read";
}
interface ChatPageProps {
  userType?: "customer" | "vendor";
  contract: IContractData;
}

const ChatPage: React.FC<ChatPageProps> = ({
  userType = "customer",
  contract,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showParticipants, setShowParticipants] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatRoomData, setChatRoomData] = useState();
  const [roomId, setRoomId] = useState("");
  const [decoded, setDecoded] = useState<{
    role: string;
    userId: string;
  } | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const decode = decodeToken();
    let currentUserId = "";

    if (decode) {
      currentUserId = decode.userId;
      const decodedData = {
        role: decode?.role,
        userId: decode?.userId,
      };
      setDecoded(decodedData);
    }

    const socket = getSocket();
    getContractChatRoomData();
    socket?.on("message:receive", (message: any) => {
      console.log('message :>> ', message);

      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.text,
        sender: message.sender === currentUserId ? "me" : "other",
        timestamp: new Date(message.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "read",
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket?.off("message:receive");
    };
  }, []);


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getContractChatRoomData = async () => {
    try {
      const response = await getChatRoomData(id as string);
      if (response?.data?.data) {
        const room = response.data.data;
        setChatRoomData(room);
        setRoomId(response.data.data._id);
        joinChatRoom(response.data.data._id);
      }
    } catch (error: unknown) {
      console.log("error to fetch room data");
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();

    const messagePayload = {
      chatRoomId: roomId,
      sender: decoded?.userId as string,
      senderRole: (decoded?.role === "vendor" ? "Vendor" : "Customer") as
        | "Vendor"
        | "Customer",
      text: newMessage,
      time: new Date().toISOString(),
    };
    sendMessage(messagePayload);
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#eeeaea] overflow-hidden relative">
      {/* Main Chat Area */}
      <div
        className={`flex-1 flex flex-col relative transition-all duration-300 ${showParticipants ? "mr-0 md:mr-0" : ""}`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-white z-0 opacity-40 "></div>

        {/* Header */}
        <div className="relative z-20 bg-[#f0f2f5] px-4 py-3 flex items-center justify-between shadow-sm border-b border-[#d1d7db]">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#54656f] hover:bg-slate-200 rounded-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={24} />
            </Button>

            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setShowParticipants(true)}
            >
              {/* <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden border border-slate-200">
                <img 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${id}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div> */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-[#111b21] leading-tight text-base">
                  {contract.contractName}
                </h3>
                <p className="text-xs text-[#667781] truncate max-w-[150px] sm:max-w-xs">
                  Tap specifically here for contact info
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="text-[#54656f] hover:bg-slate-200 p-2.5 rounded-full transition-colors hidden sm:block">
              <Video size={22} />
            </button>
            {/* <button className="text-[#54656f] hover:bg-slate-200 p-2.5 rounded-full transition-colors hidden sm:block">
              <Phone size={22} />
            </button> */}
            <div className="h-6 w-px bg-slate-300 mx-1 hidden sm:block"></div>
            <button
              className={`text-[#54656f] hover:bg-slate-200 p-2.5 rounded-full transition-colors ${showParticipants ? "bg-slate-200 text-emerald-600" : ""}`}
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <Users size={22} />
            </button>
            {/* <button className="text-[#54656f] hover:bg-slate-200 p-2.5 rounded-full transition-colors">
              <MoreVertical size={22} />
            </button> */}
          </div>
        </div>

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8 space-y-3 scrollbar-thin scrollbar-thumb-slate-300">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[85%] md:max-w-[60%] lg:max-w-[50%] rounded-xl px-4 py-2 text-[15px] shadow-sm relative group leading-relaxed
                  ${
                    msg.sender === "me"
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-gray-300 text-[#111b21] rounded-tl-none"
                  }`}
              >
                <div className="pb-1 break-words whitespace-pre-wrap">
                  {msg.text}
                </div>
                <div className="flex items-center justify-end gap-1 select-none mt-0.5">
                  <span className={`text-[11px]  ${msg.sender == 'me' ?'text-white':'text-[#556066]'}`}>
                    {msg.timestamp}
                  </span>
                  {/* {msg.sender === 'me' && (
                    <span className={`text-[${msg.status === 'read' ? '#53bdeb' : '#8696a0'}]`}>
                      <CheckCheck size={16} />
                    </span>
                  )} */}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative z-20 bg-[#f0f2f5] px-4 py-3 flex items-center gap-2 sm:gap-4 border-t border-[#d1d7db]">
          <button className="text-[#54656f] hover:bg-slate-200 p-2 rounded-full transition-colors hidden sm:block">
            <Smile size={26} />
          </button>
          <button className="text-[#54656f] hover:bg-slate-200 p-2 rounded-full transition-colors">
            <Paperclip size={26} />
          </button>

          <form onSubmit={handleSendMessage} className="flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="bg-white border-none focus-visible:ring-0 rounded-lg text-[15px] h-11 px-4 py-3 shadow-sm w-full"
            />
          </form>

          {newMessage.trim() ? (
            <button
              onClick={() => handleSendMessage()}
              className="text-white bg-[#00a884] hover:bg-[#008f6f] p-2.5 rounded-full transition-all shadow-md transform active:scale-95"
            >
              <Send size={20} />
            </button>
          ) : (
            <button className="text-[#54656f] hover:bg-slate-200 p-2 rounded-full transition-colors">
              {/* <Mic size={26} /> */}
            </button>
          )}
        </div>
      </div>

      {/* Participants Sidebar (Right Drawer) */}
      <div
        className={`absolute inset-y-0 right-0 z-30 w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${showParticipants ? "translate-x-0" : "translate-x-full"} md:static md:translate-x-0 md:w-80 ${!showParticipants && "md:hidden"}`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 bg-[#f0f2f5] flex items-center gap-3 border-b border-light-200 flex-shrink-0">
            <button
              onClick={() => setShowParticipants(false)}
              className="hover:bg-slate-200 p-2 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-[#54656f]" />
            </button>
            <h2 className="text-base font-medium text-[#111b21]">
              Contract Info
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 flex flex-col items-center border-b border-faint-100 bg-white">
              <div className="w-32 h-32 rounded-full bg-slate-100 mb-4 overflow-hidden shadow-inner cursor-pointer hover:opacity-90 transition-opacity">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${id}`}
                  alt="Group"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-[#111b21] text-center">
                Contract #{id?.slice(0, 6)}
              </h3>
              <p className="text-sm text-[#667781] mt-1">
                Created on 10/12/2025
              </p>

              <div className="flex gap-4 mt-6 w-full px-4">
                <div className="flex-1 flex flex-col items-center gap-1 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#00a884] group-hover:bg-[#f0f2f5] transition-colors shadow-sm">
                    <Phone size={20} />
                  </div>
                  <span className="text-xs text-[#00a884] font-medium">
                    Audio
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#00a884] group-hover:bg-[#f0f2f5] transition-colors shadow-sm">
                    <Video size={20} />
                  </div>
                  <span className="text-xs text-[#00a884] font-medium">
                    Video
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#00a884] group-hover:bg-[#f0f2f5] transition-colors shadow-sm">
                    <Search size={20} />
                  </div>
                  <span className="text-xs text-[#00a884] font-medium">
                    Search
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <div className="px-2 pb-2">
                <h4 className="text-sm text-[#667781] font-medium">
                  Participants
                </h4>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3 hover:bg-[#f5f6f6] p-3 rounded-lg cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                    Me
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base text-[#111b21] truncate">You</p>
                    <p className="text-xs text-[#667781] truncate">
                      {userType === "vendor" ? "Service Provider" : "Customer"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 hover:bg-[#f5f6f6] p-3 rounded-lg cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium text-sm">
                    {userType === "vendor" ? "CU" : "VD"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base text-[#111b21] truncate">
                      {userType === "vendor" ? "Alex Morgan" : "John Doe"}
                    </p>
                    <p className="text-xs text-[#667781] truncate">
                      {userType === "vendor"
                        ? "Customer"
                        : "Piping & Plumbing Co."}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <MessageCircle
                      size={18}
                      className="text-[#00a884] hover:scale-110 transition-transform"
                    />
                    <Trash2
                      size={18}
                      className="text-[#ea0038] hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="p-4 bg-[#f0f2f5] mt-2 border-t border-slate-200">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button className="w-full flex items-center gap-4 px-4 py-4 text-[#ea0038] hover:bg-[#fcf5f6] transition-colors text-left">
                  <Trash2 size={20} />
                  <div className="font-medium text-[15px]">Delete Chat</div>
                </button>
                <div className="h-px bg-slate-100 mx-4"></div>
                <button className="w-full flex items-center gap-4 px-4 py-4 text-[#ea0038] hover:bg-[#fcf5f6] transition-colors text-left">
                  <Users size={20} />
                  <div className="font-medium text-[15px]">Report Contract</div>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
