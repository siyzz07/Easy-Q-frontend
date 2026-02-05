import React from "react";
import LoginForm from "../../components/Admin/LoginForm";
import image from "../../assets/adimn-login-image.png";
import Image from "../../components/Shared/Image";

const LoginPage = () => {
 return (
    <div className="min-h-screen  flex">
      {/* Left side  */}
      <Image  image={image} style={"bg-gradient-to-b from-[#F3F3F3] to-[#E6E0DD]"}/>

      {/* Right side  */}
      <div className="flex-1  bg-gray-900">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;