import React from "react";
import LoginForm from "../../components/Vendor/LoginForm";
import image from "../../assets/vendor-login-image.png";
import Image from "../../components/Shared/Image";

const LoginPage = () => {
  return (
    <div className="min-h-screen  flex">
      <Image
        image={image}
        style={"bg-gradient-to-b from-[#F6F3F1] to-[#E6E0DD]"}
      />

      {/* Right side  */}
      <div className="flex-1 bg-slate-800">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
