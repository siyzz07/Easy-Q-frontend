import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerRoutes from "./Routes/CustomerRoutes";
import VendorRoutes from "./Routes/VendorRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import LandingPage from "./pages/Customer/LandingPage";
import VendorPublicRoute from "./Routes/PublicRoutes/VendorPublicRoute";
import CustomerPublicdRoute from "./Routes/PublicRoutes/CustomerPublicRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/customer/*" element={<CustomerRoutes />} />
        <Route path="/vendor/*" element={<VendorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />


        <Route path="/" element ={ <LandingPage/>  } 
          
          />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
