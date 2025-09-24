import React from "react";
import type { FC } from "react";
import LoginForm from "../../components/Customer/LoginForm";
import Image from "../../components/Customer/Image";

const Login: FC = () => {
  return (
    <div className="min-h-screen  flex">
      {/* Left side  */}
      <Image />

      {/* Right side  */}
      <div className="flex-1  bg-white">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
