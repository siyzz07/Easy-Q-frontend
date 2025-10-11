import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { IReduxStore } from "../../Shared/types/Types";
import { Navigate } from "react-router-dom";

interface IVProtectedRoute {
  children: ReactNode;
}

const PublicdRoute = ({ children }: IVProtectedRoute) => {
  let isAdminAuthenticated = useSelector(
    (state: IReduxStore) => state.adminSlice.isAuthenticated
  );
  let isCustomerAuhenticated = useSelector(
    (state: IReduxStore) => state.customerSlice.isAuthenticated
  );
  let isVendorAuthenticated = useSelector(
    (state: IReduxStore) => state.vendorSlice.isAuthenticated
  );

  console.log('is :>> ', isAdminAuthenticated,"------",isCustomerAuhenticated,"--------",isVendorAuthenticated);

  if (isAdminAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  if (isCustomerAuhenticated) {
    return <Navigate to="/customer" replace />;
  }

  if (isVendorAuthenticated) {
    return <Navigate to="/vendor" replace />;
  }

  return <>{children}</>;
};

export default PublicdRoute;
