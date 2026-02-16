
import {  authAxiosInstance, VendorAxiosInstance } from "../../config/AxiosInstance";
import type { IImage, IService, IStaff, IVendor, IVendorLogin } from "../../Shared/types/Types";
import { VENDOR_API_ROUTES } from "../../Shared/Constants/ApiEndpoints";




//---------------------email verification in signup page
export const verifyEmail = async (data:any) =>{
  
    let response = await authAxiosInstance.post(VENDOR_API_ROUTES.VERIFY_EMAIL,data);
    return response;

}; 

//----------------------add vendor after verifing
export const addVendor =async (token:string) =>{

    let response = await authAxiosInstance.post(VENDOR_API_ROUTES.ADD_VENDOR,{token});

    return response;
};

//-----------------------login vendor
export const loginVendor = async (form:IVendorLogin)=>{

    const response = await authAxiosInstance.post(VENDOR_API_ROUTES.LOGIN,form);
    return response;

};


//------------------------ add shop data for first time login vendors
export const addShopData = async (form:any) => {
    
    
    const response = await VendorAxiosInstance.post(VENDOR_API_ROUTES.ADD_SHOP_DATA,form);
    return response;
    
    
};
//------------------------ get vendors service types that added by admin 
export const getShopType = async () => {
    
    const response = await VendorAxiosInstance.get(VENDOR_API_ROUTES.GET_SHOP_TYPE);
    return response;
    
    
};

// --------------------------get the shop data
export  const getShopData = async ()  =>{
    
    const response = await VendorAxiosInstance.get(VENDOR_API_ROUTES.GET_SHOP_DATA);
    return response;
    
};
// -------------------------- edit shop data
export const editShopData = async(formData:any) =>{
    const response = await VendorAxiosInstance.put(VENDOR_API_ROUTES.EDIT_SHOP_DATA,formData);
    return response;
};


//---------------------------verify email for reset password
export const verificationForResetPassword =  async (data:{email:string,role:string}) =>{

    const response = await authAxiosInstance.post(VENDOR_API_ROUTES.VERIFY_RESET_PASSWORD,data);
    return response;
};

//---------------------------reset password
export const resetPasword = async(data:{token:string;password:string,role:string}) =>{

            const response = await authAxiosInstance.post(VENDOR_API_ROUTES.RESET_PASSWORD,data);
            return response;

};


//---------------------------logout vendor
export const logoutVendor = async () =>{
    
    const response = await authAxiosInstance.post(VENDOR_API_ROUTES.LOGOUT,{role:"Vendor"});
    return response;
};



//--------------------------- add shop images
export const addImages = async(data:IImage[])=>{
    const response = await VendorAxiosInstance.put(VENDOR_API_ROUTES.ADD_IMAGES,{data});
    return response;
};

//--------------------------- remove shop images
export const imageRemove = async (data:{publicId:string,image_id:string}) =>{
        const response = await VendorAxiosInstance.put(VENDOR_API_ROUTES.REMOVE_IMAGE,data);
        return response;
};

/**
 * 
 *         dashboard 
 * 
 * 
 */
export const  vendorDashboard = async (year?: number) =>{
    const response = await VendorAxiosInstance.get(VENDOR_API_ROUTES.DASHBOARD, {
        params: { year }
    });
    return response;
};



/**
 * 
 *         staff api services 
 * 
 * 
 */

//--------------------------- add new Staff
export const addStaff = async (form :IStaff) =>{
    
    const response = await VendorAxiosInstance.post(VENDOR_API_ROUTES.ADD_STAFF,form);
    return response;
};

//--------------------------- get Staff data
export const getAllStffs = async(page?:number,limit?:number,search?:string,isActive?:string) =>{

    const response = await VendorAxiosInstance.get(VENDOR_API_ROUTES.GET_STAFF,{
        params:{
            page,
            limit,
            search,
            isActive
        }
    });
    return response;
}; 
//--------------------------- edit Staff data
export const editStaff = async (form:IStaff) =>{
    const response =  await VendorAxiosInstance.put(VENDOR_API_ROUTES.EDIT_STAFF,form);
    return response;
};

//--------------------------- block staff date
export const blockStaffDate = async (data:{staffId:string,blockedDates:string[]}) =>{

    const response = VendorAxiosInstance.post(VENDOR_API_ROUTES.BLOCK_STAFF_DATES,data);
    return response;
};


/***
 * 
 * 
 *  serive api service
 * 
 */

//--------------------------- add new shop service
export const addService = async (formData:IService) =>{
    const response = await VendorAxiosInstance.post(VENDOR_API_ROUTES.ADD_SERVICE,formData);
    return response;
};

//--------------------------- get services
export const getServices = async (page:number,limit:number,search:string) =>{
    const response = await VendorAxiosInstance.get(VENDOR_API_ROUTES.GET_SERVICES,{
        params:{
            page,
            limit,
            search
        }
    });
    return response;
};

//--------------------------- edit services
export const editServices = async (form:IService) =>{
    const response = await VendorAxiosInstance.put(VENDOR_API_ROUTES.EDIT_SERVICE,form);
    return response;
};


//--------------------------- get selected service
export const getSelectedService = async(id:string)=>{
    const response = await VendorAxiosInstance.get(VENDOR_API_ROUTES.GET_SELECTED_SERVICE,{
        params:{
            id
        }
    });
    return response;
};