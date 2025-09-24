import React from 'react'
import Image from '../../components/Customer/Image'
import SignupForm from '../../components/Customer/SignupForm'

const SignupPage = () => {
  return (
      <div className="min-h-screen  flex">
      {/* Left side  */}
      <Image />

      {/* Right side  */}
      <div className="flex-1  bg-white">
        <SignupForm />
      </div>
    </div>  
  )
}

export default SignupPage