import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerRoutes from "./Routes/CustomerRoutes";
import VendorRoutes from "./Routes/VendorRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import LandingPage from "./pages/Customer/LandingPage";
import VendorPublicRoute from "./Routes/PublicRoutes/VendorPublicRoute";
import CustomerPublicdRoute from "./Routes/PublicRoutes/CustomerPublicRoute";
import PublicdRoute from "./Routes/PublicRoutes/PublicRoute";
import { ADMIN_ROUTES, CUSTOMER_ROUTES, VENDOR_ROUTES } from "./Shared/Constants/RouteConstants";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path={CUSTOMER_ROUTES.MAIN} element={<CustomerRoutes />} />
        <Route path={VENDOR_ROUTES.MAIN} element={<VendorRoutes />} />
        <Route path={ADMIN_ROUTES.MAIN} element={<AdminRoutes />} />


        <Route path="/" element ={ 
          <PublicdRoute>
            <LandingPage/>  
          </PublicdRoute>
        } 
          
          />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
