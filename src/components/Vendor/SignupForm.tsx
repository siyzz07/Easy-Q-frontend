import React, { useState } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SignupForm: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-4 text-white">
      {/* Logo and the para */}
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl font-bold">Signup</h1>
        </div>
      </div>

      {/* Login form */}
      <div className="w-full max-w-md mx-auto p-6 space-y-4 bg-slate-800 rounded-3xl shadow-md">
        {/* Email */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Owner Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Phone
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            City
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            State
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Password */}

        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Country
        </label>
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

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-right mt-2">
          <span className="text-sm">Already have an account?</span>
          <a href="#" className="text-blue-400 text-sm hover:underline">
            Login
          </a>
        </div>

        {/* Log In Button */}
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-medium rounded-lg">
          Log In
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
