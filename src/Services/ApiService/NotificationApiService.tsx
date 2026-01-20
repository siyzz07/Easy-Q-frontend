import { NotificaionAxiosInstance } from "../../config/AxiosInstance"



/**
 * 
 * get notification
 */
export const fetchNotification = async () =>{

    const response = await NotificaionAxiosInstance.get('/notification/notifications')
    console.log('response :>> ', response);
    return response
}