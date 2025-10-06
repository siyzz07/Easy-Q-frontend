
import Navbar from '../../components/Shared/Navbar'
import Footer from '../../components/Shared/Footer'
import LandingPageBody from '../../components/Customer/LandingPageBody'
import { useEffect } from 'react'
import { customerGetAccessToken, vendorGetAccessToken } from '../../Utils/tokenUtils'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
   const navigate = useNavigate()
  useEffect(()=>{
    let  customerToken = customerGetAccessToken()
    let vendorToken = vendorGetAccessToken()

    if(vendorToken || customerToken){
          navigate('/customer/login')
    }



  })




  const menuItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Login", path: "/customer/login" },
];
  return (


     <>
      <Navbar menu={menuItems}/>
      <main>
       <LandingPageBody/>
      </main>
      <Footer/>
    </>
  )
}

export default LandingPage