
import {  authAxiosInstance, VendorAxiosInstance } from "../../config/AxiosInstance";
import type { IImage, IService, IStaff, IVendor, IVendorLogin } from "../../Shared/types/Types";




//---------------------email verification in signup page
export const verifyEmail = async (data:any) =>{
  
    let response = await authAxiosInstance.post("/auth/verify-email",data);
    return response;

}; 

//----------------------add vendor after verifing
export const addVendor =async (token:string) =>{

    let response = await authAxiosInstance.post("/auth/add-vendor",{token});

    return response;
};

//-----------------------login vendor
export const loginVendor = async (form:IVendorLogin)=>{

    const response = await authAxiosInstance.post("/auth/login",form);
    return response;

};


//------------------------ add shop data for first time login vendors
export const addShopData = async (form:any) => {
    
    
    const response = await VendorAxiosInstance.post("/vendor/shop-data",form);
    return response;
    
    
};
//------------------------ get vendors service types that added by admin 
export const getShopType = async () => {
    
    const response = await VendorAxiosInstance.get("/vendor/shop-type");
    return response;
    
    
};

// --------------------------get the shop data
export  const getShopData = async ()  =>{
    
    const response = await VendorAxiosInstance.get("/vendor/shop-data");
    return response;
    
};
// -------------------------- edit shop data
export const editShopData = async(formData:any) =>{
    const response = await VendorAxiosInstance.put('/vendor/shop/edit-shop',formData)
    return response
}


//---------------------------verify email for reset password
export const verificationForResetPassword =  async (data:{email:string,role:string}) =>{

    const response = await authAxiosInstance.post("/auth/reset-password/verify",data);
    return response;
};

//---------------------------reset password
export const resetPassword = async(data:{token:string;password:string,role:string}) =>{

            const response = await authAxiosInstance.post("/auth/reset-password",data);
            return response;

};


//---------------------------logout vendor
export const logoutVendor = async () =>{
    
    const response = await authAxiosInstance.post("/auth/logout",{role:'Vendor'});
    return response;
};



//--------------------------- add shop images
export const addImages = async(data:IImage)=>{
    const response = await VendorAxiosInstance.put('/vendor/shop/image',{data})
    return response
}

//--------------------------- remove shop images
export const imageRemove = async (data:{publicId:string,image_id:string}) =>{
        const response = await VendorAxiosInstance.put('/vendor/shop/delete-image',data)
        return response
}

/**
 * 
 *         dashboard 
 * 
 * 
 */
export const vendorDashboard = async () =>{
    const response = await VendorAxiosInstance.get('/vendor/dashboard/data')
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
    
    const response = await VendorAxiosInstance.post('/vendor/staff/add-staff',form)
    return response
}

//--------------------------- get Staff data
export const getAllStffs = async(page:number,limit:number,search:string) =>{

    const response = await VendorAxiosInstance.get(`/vendor/staff/`,{
        params:{page,limit,search}
    })
    return response
} 
//--------------------------- edit Staff data
export const editStaff = async (form:IStaff) =>{
    const response =  await VendorAxiosInstance.put('/vendor/staff/edit-staff',form)
    return response
}

//--------------------------- block staff date
export const blockStaffDate = async (data:{staffId:string,blockedDates:string[]}) =>{

    const response = VendorAxiosInstance.post('/vendor/staff/block-dates',data)
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
    const response = await VendorAxiosInstance.post('/vendor/service/add-service',formData)
    return response
}

//--------------------------- get services
export const getServices = async (page:number,limit:number,search:string) =>{
    const response = await VendorAxiosInstance.get('/vendor/service/get-service',{
        params:{
            page,
            limit,
            search
        }
    })
    return response
}

//--------------------------- edit services
export const editServices = async (form:IService) =>{
    const response = await VendorAxiosInstance.put('/vendor/service/edit-service',form)
    return response
}