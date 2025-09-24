import React, { useState } from "react";
import type { FC } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-Black">
      {/* Logo and the para */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl font-bold">Easy Q</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Manage your bookings effortlessly and
          <br />
          serve customers faster!
        </p>
      </div>

      {/* Tab switcher */}
      <div className="mb-6 relative">
        <div className="flex bg-slate-200 rounded-lg p-1 relative">
          <button
            // onClick={() => setActiveTab("Customer")}
            className={`px-8 py-2 text-sm font-medium rounded-md transition-colors relative z-10 text-slate-800 bg-white`}
          >
            Customer
          </button>
          <button
            className={`px-8 py-2 text-sm font-medium rounded-md transition-colors relative z-10 cursor-pointer `}
            onClick={() => navigate("/vendor/login")}
          >
            Vendor
          </button>
        </div>
      </div>

      {/* Login form */}
      <div className="w-full max-w-md mx-auto p-6 space-y-4 bg-white ">
        {/* Email */}
        <div>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full h-12 pr-12 px-3 rounded-lg border-2 bg-white border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {/* Icon here */}
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="text-right mt-2">
            <a href="#" className="text-blue-400 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        {/* Log In Button */}
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-medium rounded-lg">
          Log In
        </button>

        {/* Create Account Button */}
        <button
          className="w-full border border-gray-500 text-black hover:bg-slate-200 h-12 text-base font-medium bg-transparent rounded-lg"
          onClick={() => navigate("/customer/signup")}
        >
          
          Create an Account
        </button>

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-4">
          By logging in, you agree to our{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Terms
          </a>{" "}
          &{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
