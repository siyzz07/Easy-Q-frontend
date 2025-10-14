// import type { ReactNode } from "react"
// import { useSelector } from "react-redux"
// import type { IReduxStore } from "../../Shared/types/Types"
// import { Navigate } from "react-router-dom"











// interface IVProtectedRoute {
//     children : ReactNode
// }


// const AdminPublicdRoute = ({children}:IVProtectedRoute) =>{

//     let isAdminAuthenticated = useSelector((state:IReduxStore)=> state.adminSlice.isAuthenticated)
//     let  isCustomerAuhenticated = useSelector((state:IReduxStore)=>state.customerSlice.isAuthenticated)
//     let isVendorAuthenticated = useSelector((state:IReduxStore) =>state.customerSlice.isAuthenticated)
    
//     if(isAdminAuthenticated){
//         return <Navigate to='/admin' replace />
//     }

//     // if(isCustomerAuhenticated){
//     //     return <Navigate to
//     // }


//     return <>{children}</>
// }

// export default AdminPublicdRoute