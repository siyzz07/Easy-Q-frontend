
import { string } from "yup";
import { ChatRoomAxiosInstance } from "../../config/AxiosInstance";
import { CHAT_API_ROUTES } from "../../Shared/Constants/ApiEndpoints";



//------------------------ get selected chat room data
export const getChatRoomData = async (contractId:string) =>{

     const response = await ChatRoomAxiosInstance.get(`${CHAT_API_ROUTES.CHAT_ROOM}${contractId}`);
     return response;

};




//------------------------ get messagessss by chat room id
export const getChatMessages = async (chatRoomId: string) => {
  const response = await ChatRoomAxiosInstance.get(`${CHAT_API_ROUTES.MESSAGES}${chatRoomId}`);
  return response;
};

//------------------------ chat room vedio call start 
export const startVedioCall = async (chatRoomId :string,contractId:string,caller:string) =>{

  const response = await ChatRoomAxiosInstance.post(CHAT_API_ROUTES.START_VIDEO_CALL,{chatRoomId,contractId,caller});
  return response;
}; 

//------------------------ get vedio call zegocloud toke
export const zegoToken = async (roomId:string,userId:string) =>{

    const response = await ChatRoomAxiosInstance.get(CHAT_API_ROUTES.ZEGO_TOKEN,{
      params:{
        roomId,
        userId
      }
    });
    return response;
};

//------------------------ leav form the vedio call
export const leaveZego = async (roomId:string, leaveUser:string) =>{

  const response = await ChatRoomAxiosInstance.post(CHAT_API_ROUTES.LEAVE_ZEGO,{roomId,leaveUser});
  return response;

};


