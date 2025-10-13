// import type { ReactNode } from "react";
// import type { IVendorState } from "../../Redux/VendorSlice";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import type { IReduxStore } from "../../Shared/types/Types";

// interface IVProtectedRoute {
//   children: ReactNode;
// }

// // interface IState {
// //   vendorAuth: IVendorState;
// // }

// const VendorPublicRoute = ({ children }: IVProtectedRoute) => {
//   const isVendorAuthenticated = useSelector(
//     (state: IReduxStore) => state.vendorSlice.isAuthenticated
//   );

//   if (isVendorAuthenticated) {
//     return <Navigate to="/vendor" replace />;
//   }

//   return <>{children}</>;
// };

// export default VendorPublicRoute
