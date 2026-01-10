

import { number, string } from "yup";
import {  authAxiosInstance, CustomerAxiosInstance } from "../../config/AxiosInstance";
import type { IBookingPayload, ICustomer, ICustomerAddress, ICustomerLogin } from "../../Shared/types/Types";







export const customerSignup = async(form:ICustomer) =>{
    const response = await authAxiosInstance.post("/auth/verify-email",form);
    
    return response;
    
};

// -----------------------------------------verifyEmail

export const verifyEmail = async (token:string)=>{
      
        const response = await authAxiosInstance.post("/auth/add-customer",{token });
         return response;
};


// -----------------------------------------login customer

export const loginCustomer = async (form:ICustomerLogin) =>{
    console.log(form);    
const response = await authAxiosInstance.post("/auth/login",form);
return response;

};


//---------------------------------------------------- get shop Data

export const getShopsData = async ({search='',location='', page=1 , limit=10}:{search?:string;location?:string,page?:number,limit?:number}) =>{
    
    const response = await CustomerAxiosInstance.get("/customer/shops-data",{
        params:{search,location,page,limit}
    });
    return response; 
};



export const getShopDataWithPagination = async (page:number,limit:number,shopName?:string,location?:string ,filter?:string) =>{

    console.log('--',page,'--',limit,'---',shopName,'---',location);
    
    const response = await CustomerAxiosInstance.get( `/customer/shops/data?page=${page}&limit=${limit}&shopName=${shopName}&location=${location}&filter=${filter}`)
    return response
}


//----------------------------------------------------verify Email for reset password
export const verificationForResetPassword =  async (data:{email:string,role:string}) =>{

    const response = await authAxiosInstance.post("/auth/reset-password/verify",data);
    return response;
};


//------------------------------------------------------reset password
export const resetCustomerPasword = async(data:{token:string;password:string,role:string}) =>{

            const response = await authAxiosInstance.post("/auth/reset-password",data);
            return response;

};


//------------------------------------------------------get Customer data

export const getCustomerData = async () =>{
    
    const response = await CustomerAxiosInstance.get("/customer/profile/customer-data");
    return response;
    
};


//------------------------------------------------------logout
export const logoutCustomer = async () =>{
    
    const response = await authAxiosInstance.post("/auth/logout",{role:'Customer'});
    return response;
};

//------------------------------------------------------Edit profile
export const editProfile = async (form:{name:string;email:string;phone:string}) =>{
    
    const response = await CustomerAxiosInstance.post("/customer/profile/edit-profile",form);
    return response;
};

//------------------------------------------------------change passwordin in profile
export const changePassword = async (form:{currentPassword:string,password:string}) =>{
    
    const response = await CustomerAxiosInstance.post("/customer/profile/change-password",form);
    return response;
    
};


/**
 * 
 * Address
 * 
 */
//------------------------------------------------------add Address
export const postNewAddress = async (form:ICustomerAddress) =>{
    
    const response = await CustomerAxiosInstance.post("/customer/profile/add-address",form);
    return response;
    
};
//------------------------------------------------------delete Address

export const deleteCustomerAddress = async (addressId:string) =>{

    const response = await CustomerAxiosInstance.post("/customer/profile/delete-address",{addressId});
    return response;


};
//------------------------------------------------------get all address
export const getAddress = async () =>{
    
    const response = await CustomerAxiosInstance.get("/customer/profile/get-address");
    return response;
    
};
//------------------------------------------------------edit cusotmer address
export const editAddress = async (form:ICustomerAddress) =>{
    
    const reponse = await CustomerAxiosInstance.post("/customer/profile/edit-address",form);
    return reponse;
    
};
//------------------------------------------------------ get each address by id
export const getEachAddress = async (_id:string) =>{

    
    const response = await CustomerAxiosInstance.get(`/customer/profile/get-each-address`,{
        params:{_id}
    })
    return response
}

/**
 * 
 * shop  
 * 
 */
//---------------------------------------------------- get each shop data
export const getEachShopData = async (_id:string) =>{
    const response = await CustomerAxiosInstance.get(`/customer/shop-data/${_id}`,)
    return response
}

//---------------------------------------------------- get each shop service
export const getEachShopServices = async (shopId:string) =>{
    const response = await CustomerAxiosInstance.get(`/customer/shop-data/services/${shopId}`,)
    return response
}

//---------------------------------------------------- get selected service populated data

export const getSelectedSerivcePopulated = async (id:string) =>{

    const response = await CustomerAxiosInstance.get('/customer/service/get-service-populated',{
        params:{id}
    })
    return response
}

//---------------------------------------------------- get selected service
export const getSelectedSerivce = async (id:string) =>{
    const response = await CustomerAxiosInstance.get('/customer/service/get-service',{
        params:{id}
    })
    return response
}

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
    const response = await CustomerAxiosInstance.post('/customer/vendor/add-review',form)
}


/**
 * 
 * Favorite
 * 
 */
//-------------------------------------------------------- update favorite
export const favoriteUpdate = async (shopId:string,action:'add'|'remove') =>{

    const response = await CustomerAxiosInstance.post('/customer/favorite',{shopId,action})
    return response
}

//-------------------------------------------------------- get favorite
export const getFavorite = async () =>{
    const response = await CustomerAxiosInstance.get('/customer/favorite')
    return response
}
//-------------------------------------------------------- get favorite shopes
export const getFavoriteShopes = async () =>{
    const response = await CustomerAxiosInstance.get('/customer/favorite/shopes')
    return response
}

/**
 * 
 *  get service types 
 * 
 */



















//------------------------------------------------ trial api

