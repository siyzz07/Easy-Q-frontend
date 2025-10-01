import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Customer/LoginPage'
import SignupPage from '../pages/Customer/SignupPage'
import LoadingPage from '../pages/Customer/LodingPage'

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/verify-email' element={<LoadingPage/>}  />
    </Routes>
  )
}

export default CustomerRoutes