import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
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
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { IContractAddress, IContractData } from "../../Shared/types/Types";
import {
  getChatRoomData,
  getChatMessages,
  startVedioCall,
} from "../../Services/ApiService/ChatApiService";
import { joinChatRoom, sendMessage } from "../../Services/Socket/SocketActions";
import { getSocket } from "../../Services/Socket/Socket";
import { decodeToken } from "../../utils/tokenUtils";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils";
import type { IAppliedVendors } from "../Customer/ContractDetailsModal";
import { Axios, AxiosError } from "axios";
import { toast } from "react-toastify";
import { removeVendorFromContractandChatRoom } from "../../Services/ApiService/ContractApiService";

interface ICustomer {
  name: string;
  email: string;
  phone: string;
  _id: string;
}
export interface IContractDataResponse {
  _id?: string;
  customerId: ICustomer;
  contractName: string;
  description: string;
  phone: string;
  address: IContractAddress;
  acceptedVendors: IAppliedVendors[];
  appliedVendors: IAppliedVendors[];
  serviceType: {
    _id: string;
    serviceName: string;
  };
  status: "inprogress" | "completed" | "cancelled";
  workers: [string] | [];
  createdAt: string;
  updatedAt: Date;
}

interface Message {
  id: string;
  text: string;
  image?: string;
  sender: "me" | "other";
  senderName?: string;
  senderImage?: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface ChatPageProps {
  userType?: "customer" | "vendor";
  contract: IContractDataResponse;
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
  const [contractData ,setContractData] =useState(contract)
  const [chatRoomData, setChatRoomData] = useState();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [roomId, setRoomId] = useState("");
  const [decoded, setDecoded] = useState<{
    role: string;
    userId: string;
  } | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      let imageUrl = message.image;
      if (!imageUrl && message.attachments && message.attachments.length > 0) {
        const imgAttachment = message.attachments.find(
          (att: any) => att.type === "image",
        );
        if (imgAttachment) imageUrl = imgAttachment.url;
      }

      const newMessage: Message = {
        id: message._id || Date.now().toString(),
        text: message.text,
        image: imageUrl,
        sender:
          (message.sender?._id || message.sender) === currentUserId
            ? "me"
            : "other",
        senderName: message.sender?.name || "Unknown",
        senderImage: message.sender?.profileImage,
        timestamp: new Date(
          message.time || message.createdAt,
        ).toLocaleTimeString([], {
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

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !roomId) return;

    const handleReconnect = () => {
      console.log("Reconnected, re-joining room:", roomId);
      joinChatRoom(roomId);
    };

    socket.on("connect", handleReconnect);

    return () => {
      socket.off("connect", handleReconnect);
    };
  }, [roomId]);

  useEffect(() => {
    if (roomId && decoded?.userId) {

      fetchMessages();
    }
  }, [roomId, decoded]);

  const fetchMessages = async () => {
    try {
      const response = await getChatMessages(roomId);
      if (response?.data?.data) {
        const fetchedMessages = response.data.data.map((msg: any) => {
          let imageUrl = msg.image;
          if (!imageUrl && msg.attachments && msg.attachments.length > 0) {
            const imgAttachment = msg.attachments.find(
              (att: any) => att.type === "image",
            );
            if (imgAttachment) imageUrl = imgAttachment.url;
          }

          return {
            id: msg._id,
            text: msg.text,
            image: imageUrl,
            sender: msg.sender._id === decoded?.userId ? "me" : "other",
            senderName: msg.sender.name,
            senderImage: msg.sender.profileImage,
            timestamp: new Date(msg.time || msg.createdAt).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              },
            ),
            status: "read",
          };
        });
        setMessages(fetchedMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const getContractChatRoomData = async () => {
    try {
      const response = await getChatRoomData(id as string);
      if (response?.data?.data) {
        setRoomId(response.data.data._id);
        joinChatRoom(response.data.data._id);
      }
    } catch (error: unknown) {
      console.log("error to fetch room data");
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (showEmojiPicker) setShowEmojiPicker(false);
    e?.preventDefault();

    if (newMessage.trim().length === 0 && !imagePreview) return;

    let attachmentData: { url: string; type: "image" }[] = [];

    if (selectedImage) {
      try {
        const uploadedImage = await uploadToCloudinary(
          selectedImage,
          "chat-images",
        );

        const secureUrl = uploadedImage?.secure_url || uploadedImage?.url;

        if (secureUrl) {
          attachmentData.push({
            url: secureUrl,
            type: "image",
          });
        }
      } catch (error) {
        console.error("Failed to upload image", error);
        return;
      }
    }

    const messagePayload = {
      chatRoomId: roomId,
      sender: decoded?.userId as string,
      senderRole: (decoded?.role === "Vendor" ? "Vendor" : "Customer") as
        | "Vendor"
        | "Customer",
      text: newMessage,
      attachments: attachmentData,
      time: new Date().toISOString(),
    };

    sendMessage(messagePayload);
    setNewMessage("");
    setImagePreview(null);
    setSelectedImage(null);
  };



  const removeVendorFromContract = async (vendorId:string) =>{
      try{


        console.log('contract.acceptedVendors :>> ', contractData.acceptedVendors);
        const response = await removeVendorFromContractandChatRoom(contract._id as string ,vendorId)
        
        if(response.data.success){
          setContractData((prevData) => ({
        ...prevData,
        acceptedVendors: prevData.acceptedVendors.filter(
          (vendor: any) => vendor._id !== vendorId
        ),
      }));
          toast.success(response.data.message)

        }
        
        console.log('contract.acceptedVendors :>> ', contractData.acceptedVendors);


      }catch(error : unknown){
        if(error instanceof AxiosError){
          toast.error(error.response?.data.message || 'error to remove vendor')
        }
      }
  }


  const handleVedioCall = async () => {
    try {
      let result = await startVedioCall(
        roomId,
        contract._id as string,
        decoded?.userId as string,
      );
      console.log("result :>> ", result);
      

      navigate(`/${decoded?.role}/video-call/${result.data.roomId}`);
    } catch (error: unknown) {}
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#eeeaea] overflow-hidden relative">
      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleImageSelect}
      />

      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-50">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setNewMessage((prev) => prev + emojiData.emoji);
            }}
          />
        </div>
      )}

      {/* Image Preview Overlay */}
      {imagePreview && (
        <div className="absolute bottom-20 left-4 z-40 p-2 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-40 w-auto rounded-lg object-cover"
            />
            <button
              onClick={() => {
                setSelectedImage(null);
                setImagePreview(null);
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div
        className={`flex-1 flex flex-col relative transition-all duration-300 ${showParticipants ? "mr-0 md:mr-0" : ""}`}
      >
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
            <button
              onClick={handleVedioCall}
              className="text-[#54656f] hover:bg-slate-200 p-2.5 rounded-full transition-colors hidden sm:block"
            >
              <Video size={22} />
            </button>
            <div className="h-6 w-px bg-slate-300 mx-1 hidden sm:block"></div>
            <button
              className={`text-[#54656f] hover:bg-slate-200 p-2.5 rounded-full transition-colors ${showParticipants ? "bg-slate-200 text-emerald-600" : ""}`}
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <Users size={22} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8 space-y-3 scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.sender === "me" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300 gap-2 mb-4`}
            >
              {msg.sender === "other" && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200 mt-1">
                  {msg.senderImage ? (
                    <img
                      src={msg.senderImage}
                      alt={msg.senderName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-purple-100 text-purple-600 text-xs font-bold">
                      {msg.senderName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              )}

              <div
                className={`max-w-[85%] md:max-w-[60%] lg:max-w-[50%] rounded-xl px-4 py-2 text-[15px] shadow-sm relative group leading-relaxed flex flex-col
                  ${msg.sender === "me" ? "bg-blue-500 text-white rounded-tr-none items-end" : "bg-white text-[#111b21] rounded-tl-none items-start"}`}
              >
                {msg.sender === "other" && (
                  <span className="text-xs font-bold text-orange-600 mb-1 block">
                    {msg.senderName}
                  </span>
                )}

                {/* Render Image if exists in message */}
                {msg.image && (
                  <div className="mb-2 rounded-lg overflow-hidden border border-gray-100 max-w-full">
                    <img
                      src={msg.image}
                      alt="Sent content"
                      className="max-h-60 w-full object-cover rounded-lg"
                    />
                  </div>
                )}

                {msg.text && (
                  <div className="pb-1 break-words whitespace-pre-wrap text-left w-full">
                    {msg.text}
                  </div>
                )}

                <div
                  className={`flex items-center gap-1 select-none mt-0.5 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`text-[10px] ${msg.sender === "me" ? "text-blue-100" : "text-gray-500"}`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative z-20 bg-[#f0f2f5] px-4 py-3 flex items-center gap-2 sm:gap-4 border-t border-[#d1d7db]">
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-[#54656f] hover:bg-slate-200 p-2 rounded-full transition-colors hidden sm:block"
          >
            <Smile size={26} />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`text-[#54656f] hover:bg-slate-200 p-2 rounded-full transition-colors ${imagePreview ? "text-blue-600" : ""}`}
          >
            <Paperclip size={26} />
          </button>

          <form onSubmit={handleSendMessage} className="flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={imagePreview ? "Add a caption..." : "Type a message"}
              className="bg-white border-none focus-visible:ring-0 rounded-lg text-[15px] h-11 px-4 py-3 shadow-sm w-full"
            />
          </form>

          {newMessage.trim() || imagePreview ? (
            <button
              onClick={() => handleSendMessage()}
              className="text-white bg-[#00a884] hover:bg-[#008f6f] p-2.5 rounded-full transition-all shadow-md transform active:scale-95"
            >
              <Send size={20} />
            </button>
          ) : (
            <div className="w-10"></div>
          )}
        </div>
      </div>

      {/* Participants Sidebar */}
      <div
        className={`absolute inset-y-0 right-0 z-30 w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${showParticipants ? "translate-x-0" : "translate-x-full"} md:static md:translate-x-0 md:w-80 ${!showParticipants && "md:hidden"}`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 bg-[#f0f2f5] flex items-center gap-3 border-b border-gray-200 flex-shrink-0">
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

          <div className="flex-1 overflow-y-auto bg-white">
            {/* Profile Header */}
            <div className="p-6 flex flex-col items-center border-b border-gray-100 bg-white">
              <div className="w-32 h-32 rounded-full bg-blue-600 mb-4 overflow-hidden shadow-inner flex items-center justify-center text-white text-4xl font-bold">
                {contract.contractName?.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-[#111b21] text-center">
                {contract.contractName}
              </h3>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">
                Project Details
              </p>
            </div>

            {/* --- CUSTOMER SECTION --- */}
            <div className="p-4 border-b border-gray-50">
              <h4 className="px-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                Customer
              </h4>
              <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                  {contract.customerId?.name?.charAt(0) || "C"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {contract.customerId?.name as string}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {contract.customerId?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* --- ACCEPTED VENDORS SECTION --- */}
            <div className="p-4">
              <div className="flex justify-between items-center px-2 mb-3">
                <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Accepted Vendors
                </h4>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  {contractData.acceptedVendors?.length || 0}
                </span>
              </div>

              <div className="space-y-2">
                {contractData.acceptedVendors &&
                contractData.acceptedVendors.length > 0 ? (
                  contractData.acceptedVendors.map((vendor: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100 group/vendor"
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm shrink-0">
                        {vendor.shopName?.charAt(0) || "V"}
                      </div>

                      {/* Vendor Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">
                          {vendor.shopName}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          {vendor.email || "Service Provider"}
                        </p>
                      </div>

                      {/* --- CUSTOMER ONLY: DELETE ACTION --- */}
                      {userType === "customer" && (
                        <button
                          onClick={() => removeVendorFromContract(vendor._id)}
                          className="opacity-0 group-hover/vendor:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Remove Vendor"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-center text-gray-400 py-4 italic">
                    No vendors accepted yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
