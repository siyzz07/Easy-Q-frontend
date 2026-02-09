


import { BookingAxiosInstance } from "../../config/AxiosInstance";
import type { IBookingPayload } from "../../Shared/types/Types";
import { BOOKING_API_ROUTES } from "../../Shared/Constants/ApiEndpoints";






export const createBooking = async (data: IBookingPayload) => {
  const response = await BookingAxiosInstance.post(BOOKING_API_ROUTES.CREATE_BOOKING, data);
  return response;
};



export const bookAvailableTime = async(data:{staffId:string,timePreffer:string,date:Date,serviceId:string,addressId:string,shopId:string}) =>{
    
    const response = await BookingAxiosInstance.post(BOOKING_API_ROUTES.CHECK_TIME,data);
    return response;
};


//--------------------- get  bookings customer
export const getCustomerBookingData = async (page:number,limit:number,search:string) =>{
  const response = await BookingAxiosInstance.get(BOOKING_API_ROUTES.CUSTOMER_BOOKINGS,{
    params:{
      page,
      limit,
      search
    }
  });
  return response;
};


//--------------------- get seleected bookings 
export const getSelectedBookingData = async (id:string,role:string) =>{
  const response = await BookingAxiosInstance.get(`${BOOKING_API_ROUTES.SELECTED_BOOKING}${role}/${id}/`);
  return response;
};


//--------------------- cancel booking by customer
export const bookingCanceling = async(bookingId:string) =>{
    const response = await BookingAxiosInstance.patch(`${BOOKING_API_ROUTES.CANCEL_BOOKING}${bookingId}`);
    return response;
};


//--------------------- get vendor bookings
export const getVendorBookings = async (page:number, limit:number, search:string , date?:string) =>{
  const response = await BookingAxiosInstance.get(BOOKING_API_ROUTES.VENDOR_BOOKINGS,{
    params:{
      page,
      limit,
      search,
      date
    }
  });
  return response;
};


//--------------------- update booking status by vendor
export const updateBookingStatus = async(bookingId:string, status: string) =>{
    const response = await BookingAxiosInstance.patch(`${BOOKING_API_ROUTES.UPDATE_STATUS}${bookingId}`, { status });
    return response;
};

//--------------------- booking amount refund
export const bookingRefund = async (bookingId:string) =>{
  const response = await BookingAxiosInstance.post(`${BOOKING_API_ROUTES.REFUND}${bookingId}`);
  return response;
};

//--------------------- booking reshedule
export const  bookingReschedule = async (data:{staffId:string,timePreffer:string,date:Date,bookingId:string}) =>{
   const response = await BookingAxiosInstance.patch(BOOKING_API_ROUTES.RESCHEDULE,data);
   return response;
};

//--------------------- is there booking for the customer  - check the customer has any booking -boolean
export const isThereBooking = async (vendorId:string) =>{

  const response = await BookingAxiosInstance.get(`${BOOKING_API_ROUTES.REVIEW_ELIGIBILITY}${vendorId}`);
  return response;

};