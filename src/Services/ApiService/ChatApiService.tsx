import { ChatRoomAxiosInstance } from "../../config/AxiosInstance"



//------------------------ get selected chat room data
export const getChatRoomData = async (contractId:string) =>{

     const response = await ChatRoomAxiosInstance.get(`/chat/chat-contract/${contractId}`)
     return response

}