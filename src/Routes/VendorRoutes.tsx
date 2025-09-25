import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/Vendor/LoginPage'
import SignupPage from '../pages/Vendor/SignupPage'
import OtpPage from '../pages/Vendor/OtpPage'

const VendorRoutes = () => {
  return (

    <Routes>
        <Route path='/login' element ={ <LoginPage/>} />
        <Route path='/signup' element = {<SignupPage/>} />
        <Route path='/signup/otp' element = {<OtpPage/>} />
    </Routes>
  )
}

export default VendorRoutes