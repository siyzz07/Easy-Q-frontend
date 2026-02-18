import { getSocket } from "./Socket";


export type AttachmentType = {
  url: string;
  type: "image";
};

export type SendMessagePayload = {
  chatRoomId: string;
  sender: string;
  senderRole: "Vendor" | "Customer";
  text?: string;
  attachments?: AttachmentType[];
  time:string
};
// ----------- chat actions


//  join the vendor in chat room
export const joinChatRoom = (roomId:string)=>{
    const socket = getSocket();
    if(socket){
        socket.emit("join-room",roomId);
    }else{
        console.log("socket not found  in joinChatRoom");
    }
};

// send message in the room
export const sendMessage = (data:SendMessagePayload) =>{
    const socket = getSocket();
    console.log("socket :>> ", socket);
    if(socket){
        socket.emit("message:new",data);
    }
};

//  join the vedio call room
export const joinVedioCallRoom = (roomId:string,userId:string) =>{
    const socket = getSocket();
    if(socket){
        socket.emit("join-vedio-room",{roomId,userId});
    }
};