import { ChatRoomAxiosInstance } from "../../config/AxiosInstance"



//------------------------ get selected chat room data
export const getChatRoomData = async (contractId:string) =>{

     const response = await ChatRoomAxiosInstance.get(`/chat/chat-contract/${contractId}`)
     return response

}

//------------------------ get messagessss by chat room id
export const getChatMessages = async (chatRoomId: string) => {
  const response = await ChatRoomAxiosInstance.get(`/chat/messages/${chatRoomId}`);
  return response;
};

//------------------------ chat room vedio call start 
export const startVedioCall = async (chatRoomId :string,contractId:string,caller:string) =>{

  const response = await ChatRoomAxiosInstance.post('/chat/vedio-call/start',{chatRoomId,contractId,caller})
  return response
} 

//------------------------ get vedio call zegocloud toke
export const zegoToken = async (roomId:string,userId:string) =>{
  console.log('roomId :>> ', roomId);
  console.log('userId):>> ', userId);
    const response = await ChatRoomAxiosInstance.get('/chat/zego/token',{
      params:{
        roomId,
        userId
      }
    })
    return response
}


