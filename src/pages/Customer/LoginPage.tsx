import type { FC } from "react";
import LoginForm from "../../components/Customer/LoginForm";
import { motion } from "framer-motion";
import landingImage from "../../assets/landImage.jpg";

const Login: FC = () => {
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
          alt="Customer Login" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 left-10 z-20 text-white max-w-md">
           <h2 className="text-4xl font-bold mb-4">Book Your Next Appointment with Ease.</h2>
           <p className="text-lg text-white/90">Find the best services around you and book in seconds. No more waiting in lines.</p>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center justify-center p-6 sm:p-12 md:p-24 bg-white"
      >
        <div className="w-full max-w-md">
           <LoginForm />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
