import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerRoutes from "./Routes/CustomerRoutes";
import VendorRoutes from "./Routes/VendorRoutes";
import AdminRoutes from "./Routes/AdminRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customer/*" element={<CustomerRoutes />} />
        <Route path="/vendor/*" element={<VendorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
