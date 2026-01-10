

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
export const getCustomerBookingData = async (page:number,limit:number,search:string) =>{
  const response = await BookingAxiosInstance.get(`/booking/customer`,{
    params:{
      page,
      limit,
      search
    }
  })
  return response
}


//--------------------- get seleected bookings 
export const getSelectedBookingData = async (id:string) =>{
  const response = await BookingAxiosInstance.get(`/booking/${id}`)
  return response
}


//--------------------- cancel booking by customer
export const bookingCanceling = async(bookingId:string) =>{
    const response = await BookingAxiosInstance.patch(`/booking/cancel/${bookingId}`)
    return response
}


//--------------------- get vendor bookings
export const getVendorBookings = async (page:number, limit:number, search:string , date?:string) =>{
  const response = await BookingAxiosInstance.get(`/booking/vendor`,{
    params:{
      page,
      limit,
      search,
      date
    }
  })
  return response
}


//--------------------- update booking status by vendor
export const updateBookingStatus = async(bookingId:string, status: string) =>{
    const response = await BookingAxiosInstance.patch(`/booking/status/${bookingId}`, { status })
    return response
}

//--------------------- booking amount refund
export const bookingRefund = async (bookingId:string) =>{
  const response = await BookingAxiosInstance.post(`/booking/refund/${bookingId}`)
  return response
}

//--------------------- booking reshedule
export const  bookingReschedule = async (data:{staffId:string,timePreffer:string,date:Date,bookingId:string}) =>{
   const response = await BookingAxiosInstance.patch('/booking/reschedule',data)
   return response
}