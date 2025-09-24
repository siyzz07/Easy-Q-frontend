import React from "react";
import LoginForm from "../../components/Vendor/LoginForm";
import image from "../../assets/vendor-login-image.png";
import Image from "../../components/Vendor/Image";


const LoginPage = () => {



  



  return (
    <div className="min-h-screen  flex">
      {/* Left side - */}
        <Image/>

      {/* Right side  */}
      <div className="flex-1 bg-slate-800">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
