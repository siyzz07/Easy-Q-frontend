import React from 'react'
import Image from '../../components/Vendor/Image';
import SignupForm from '../../components/Vendor/SignupForm';

const SignupPage = () => {
  return (
    <div className="min-h-screen  flex">
      {/* Left side - */}
        <Image/>

      {/* Right side  */}
      <div className="flex-1 bg-slate-800">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage