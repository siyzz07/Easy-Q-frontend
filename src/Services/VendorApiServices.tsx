import vendorAxios, { vendorAxiosInstance } from "../config/VendorAxios";
import type { IVendor, IVendorLogin } from "../Shared/types/Auth";





export const verifyEmail = async (data:IVendor) =>{
  
    let response = await vendorAxios.post('/auth/verify-email',data)
    return response

} 


export const addVendor =async (token:string) =>{

    let response = await vendorAxios.post('/auth/add-vendor',{token})

    return response
}


export const loginVendor = async (form:IVendorLogin)=>{

    const response = await vendorAxios.post('/auth/login',form)
    return response

}



export const addShopData = async (form:any) => {
       
        
    const response = await vendorAxiosInstance.post('/shop-data',form)
    return response
    

}


export  const getShopData = async ()  =>{

    const response = await vendorAxiosInstance.get('/shop-data')
    return response

}



export const logoutVendor = async () =>{

    const response = await vendorAxiosInstance.post('/logout')
    return response
}