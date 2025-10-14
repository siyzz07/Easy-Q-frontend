
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Admin/LoginPage";
import Layout from "../pages/Admin/Layout/Layout";
import Dashboard from "../components/Admin/Dashboard";
import AdminProtectedRoute from "./ProtectedRoutes/AdminProtectedRoute";
import PublicdRoute from "./PublicRoutes/PublicRoute";
import { ADMIN_ROUTES } from "../Shared/Constants/RouteConstants";
import CustomerList from "../pages/Admin/CustomerListPage";
import VendorListPage from "../pages/Admin/VendorListPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path={ADMIN_ROUTES.LOGIN}
        element={
          <PublicdRoute>
            <LoginPage />
          </PublicdRoute>
        }
      />

      <Route
        path={ADMIN_ROUTES.BASE}
        element={
          <AdminProtectedRoute>
            <Layout />
          </AdminProtectedRoute>
        }
      >
        <Route
          index
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path={ADMIN_ROUTES.CUSTOMERS_DATA}
          element={
            <AdminProtectedRoute>
              <CustomerList />
            </AdminProtectedRoute>
          }
        />

        <Route
          path={ADMIN_ROUTES.VEDORS_DATA}
          element={
            <AdminProtectedRoute>
              <VendorListPage />
            </AdminProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
