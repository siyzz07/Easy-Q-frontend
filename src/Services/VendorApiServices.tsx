
import {  VendorAxiosInstance } from "../config/AxiosInstance";
import type { IVendor, IVendorLogin } from "../Shared/types/Types";




//---------------------email verification in signup page
export const verifyEmail = async (data:IVendor) =>{
  
    let response = await VendorAxiosInstance.post('/auth/verify-email',data)
    return response

} 

//----------------------add vendor after verifing
export const addVendor =async (token:string) =>{

    let response = await VendorAxiosInstance.post('/auth/add-vendor',{token})

    return response
}

//-----------------------login vendor
export const loginVendor = async (form:IVendorLogin)=>{

    const response = await VendorAxiosInstance.post('/auth/login',form)
    return response

}


//------------------------ add shop data for first time login vendors
export const addShopData = async (form:any) => {
       
        
    const response = await VendorAxiosInstance.post('/shop-data',form)
    return response
    

}

// --------------------------get the shop data
export  const getShopData = async ()  =>{

    const response = await VendorAxiosInstance.get('/shop-data')
    return response

}


//---------------------------verify email for reset password
export const verificationForResetPassword =  async (email:string) =>{

    const response = await VendorAxiosInstance.post('/reset-password/verify',{email})
    return response
}

//---------------------------reset password
export const resetPasword = async(data:{token:string;password:string}) =>{

            const response = await VendorAxiosInstance.post('/reset-password',data)
            return response

}


//---------------------------logout vendor
export const logoutVendor = async () =>{

    const response = await VendorAxiosInstance.post('/logout')
    return response
}