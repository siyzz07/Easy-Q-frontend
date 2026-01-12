import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
// import type { IVendorState } from "../../Redux/VendorAuthSlice";
import { data, Navigate } from "react-router-dom";
import { getShopData } from "../../Services/ApiService/VendorApiServices";
import { hasShopData, shopData } from "../../Redux/VendorSlice";

interface IVProtectedRoute {
  children: ReactNode;
}

// interface IState {
//     vendorAuth:IVendorState
// }

const VendorProtectedRoute = ({ children }: IVProtectedRoute) => {
  const dispatch = useDispatch();
  const isVendorAuthenticated = useSelector(
    (state: any) => state.vendorSlice.isAuthenticated
  );
  useEffect(() => {
    const vendorData = async () => {
      let response = await getShopData();
      console.log("---------------", response);

      if (response) {
        dispatch(shopData(response.data.data));
        dispatch(hasShopData(response.data.data.hasShop));
      }
    };
    if (isVendorAuthenticated) {
      vendorData();
    }
  }, []);

  if (!isVendorAuthenticated) {
    return <Navigate to="/vendor/login" replace />;
  }

  return <>{children}</>;
};

export default VendorProtectedRoute;
