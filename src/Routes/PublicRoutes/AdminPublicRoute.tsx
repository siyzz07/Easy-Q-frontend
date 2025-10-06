import type { ReactNode } from "react"
import { useSelector } from "react-redux"
import type { IReduxStore } from "../../Shared/types/Auth"
import { Navigate } from "react-router-dom"











interface IVProtectedRoute {
    children : ReactNode
}


const AdminPublicdRoute = ({children}:IVProtectedRoute) =>{

  let isCustomerAuthenticated = useSelector((state:IReduxStore)=> state.adminSlice.isAuthenticated)

    
    if(isCustomerAuthenticated){
        return <Navigate to='/admin' replace />
    }


    return <>{children}</>
}

export default AdminPublicdRoute