import {  adminAxiosInstance } from "../config/AxiosInstance";



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