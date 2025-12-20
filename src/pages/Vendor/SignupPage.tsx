import React, { useState } from "react";
import SignupForm from "../../components/Vendor/SignupForm";
import { motion } from "framer-motion";
import landingImage from "../../assets/landImage.jpg";


const SignupPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={landingImage} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
      </div>

      {/* Centered Glass Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg px-4 py-8"
      >
        <SignupForm />
      </motion.div>
    </div>
  );
};

export default SignupPage;
