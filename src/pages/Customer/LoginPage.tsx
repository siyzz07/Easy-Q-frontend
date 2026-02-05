import type { FC } from "react";
import LoginForm from "../../components/Customer/LoginForm";
import { motion } from "framer-motion";
import loginImage from "../../assets/customer-login-image.png";

const Login: FC = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 overflow-hidden ">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
            <img 
              src={loginImage} 
              alt="Background" 
              className="w-full h-full object-cover blur-sm opacity-50 scale-105"
            />
            <div className="absolute inset-0 bg-white/60" /> 
        </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[400px] p-4"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/50">
           <LoginForm />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
