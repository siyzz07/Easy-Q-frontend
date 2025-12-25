import React, { useState } from "react";
import SignupForm from "../../components/Vendor/SignupForm";
import { motion } from "framer-motion";
import landingImage from "../../assets/vendor-login-image.png";


const SignupPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Side - Image */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-900/20 z-10" />
        <img 
          src={landingImage} 
          alt="Vendor Signup" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 left-10 z-20 text-white max-w-md">
           <h2 className="text-4xl font-bold mb-4">Start Your Journey with Easy Q.</h2>
           <p className="text-lg text-white/90">Create an account, set up your shop, and start managing bookings in minutes.</p>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center justify-center p-6 sm:p-12 md:p-24 bg-white overflow-y-auto"
      >
        <div className="w-full max-w-md h-full flex flex-col justify-center">
           <SignupForm />
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
