import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Vendor/LoginPage";
import SignupPage from "../pages/Vendor/SignupPage";
import OtpPage from "../pages/Vendor/OtpPage";
import LoadingPage from "../pages/Vendor/LodingPage";
import ShopdataExtra from "../components/Vendor/ShopdataExtra";
import ShopDataPage from "../pages/Vendor/ShopDataPage";
import DeleteButton from "../components/Vendor/DeleteButton";
import Layout from "../components/Vendor/Layout/Layout";
import LandingPage from "../pages/Customer/LandingPage";
import Dashboard from "../components/Vendor/Dashboard";
import Services from "../components/Vendor/Services";
import VendorProtectedRoute from "./ProtectedRoutes/VendorProtectedRoute";
import VendorPublicRoute from "./PublicRoutes/VendorPublicRoute";

const VendorRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <VendorPublicRoute>
            <LoginPage />
          </VendorPublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <VendorPublicRoute>
            <SignupPage />
          </VendorPublicRoute>
        }
      />

      <Route
        path="/verify-email"
        element={
          <VendorPublicRoute>
            <LoadingPage />
          </VendorPublicRoute>
        }
      />
      <Route
        path="/shop-data"
        element={
          <VendorProtectedRoute>
            <ShopDataPage />
          </VendorProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <VendorProtectedRoute>
            <Layout />
          </VendorProtectedRoute>
        }
      >
        <Route
          index
          element={
            <VendorProtectedRoute>
              <Dashboard />
            </VendorProtectedRoute>
          }
        />

        <Route
          path="services"
          element={
            <VendorProtectedRoute>
              <Services />
            </VendorProtectedRoute>
          }
        />
      </Route>

      {/* <Route path="*" element={<LandingPage />} /> */}
    </Routes>
  );
};

export default VendorRoutes;
