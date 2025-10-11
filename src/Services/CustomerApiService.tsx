

import {  CustomerAxiosInstance } from "../config/AxiosInstance";
import type { ICustomer, ICustomerLogin } from "../Shared/types/Types";







export const customerSignup = async(form:ICustomer) =>{
    const response = await CustomerAxiosInstance.post('/auth/signup',form)
    
    return response
    
}

// -----------------------------------------verifyEmail

export const verifyEmail = async (token:string)=>{
    
    const response = await CustomerAxiosInstance.post('/auth/verify-email',{token }   )
    return response
}


// -----------------------------------------login customer

export const loginCustomer = async (form:ICustomerLogin) =>{

const response = await CustomerAxiosInstance.post('/auth/login',form)
return response

}


//---------------------------------------------------- get shop Data

export const getShopsData = async () =>{

    const response = await CustomerAxiosInstance.get('/shops-data')
    return response
}


//----------------------------------------------------verify Email for reset password
export const verificationForResetPassword =  async (email:string) =>{

    const response = await CustomerAxiosInstance.post('/reset-password/verify',{email})
    return response
}


//------------------------------------------------------reset password
export const resetCustomerPasword = async(data:{token:string;password:string}) =>{

            const response = await CustomerAxiosInstance.post('/reset-password',data)
            return response

}
