

import { BookingAxiosInstance } from "../../config/AxiosInstance";
import type { IBookingPayload } from "../../Shared/types/Types";






export const createBooking = async (data: IBookingPayload) => {
  const response = await BookingAxiosInstance.post("/booking/add-booking", data);
  return response;
};



export const bookAvailableTime = async(data:{staffId:string,timePreffer:string,date:Date,serviceId:string,addressId:string,shopId:string}) =>{
    
    const response = await BookingAxiosInstance.post('/booking/check-time',data)
    return response
}
