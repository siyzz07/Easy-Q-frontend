import adminAxios, { adminAxiosInstance } from "../config/AdminAxios";



export const loginAdmin = async (value :{email:string;password:string}) =>{


    const response =  await adminAxios.post('/auth/login',value)
    return response


}

export const logoutAdmin = async () =>{

    const response = await adminAxiosInstance.post('/logout')
    return response
}