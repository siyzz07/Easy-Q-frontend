

import {  CustomerAxiosInstance } from "../config/AxiosInstance";
import type { ICustomer, ICustomerAddress, ICustomerLogin } from "../Shared/types/Types";







export const customerSignup = async(form:ICustomer) =>{
    const response = await CustomerAxiosInstance.post("/auth/signup",form);
    
    return response;
    
};

// -----------------------------------------verifyEmail

export const verifyEmail = async (token:string)=>{
    
    const response = await CustomerAxiosInstance.post("/auth/verify-email",{token }   );
    return response;
};


// -----------------------------------------login customer

export const loginCustomer = async (form:ICustomerLogin) =>{

const response = await CustomerAxiosInstance.post("/auth/login",form);
return response;

};


//---------------------------------------------------- get shop Data

export const getShopsData = async () =>{
    
    const response = await CustomerAxiosInstance.get("/shops-data");
    return response; 
};

//---------------------------------------------------- get each shop data
export const getEachShopData = async (_id:string) =>{
    const response = await CustomerAxiosInstance.get(`/shop-data/${_id}`,)
    return response
}

//---------------------------------------------------- get each shop dservice
export const getEachShopServices = async (shopId:string) =>{
    const response = await CustomerAxiosInstance.get(`/shop-data/services/${shopId}`,)
    return response
}

//----------------------------------------------------verify Email for reset password
export const verificationForResetPassword =  async (email:string) =>{

    const response = await CustomerAxiosInstance.post("/reset-password/verify",{email});
    return response;
};


//------------------------------------------------------reset password
export const resetCustomerPasword = async(data:{token:string;password:string}) =>{

            const response = await CustomerAxiosInstance.post("/reset-password",data);
            return response;

};


//------------------------------------------------------get Customer data

export const getCustomerData = async () =>{
    
    const response = await CustomerAxiosInstance.get("/profile/customer-data");
    return response;
    
};


//------------------------------------------------------add Address
export const postNewAddress = async (form:ICustomerAddress) =>{
    
    const response = await CustomerAxiosInstance.post("/profile/add-address",form);
    return response;
    
};
//------------------------------------------------------add Address

export const deleteCustomerAddress = async (addressId:string) =>{

    const response = await CustomerAxiosInstance.post("/profile/delete-address",{addressId});
    return response;


};
//------------------------------------------------------get all address

export const getAddress = async () =>{
    
    const response = await CustomerAxiosInstance.get("/profile/get-address");
    return response;
    
};

//------------------------------------------------------edit cusotmer address
export const editAddress = async (form:ICustomerAddress) =>{
    
    const reponse = await CustomerAxiosInstance.post("/profile/edit-address",form);
    return reponse;
    
};

//------------------------------------------------------logout
export const logoutCustomer = async () =>{
    
    const response = await CustomerAxiosInstance.post("/logout");
    return response;
};

//------------------------------------------------------Edit profile
export const editProfile = async (form:{name:string;email:string;phone:string}) =>{
    
    const response = await CustomerAxiosInstance.post("/profile/edit-profile",form);
    return response;
};

//------------------------------------------------------change passwordin in profile
export const changePassword = async (form:{currentPassword:string,password:string}) =>{

    const response = await CustomerAxiosInstance.post("/profile/change-password",form);
    return response;

};