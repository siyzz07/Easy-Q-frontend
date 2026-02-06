
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CustomerRoutes from "./Routes/CustomerRoutes";
import VendorRoutes from "./Routes/VendorRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import LandingPage from "./pages/Customer/LandingPage";

import PublicdRoute from "./Routes/PublicRoutes/PublicRoute";
import { ADMIN_ROUTES, CUSTOMER_ROUTES, VENDOR_ROUTES } from "./Shared/Constants/RouteConstants";
import { useEffect, useState } from "react";
import { connectSocket, getSocket } from "./Services/Socket/Socket";
import { registerSocketEvents } from "./Services/Socket/SocketEvents";
import { getAccessToken } from "./utils/tokenUtils";
import ScrollToTop from "./components/Shared/ScrollTop";
import IncomingCallModal from "./components/Shared/IncomingCallModal";
import GlobalIncomingCallNotify from "./components/Shared/GlobalIncomingCallNotify";
import NotFoundPage from "./components/Shared/NotFoundPage";

const App = () => {


  useEffect(() => {
  const token = getAccessToken();
  if (token) {
    connectSocket(token);
    registerSocketEvents();
  }
}, []);

  return (
    <BrowserRouter> 
    <GlobalIncomingCallNotify/>
    <ScrollToTop/>
      <Routes>
        
        <Route path={CUSTOMER_ROUTES.MAIN} element={<CustomerRoutes />} />
        <Route path={VENDOR_ROUTES.MAIN} element={<VendorRoutes />} />
        <Route path={ADMIN_ROUTES.MAIN} element={<AdminRoutes />} />

        <Route path="/*" element ={
          <PublicdRoute>
            <NotFoundPage/>
          </PublicdRoute>
        }/>

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
