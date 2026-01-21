import { NotificaionAxiosInstance } from "../../config/AxiosInstance"



/**
 * 
 * get notification
 */
export const fetchNotification = async () =>{

    const response = await NotificaionAxiosInstance.get('/notification/notifications')
    return response
}


/**
 * 
 *   update notification
 * 
 */
export const updateNotification = async (updateType:string,id?:string) =>{
    const response = await NotificaionAxiosInstance.patch('/notification/update',{updateType,id})
}