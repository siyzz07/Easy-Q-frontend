


import { number, string } from "yup";
import {  authAxiosInstance, CustomerAxiosInstance } from "../../config/AxiosInstance";
import type { IBookingPayload, ICustomer, ICustomerAddress, ICustomerLogin } from "../../Shared/types/Types";
import { CUSTOMER_API_ROUTES } from "../../Shared/Constants/ApiEndpoints";






export const customerSignup = async(form:ICustomer) =>{
    const response = await authAxiosInstance.post(CUSTOMER_API_ROUTES.SIGNUP_VERIFY_EMAIL,form);
    
    return response;
    
};

// -----------------------------------------verifyEmail

export const verifyEmail = async (token:string)=>{
      
        const response = await authAxiosInstance.post(CUSTOMER_API_ROUTES.ADD_CUSTOMER,{token });
         return response;
};


// -----------------------------------------login customer

export const loginCustomer = async (form:ICustomerLogin) =>{
    
const response = await authAxiosInstance.post(CUSTOMER_API_ROUTES.LOGIN,form);
return response;

};

// ----------------------------------------- google auth
export const googleAuth = async (token:string) =>{

    const response = authAxiosInstance.post(CUSTOMER_API_ROUTES.GOOGLE_AUTH,{token});
    return response;

};


//---------------------------------------------------- get shop Data

export const getShopsData = async ({search="", page=1 , limit=10, lat,lng,distance,categories,ratings}:{search?:string,page?:number,limit?:number,lat?:number | null; lng?:number | null;  distance?:number | null; categories?:string[]|null,  ratings?:string[]|null}) =>{
    
    const response = await CustomerAxiosInstance.get(CUSTOMER_API_ROUTES.GET_SHOPS_DATA,{
        params:{
            search,
            page,
            limit,
            lat,
            lng,
            distance,
            categories,
            ratings
        }
    });
    return response; 
};



export const getShopDataWithPagination = async (page:number,limit:number,shopName?:string,location?:string ,filter?:string) =>{

    console.log("--",page,"--",limit,"---",shopName,"---",location);
    
    const response = await CustomerAxiosInstance.get( `${CUSTOMER_API_ROUTES.GET_SHOPS_DATA_PAGINATION}?page=${page}&limit=${limit}&shopName=${shopName}&location=${location}&filter=${filter}`);
    return response;
};


//----------------------------------------------------verify Email for reset password
export const verificationForResetPassword =  async (data:{email:string,role:string}) =>{

    const response = await authAxiosInstance.post(CUSTOMER_API_ROUTES.VERIFY_RESET_PASSWORD,data);
    return response;
};


//------------------------------------------------------reset password
export const resetCustomerPasword = async(data:{token:string;password:string,role:string}) =>{

            const response = await authAxiosInstance.post(CUSTOMER_API_ROUTES.RESET_PASSWORD,data);
            return response;

};


//------------------------------------------------------get Customer data

export const getCustomerData = async () =>{
    
    const response = await CustomerAxiosInstance.get(CUSTOMER_API_ROUTES.GET_CUSTOMER_DATA);
    return response;
    
};


//------------------------------------------------------logout
export const logoutCustomer = async () =>{
    
    const response = await authAxiosInstance.post(CUSTOMER_API_ROUTES.LOGOUT,{role:"Customer"});
    return response;
};

//------------------------------------------------------Edit profile
export const editProfile = async (form:{name:string;email:string;phone:string}) =>{
    
    const response = await CustomerAxiosInstance.post(CUSTOMER_API_ROUTES.EDIT_PROFILE,form);
    return response;
};

//------------------------------------------------------change passwordin in profile
export const changePassword = async (form:{currentPassword:string,password:string}) =>{
    
    const response = await CustomerAxiosInstance.post(CUSTOMER_API_ROUTES.CHANGE_PASSWORD,form);
    return response;
    
};


/**
 * 
 * Address
 * 
 */
//------------------------------------------------------add Address
export const postNewAddress = async (form:ICustomerAddress) =>{
    
    const response = await CustomerAxiosInstance.post(CUSTOMER_API_ROUTES.ADD_ADDRESS,form);
    return response;
    
};
//------------------------------------------------------delete Address

export const deleteCustomerAddress = async (addressId:string) =>{

    const response = await CustomerAxiosInstance.delete(`${CUSTOMER_API_ROUTES.DELETE_ADDRESS}${addressId}`);
    return response;


};
//------------------------------------------------------get all address
export const getAddress = async () =>{
    
    const response = await CustomerAxiosInstance.get(CUSTOMER_API_ROUTES.GET_ADDRESS);
    return response;
    
};
//------------------------------------------------------edit cusotmer address
export const editAddress = async (form:ICustomerAddress) =>{
    
    const reponse = await CustomerAxiosInstance.post(CUSTOMER_API_ROUTES.EDIT_ADDRESS,form);
    return reponse;
    
};
//------------------------------------------------------ get each address by id
export const getEachAddress = async (_id:string) =>{

    
    const response = await CustomerAxiosInstance.get(CUSTOMER_API_ROUTES.GET_EACH_ADDRESS,{
        params:{_id}
    });
    return response;
};

/**
 * 
 * shop  
 * 
 */
//---------------------------------------------------- get each shop data
export const getEachShopData = async (_id:string) =>{
    const response = await CustomerAxiosInstance.get(`${CUSTOMER_API_ROUTES.GET_EACH_SHOP_DATA}${_id}`,);
    return response;
};

//---------------------------------------------------- get each shop service
export const getEachShopServices = async (shopId:string) =>{
    const response = await CustomerAxiosInstance.get(`${CUSTOMER_API_ROUTES.GET_EACH_SHOP_SERVICES}${shopId}`,);
    return response;
};

//---------------------------------------------------- get selected service populated data

export const getSelectedSerivcePopulated = async (id:string) =>{

    const response = await CustomerAxiosInstance.get(CUSTOMER_API_ROUTES.GET_SELECTED_SERVICE_POPULATED,{
        params:{id}
    });
    return response;
};

//---------------------------------------------------- get selected service
export const getSelectedSerivce = async (id:string) =>{
    const response = await CustomerAxiosInstance.get(CUSTOMER_API_ROUTES.GET_SELECTED_SERVICE,{
        params:{id}
    });
    return response;
};

// /**
//  * 
//  * Booking  
//  * 
//  */
// //---------------------------------------------------- get checkout data
// export const createBooking = async (data: IBookingPayload) => {
//   const response = await CustomerAxiosInstance.post("/customer/booking/add-booking", data);
//   return response;
// };

// export const bookAvailableTime = async(data:{staffId:string,timePreffer:string,date:Date,serviceId:string,addressId:string,shopId:string}) =>{
    
//     const response = await CustomerAxiosInstance.post('/customer/booking/check-time',data)
//     return response
// }


/**
 * 
 * Review
 * 
 */


//------------------------------------------------------Add review
export const addReview = async(form:{rating:string,comment:string,shopId:string}) =>{
    const response = await CustomerAxiosInstance.post(CUSTOMER_API_ROUTES.ADD_VENDOR_REVIEW,form);
};


/**
 * 
 * Favorite
 * 
 */
//-------------------------------------------------------- update favorite
export const favoriteUpdate = async (shopId:string,action:"add"|"remove") =>{

    const response = await CustomerAxiosInstance.post(CUSTOMER_API_ROUTES.FAVORITE,{shopId,action});
    return response;
};

//-------------------------------------------------------- get favorite
export const getFavorite = async () =>{
    const response = await CustomerAxiosInstance.get(CUSTOMER_API_ROUTES.FAVORITE);
    return response;
};
//-------------------------------------------------------- get favorite shopes
export const getFavoriteShopes = async () =>{
    const response = await CustomerAxiosInstance.get(CUSTOMER_API_ROUTES.FAVORITE_SHOPS);
    return response;
};

/**
 * 
 *  get service types 
 * 
 */



















//------------------------------------------------ trial api

