
import {  VendorAxiosInstance } from "../config/AxiosInstance";
import type { IService, IStaff, IVendor, IVendorLogin } from "../Shared/types/Types";




//---------------------email verification in signup page
export const verifyEmail = async (data:any) =>{
  
    let response = await VendorAxiosInstance.post("/auth/verify-email",data);
    return response;

}; 

//----------------------add vendor after verifing
export const addVendor =async (token:string) =>{

    let response = await VendorAxiosInstance.post("/auth/add-vendor",{token});

    return response;
};

//-----------------------login vendor
export const loginVendor = async (form:IVendorLogin)=>{

    const response = await VendorAxiosInstance.post("/auth/login",form);
    return response;

};


//------------------------ add shop data for first time login vendors
export const addShopData = async (form:any) => {
    
    
    const response = await VendorAxiosInstance.post("/shop-data",form);
    return response;
    
    
};
//------------------------ get vendors service types that added by admin 
export const getShopType = async () => {
    
    const response = await VendorAxiosInstance.get("/shop-type");
    return response;
    
    
};

// --------------------------get the shop data
export  const getShopData = async ()  =>{

    const response = await VendorAxiosInstance.get("/shop-data");
    return response;

};


//---------------------------verify email for reset password
export const verificationForResetPassword =  async (email:string) =>{

    const response = await VendorAxiosInstance.post("/reset-password/verify",{email});
    return response;
};

//---------------------------reset password
export const resetPasword = async(data:{token:string;password:string}) =>{

            const response = await VendorAxiosInstance.post("/reset-password",data);
            return response;

};


//---------------------------logout vendor
export const logoutVendor = async () =>{
    
    const response = await VendorAxiosInstance.post("/logout");
    return response;
};


/**
 * 
 *         dashboard 
 * 
 * 
 */
export const vendorDashboard = async () =>{
    const response = await VendorAxiosInstance.get('/dashboard/data')
    return response
}



/**
 * 
 *         staff api services 
 * 
 * 
 */

//--------------------------- add new Staff
export const addStaff = async (form :IStaff) =>{
    
    const response = await VendorAxiosInstance.post('/staff/add-staff',form)
    return response
}

//--------------------------- get Staff data
export const getAllStffs = async() =>{
    const response = await VendorAxiosInstance.get('/staff')
    return response
} 
//--------------------------- edit Staff data
export const editStaff = async (form:IStaff) =>{
    const response =  await VendorAxiosInstance.put('/staff/edit-staff',form)
    return response
}



/***
 * 
 * 
 *  serive api service
 * 
*/

//--------------------------- add new shop service
export const addService = async (formData:IService) =>{
    const response = await VendorAxiosInstance.post('/service/add-service',formData)
    return response
}

//--------------------------- get services
export const getServices = async () =>{
    const response = await VendorAxiosInstance.get('/service/get-service')
    return response
}

//--------------------------- edit services
export const editServices = async (form:IService) =>{
    const response = await VendorAxiosInstance.put('/service/edit-service',form)
    return response
}