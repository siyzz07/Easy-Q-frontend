import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/Vendor/LoginPage'
import SignupPage from '../pages/Vendor/SignupPage'
import OtpPage from '../pages/Vendor/OtpPage'
import Sidebar from '../components/Vendor/Sidebar'
import Services from '../components/Vendor/Services'
import Navbar from '../components/Vendor/Navbar'
import Layout from '../components/Vendor/Layout/Layout'

const VendorRoutes = () => {
  return (

    <Routes>
        <Route path='/login' element ={ <LoginPage/>} />
        <Route path='/signup' element = {<SignupPage/>} />
        <Route path='/signup/otp' element = {<OtpPage/>} />




        <Route path='*' element ={ <Layout/>} />
    </Routes>
  )
}

export default VendorRoutes