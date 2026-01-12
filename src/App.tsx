
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerRoutes from "./Routes/CustomerRoutes";
import VendorRoutes from "./Routes/VendorRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import LandingPage from "./pages/Customer/LandingPage";

import PublicdRoute from "./Routes/PublicRoutes/PublicRoute";
import { ADMIN_ROUTES, CUSTOMER_ROUTES, VENDOR_ROUTES } from "./Shared/Constants/RouteConstants";
import { useEffect } from "react";
import { connectSocket } from "./Services/Socket/Socket";
import { getAccessToken } from "./utils/tokenUtils";
import ScrollToTop from "./components/Shared/ScrollTop";

const App = () => {
  useEffect(() => {
  const token = getAccessToken();
  if (token) {
    connectSocket(token);
  }
}, []);

  return (
    <BrowserRouter>
    <ScrollToTop/>
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
