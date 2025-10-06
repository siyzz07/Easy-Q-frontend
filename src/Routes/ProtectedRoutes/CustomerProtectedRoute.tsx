import {  type ReactNode } from "react";
import { useSelector } from "react-redux";
import type { IReduxStore } from "../../Shared/types/Auth";
import { Navigate } from "react-router-dom";




interface IVProtectedRoute {
    children : ReactNode
}


const CustomerProtectedRoute = ({children}:IVProtectedRoute) =>{

  let isCustomerAuthenticated = useSelector((state:IReduxStore)=> state.customerSlice.isAuthenticated)
    
    
    if(!isCustomerAuthenticated){
        return <Navigate to='/customer/login' replace />
    }


    return <>{children}</>
}

export default CustomerProtectedRoute