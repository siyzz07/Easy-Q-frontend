
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Vendor/LoginPage";
import SignupPage from "../pages/Vendor/SignupPage";
import LoadingPage from "../pages/Vendor/LodingPage";
import ShopDataPage from "../pages/Vendor/ShopDataPage";
import Layout from "../pages/Vendor/Layout/Layout";
import Dashboard from "../components/Vendor/Dashboard";
// import Services from "../components/Vendor/Services";
import VendorProtectedRoute from "./ProtectedRoutes/VendorProtectedRoute";
import Services from "../components/Vendor/Services";
import PublicdRoute from "./PublicRoutes/PublicRoute";
import { VENDOR_ROUTES } from "../Shared/Constants/RouteConstants";
import ForgotPassword from "../pages/Vendor/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Vendor/ResetPasswordPage";
import ProfilePage from "../pages/Vendor/ProfilePage";

const VendorRoutes = () => {
  return (
    <Routes>
      <Route
        path={VENDOR_ROUTES.LOGIN}
        element={
          <PublicdRoute>
            <LoginPage />
          </PublicdRoute>
        }
      />
      <Route
        path={VENDOR_ROUTES.SIGNUP}
        element={
          <PublicdRoute>
            <SignupPage />
          </PublicdRoute>
        }
      />

      <Route
        path={VENDOR_ROUTES.EMAIL_VERIFY}
        element={
          <PublicdRoute>
            <LoadingPage />
          </PublicdRoute>
        }
      />

      <Route
        path={VENDOR_ROUTES.FORGOT_PASSWORD}
        element={
          <PublicdRoute>
            <ForgotPassword />
          </PublicdRoute>
        }
      />

      <Route
        path={VENDOR_ROUTES.RESEST_PASSWORD}
        element={
          <PublicdRoute>
            <ResetPasswordPage />
          </PublicdRoute>
        }
      />

      <Route
        path={VENDOR_ROUTES.SHOP_DATA}
        element={
          <VendorProtectedRoute>
            <ShopDataPage />
          </VendorProtectedRoute>
        }
      />

      <Route
        path={VENDOR_ROUTES.BASE}
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
          path={VENDOR_ROUTES.SERVICES}
          element={
            <VendorProtectedRoute>
              <Services />
            </VendorProtectedRoute>
          }
        />

        <Route
          path={VENDOR_ROUTES.PROFILE}
          element={
            <VendorProtectedRoute>
              <ProfilePage />
            </VendorProtectedRoute>
          }
        />
      </Route>

      {/* <Route path="*" element={<LandingPage />} /> */}
    </Routes>
  );
};

export default VendorRoutes;
