import type { ReactNode } from "react"
import { useSelector } from "react-redux"
import type { IReduxStore } from "../../Shared/types/Types"
import { Navigate } from "react-router-dom"



interface IVProtectedRoute {
    children : ReactNode
}


const AdminProtectedRoute = ({children}:IVProtectedRoute) =>{

  let isAdminAuthenticated = useSelector((state:IReduxStore)=> state.adminSlice.isAuthenticated)
    
    
    if(!isAdminAuthenticated){
        return <Navigate to='/admin/login' replace />
    }


    return <>{children}</>
}

export default AdminProtectedRoute