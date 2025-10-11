import {  adminAxiosInstance } from "../config/AxiosInstance";




export const loginAdmin = async (value :{email:string;password:string}) =>{


    const response =  await adminAxiosInstance.post('/auth/login',value)
    return response


}

export const logoutAdmin = async () =>{

    const response = await adminAxiosInstance.post('/logout')
    return response
}