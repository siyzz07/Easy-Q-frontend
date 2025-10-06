import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Customer/LoginPage";
import SignupPage from "../pages/Customer/SignupPage";
import LoadingPage from "../pages/Customer/LodingPage";
import LandingPage from "../pages/Customer/LandingPage";
import HomePageLayout from "../pages/Customer/Layout/HomePageLayout";
import HomePage from "../pages/Customer/HomePage";
import CustomerProtectedRoute from "./ProtectedRoutes/CustomerProtectedRoute";
import CustomerPublicdRoute from "./PublicRoutes/CustomerPublicRoute";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <CustomerPublicdRoute>
            <Login />
          </CustomerPublicdRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <CustomerPublicdRoute>
            <SignupPage />
          </CustomerPublicdRoute>
        }
      />
      <Route
        path="/verify-email"
        element={
          <CustomerPublicdRoute>
            <LoadingPage />
          </CustomerPublicdRoute>
        }
      />

      <Route
        path="/"
        element={
          <CustomerProtectedRoute>
            <HomePageLayout />
          </CustomerProtectedRoute>
        }
      >
        <Route
          index
          element={
            <CustomerProtectedRoute>
              <HomePage />
            </CustomerProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
