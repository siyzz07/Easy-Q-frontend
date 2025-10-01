

import customerAxios from "../config/CustomerAxios";
import type { ICustomer } from "../Shared/types/Auth";







export const customerSignup = async(form:ICustomer) =>{
    const response = await customerAxios.post('/auth/signup',form)
    
    
    return response
    
}

// -----------------------------------------verifyEmail

export const verifyEmail = async (token:string)=>{

    const response = await customerAxios.post('/auth/verify-email',{token }   )
    console.log(response);
    
    return response
}