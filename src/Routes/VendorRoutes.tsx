import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/Vendor/LoginPage'

const VendorRoutes = () => {
  return (

    <Routes>
        <Route path='/login' element ={ <LoginPage/>} />
    </Routes>
  )
}

export default VendorRoutes