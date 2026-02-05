import SignupForm from "../../components/Customer/SignupForm";
import { motion } from "framer-motion";
import landingImage from "../../assets/customer-login-image.png";

const SignupPage = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 overflow-hidden py-6 ">
       
        <div className="absolute inset-0 z-0">
            <img 
              src={landingImage} 
              alt="Customer Signup" 
              className="w-full h-full object-cover blur-sm opacity-50 scale-105"
            />
             <div className="absolute inset-0 bg-white/60" /> 
        </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[420px] p-4"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/50 max-h-[90vh] overflow-y-auto scrollbar-hide">
           <SignupForm />
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
