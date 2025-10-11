import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate()
  let hasShop = useSelector((state:any) => state.vendorSlice.hasShop)
  useEffect(()=>{
      if(hasShop==false){

        navigate('/vendor/shop-data')
      }



  })




  return (
    <>
    Dashboard
    </>
  )
}

export default Dashboard