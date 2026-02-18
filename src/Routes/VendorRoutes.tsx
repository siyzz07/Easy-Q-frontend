
import { Route, Routes } from "react-router-dom";
import BookingsPage from "../pages/Vendor/BookingsPage";
import LoginPage from "../pages/Vendor/LoginPage";
import SignupPage from "../pages/Vendor/SignupPage";
import LoadingPage from "../pages/Vendor/LodingPage";
import ShopDataPage from "../pages/Vendor/ShopDataPage";
import Layout from "../pages/Vendor/Layout/Layout";
import VendorProtectedRoute from "./ProtectedRoutes/VendorProtectedRoute";
import PublicdRoute from "./PublicRoutes/PublicRoute";
import { VENDOR_ROUTES } from "../Shared/Constants/RouteConstants";
import ForgotPassword from "../pages/Vendor/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Vendor/ResetPasswordPage";
import ProfilePage from "../pages/Vendor/ProfilePage";
import StaffPage from "../pages/Vendor/StaffPage";
import ServicePage from "../pages/Vendor/ServicePage";
import DashboardVendor from "../pages/Vendor/DashboardVendor";
import VendorBookingDetailsPage from "../pages/Vendor/VendorBookingDetailsPage";
import VendorWalletPage from "../pages/Vendor/VendorWalletPage";
import WorksPage from "../pages/Vendor/WorksPage";
import AppliedWorksPage from "../pages/Vendor/AppliedWorksPage";
import VendorContractsPage from "../pages/Vendor/VendorContractsPage";
import VendorContractDetailsPage from "../pages/Vendor/VendorChatPage";
import VideoCall from "../components/Shared/VideoCall";
import NotFoundPage from "../pages/Vendor/NotFoundPage";



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
             <DashboardVendor/>
            </VendorProtectedRoute>
          }
        />

        <Route
          path={VENDOR_ROUTES.SERVICES}
          element={
            <VendorProtectedRoute>
              <ServicePage/>
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

        <Route 
          path={VENDOR_ROUTES.STAFFS}
          element={
            <VendorProtectedRoute>
              <StaffPage/>
            </VendorProtectedRoute>
          }/>

        <Route 
          path={VENDOR_ROUTES.BOOKINGS}
          element={
            <VendorProtectedRoute>
              <BookingsPage/>
            </VendorProtectedRoute>
          }/>

        <Route 
          path={VENDOR_ROUTES.VIEW_BOOKING}
          element={
            <VendorProtectedRoute>
              <VendorBookingDetailsPage/>
            </VendorProtectedRoute>
          }/>

        <Route 
          path={VENDOR_ROUTES.WALLET}
          element={
            <VendorProtectedRoute>
              <VendorWalletPage/>
            </VendorProtectedRoute>
          }/>

        <Route 
          path={VENDOR_ROUTES.WORKS}
          element={
            <VendorProtectedRoute>
              <WorksPage/>
            </VendorProtectedRoute>
          }/>

        <Route 
          path={VENDOR_ROUTES.APPLIED_WORKS}
          element={
            <VendorProtectedRoute>
              <AppliedWorksPage/>
            </VendorProtectedRoute>
          }/>

        <Route 
          path={VENDOR_ROUTES.CONTRACTS}
          element={
            <VendorProtectedRoute>
              <VendorContractsPage/>
            </VendorProtectedRoute>
          }/>

        <Route 
          path={VENDOR_ROUTES.CONTRACT_DETAILS}
          element={
            <VendorProtectedRoute>
              <VendorContractDetailsPage/>
            </VendorProtectedRoute>
          }/>
        <Route 
          path={VENDOR_ROUTES.VIDEO_CALL}
          element={
            <VendorProtectedRoute>
              <VideoCall/>
            </VendorProtectedRoute>
          }/>

      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default VendorRoutes;
