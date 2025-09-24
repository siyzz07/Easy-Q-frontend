import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Customer/LoginPage'
import SignupPage from '../pages/Customer/SignupPage'

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignupPage/>} />
    </Routes>
  )
}

export default CustomerRoutes