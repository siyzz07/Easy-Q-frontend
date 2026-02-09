
import {  adminAxiosInstance, authAxiosInstance } from "../../config/AxiosInstance";
import type { IServiceVendorTypes } from "../../Shared/types/Types";
import { ADMIN_API_ROUTES } from "../../Shared/Constants/ApiEndpoints";




//--------------------------------------------------------------admin login
export const    loginAdmin = async (value :{email:string;password:string,role:string}) =>{
    
    
    const response =  await authAxiosInstance.post(ADMIN_API_ROUTES.LOGIN,value);
    return response;
    
    
};

//--------------------------------------------------------------admin logout
export const logoutAdmin = async () =>{
    
    const response = await authAxiosInstance.post(ADMIN_API_ROUTES.LOGOUT,{role:"Admin"});
    return response;
};





//--------------------------------------------------------------get all customers data
export const getCustomersData = async() =>{
    
    const response = await adminAxiosInstance.get(ADMIN_API_ROUTES.GET_CUSTOMERS);
    return response;
    
    
};
//--------------------------------------------------------------block the customer

export const blockCustomer= async(id:string) =>{
    const response = await adminAxiosInstance.put(ADMIN_API_ROUTES.BLOCK_CUSTOMER,{id});
    return response;
    
    
};
//--------------------------------------------------------------get all vendor data
export const getVendorsData = async (page:number,limit:number,search:string) =>{
    
    const response = await adminAxiosInstance.get(ADMIN_API_ROUTES.GET_VENDORS,{
        params:{

            page,
            limit,
            search
        }
    });
    return response;
    
};
//--------------------------------------------------------------block vendors
export const blockVendor= async(id:string) =>{
    
    const response = await adminAxiosInstance.put(ADMIN_API_ROUTES.BLOCK_VENDOR,{id});
    return response;
    
    
};


//--------------------------------------------------------------get service types
export const getServiceTypes = async() =>{
    
    const response = await adminAxiosInstance.get(ADMIN_API_ROUTES.GET_SERVICE_TYPES);
    return response;
};


//--------------------------------------------------------------add service types
export const addServiceType = async (form:{serviceName:string;description:string}) =>{
    
    const response = await adminAxiosInstance.post(ADMIN_API_ROUTES.ADD_SERVICE_TYPE,form);
    return response;
    
};

//--------------------------------------------------------------edit service types
export const editServiceType = async (form:IServiceVendorTypes) =>{
    const response = await adminAxiosInstance.put(ADMIN_API_ROUTES.EDIT_SERVICE_TYPE,form);
   return  response;
};



//--------------------------------------------------------------show vendors request
export const vendorsRequests = async () =>{
    
    const response = await adminAxiosInstance.get(ADMIN_API_ROUTES.GET_VENDORS_REQUEST);
    return response;
};

//--------------------------------------------------------------vendors request reject
export const vendrRequestReject = async(id:string) =>{
    const response = await adminAxiosInstance.post(ADMIN_API_ROUTES.REJECT_VENDOR,{id});
    return response;
};
//--------------------------------------------------------------vendors request verified
export const vendrRequestVerified = async(id:string) =>{
    const response = await adminAxiosInstance.post(ADMIN_API_ROUTES.VERIFY_VENDOR,{id});
    return response;
};

/**
 * dashboared api
 * 
 */

//-------------------------------------------------------------- get admin dashboard data
export const adminDashbordData = async () =>{

    const response = await adminAxiosInstance.get(ADMIN_API_ROUTES.DASHBOARD);
    return response;

};