import React from "react";
import image from "../../assets/vendor-login-image.png";
import Image from "../../components/Shared/Image";

import SignupForm from "../../components/Vendor/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen  flex">
      {/* Left side - */}
      <Image image={image} style={"bg-gradient-to-b from-white to-[#E6E0DD]"} />

      {/* Right side  */}
      <div className="flex-1 bg-slate-800">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
