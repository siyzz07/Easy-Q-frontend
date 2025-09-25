import React from "react";
import type { FC } from "react";
import LoginForm from "../../components/Customer/LoginForm";
import Image from "../../components/Shared/Image";
import image from "../../assets/customer-login-image.png";

const Login: FC = () => {
  return (
    <div className="min-h-screen  flex">
      {/* Left side  */}
      <Image
        image={image}
        style={"bg-gradient-to-b from-[#F3F3F3] to-[#E6E0DD]"}
      />

      {/* Right side  */}
      <div className="flex-1  bg-white">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
