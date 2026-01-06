

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


//--------------------- get  bookings customer
export const getCustomerBookingData = async () =>{
  const response = await BookingAxiosInstance.get(`/booking/customer`)
  return response
}


//--------------------- get  bookings customer
export const getSelectedBookingData = async (id:string) =>{
  const response = await BookingAxiosInstance.get(`/booking/${id}`)
  return response
}


//--------------------- cancel booking by customer
export const bookingCanceling = async(bookingId:string) =>{
    const response = await BookingAxiosInstance.patch(`/booking/cancel/${bookingId}`)
    return response
}