import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/Admin/LoginPage'
import Layout from '../pages/Admin/Layout/Layout'
import Dashboard from '../components/Admin/Dashboard'
import AdminPublicdRoute from './PublicRoutes/AdminPublicRoute'
import AdminProtectedRoute from './ProtectedRoutes/AdminProtectedRoute'
import PublicdRoute from './PublicRoutes/PublicRoute'
import { ADMIN_ROUTES } from '../Shared/Constants/RouteConstants'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path= {ADMIN_ROUTES.LOGIN} element={
       <PublicdRoute>
         <LoginPage/>
       </PublicdRoute>
        
        
        } />

      <Route path={ADMIN_ROUTES.BASE} element={
        <AdminProtectedRoute>
          <Layout/>
        </AdminProtectedRoute>
        
        } >

      <Route index element={
        <AdminProtectedRoute>
          <Dashboard/>
        </AdminProtectedRoute>
        
        } />
      
      </Route>




    </Routes>
  )
}

export default AdminRoutes