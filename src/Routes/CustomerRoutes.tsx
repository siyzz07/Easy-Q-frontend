import { Route, Routes } from "react-router-dom";
import Login from "../pages/Customer/LoginPage";
import SignupPage from "../pages/Customer/SignupPage";
import LoadingPage from "../pages/Customer/LodingPage";
import HomePageLayout from "../pages/Customer/Layout/HomePageLayout";
import HomePage from "../pages/Customer/HomePage";
import CustomerProtectedRoute from "./ProtectedRoutes/CustomerProtectedRoute";
import PublicdRoute from "./PublicRoutes/PublicRoute";
import { CUSTOMER_ROUTES } from "../Shared/Constants/RouteConstants";
import ForgotPasswordPage from "../pages/Customer/ForgotPassworPage";
import ResetPasswordPage from "../pages/Customer/ResetPasswordPage";
import ProfilePageLayout from "../pages/Customer/Layout/ProfilePageLayout";
import Profile from "../components/Customer/Profile";
import ChangePasswordInProfile from "../components/Customer/ChangePasswordInProfile";
import CustomerAddress from "../components/Customer/CustomerAddress";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route
        path={CUSTOMER_ROUTES.LOGIN}
        element={
          <PublicdRoute>
            <Login />
          </PublicdRoute>
        }
      />
      <Route
        path={CUSTOMER_ROUTES.SIGNUP}
        element={
          <PublicdRoute>
            <SignupPage />
          </PublicdRoute>
        }
      />
      <Route
        path={CUSTOMER_ROUTES.EMAIL_VERIFY}
        element={
          <PublicdRoute>
            <LoadingPage />
          </PublicdRoute>
        }
      />

      <Route
        path={CUSTOMER_ROUTES.FORGOT_PASSWORD}
        element={
          <PublicdRoute>
            <ForgotPasswordPage />
          </PublicdRoute>
        }
      />

        <Route 
          path={CUSTOMER_ROUTES.RESEST_PASSWORD}
          element ={
            <PublicdRoute>
              <ResetPasswordPage/>
            </PublicdRoute>
          }/>

      <Route
        path={CUSTOMER_ROUTES.BASE}
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

{/* //----------------------------------------------------------------------- */}
          <Route path="profile" element={<ProfilePageLayout/>}>
                <Route index element ={
                  <Profile/>
                }/>


                <Route path="/profile/security" element={<ChangePasswordInProfile/>} />
                <Route path = '/profile/customer-address' element ={<CustomerAddress/>} />
          </Route>
     {/* //----------------------------------------------------------------------- */}
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
