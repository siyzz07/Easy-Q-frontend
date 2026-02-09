
import { NotificaionAxiosInstance } from "../../config/AxiosInstance";
import { NOTIFICATION_API_ROUTES } from "../../Shared/Constants/ApiEndpoints";



/**
 * 
 * get notification
 */
export const fetchNotification = async () =>{

    const response = await NotificaionAxiosInstance.get(NOTIFICATION_API_ROUTES.FETCH);
    return response;
};


/**
 * 
 *   update notification
 * 
 */
export const updateNotification = async (updateType:string,id?:string) =>{
    const response = await NotificaionAxiosInstance.patch(NOTIFICATION_API_ROUTES.UPDATE,{updateType,id});
};