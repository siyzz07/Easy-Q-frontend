import {  adminAxiosInstance } from "../config/AxiosInstance";
import type { IServiceVendorTypes } from "../Shared/types/Types";



//--------------------------------------------------------------admin login
export const loginAdmin = async (value :{email:string;password:string}) =>{
    
    
    const response =  await adminAxiosInstance.post("/auth/login",value);
    return response;
    
    
};

//--------------------------------------------------------------admin logout
export const logoutAdmin = async () =>{
    
    const response = await adminAxiosInstance.post("/logout");
    return response;
};


//--------------------------------------------------------------get all customers data
export const getCustomersData = async() =>{
    
    const response = await adminAxiosInstance.get("/data/customers");
    return response;
    
    
};
//--------------------------------------------------------------block the customer

export const blockCustomer= async(id:string) =>{
    
    const response = await adminAxiosInstance.post("/data/block-customer",{id});
    return response;
    
    
};
//--------------------------------------------------------------get all vendor data
export const getVendorsData = async () =>{
    
    const response = await adminAxiosInstance.get("/data/vendors");
    return response;
    
};
//--------------------------------------------------------------block vendors
export const blockVendor= async(id:string) =>{
    
    const response = await adminAxiosInstance.post("/data/block-vendor",{id});
    return response;
    
    
};


//--------------------------------------------------------------get service types
export const getServiceTypes = async() =>{
    
    const response = await adminAxiosInstance.get('service/get-services')
    return response
}


//--------------------------------------------------------------add service types
export const addServiceType = async (form:{serviceName:string;description:string}) =>{
    
    const response = await adminAxiosInstance.post("service/add-service",form)
    return response
    
}

//--------------------------------------------------------------edit service types
export const editServiceType = async (form:IServiceVendorTypes) =>{
    const response = await adminAxiosInstance.put('/service/edit-service',form)
    
   return  response
}



//--------------------------------------------------------------show vendors request
export const vendorsRequests = async () =>{
    
    const response = await adminAxiosInstance.get('/data/vendors-request')
    return response
}

//--------------------------------------------------------------vendors request reject
export const vendrRequestReject = async(id:string) =>{
    const response = await adminAxiosInstance.post('/data/reject-vendor',{id})
    return response
}
//--------------------------------------------------------------vendors request verified
export const vendrRequestVerified = async(id:string) =>{
    const response = await adminAxiosInstance.post('/data/verified-vendor',{id})
    return response
}

/**
 * dashboared api
 * 
*/

//-------------------------------------------------------------- get admin dashboard data
export const adminDashbordData = async () =>{

    const response = await adminAxiosInstance.get('/admin-dashboard')
    return response

}