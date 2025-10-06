import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/Admin/LoginPage'
import Layout from '../pages/Admin/Layout/Layout'
import Dashboard from '../components/Admin/Dashboard'
import AdminPublicdRoute from './PublicRoutes/AdminPublicRoute'
import AdminProtectedRoute from './ProtectedRoutes/AdminProtectedRoute'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={
        <AdminPublicdRoute>
          <LoginPage/>
        </AdminPublicdRoute>
        
        } />

      <Route path='/' element={
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