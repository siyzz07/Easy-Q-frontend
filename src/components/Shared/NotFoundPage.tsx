
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Calendar, User, MapPinOff } from "lucide-react";
import { Button } from "../../components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-slate-100 relative z-10"
            >
              <MapPinOff size={80} className="text-blue-700" strokeWidth={1.5} />
            </motion.div>
            

            <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-8xl font-black text-slate-900 mb-4 tracking-tighter">
            4<span className="text-blue-700">0</span>4
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
             onClick={() => navigate("/")}
            variant="outline"
            className="w-full sm:w-auto h-12 px-8 rounded-2xl border-slate-200 text-slate-600 hover:bg-white hover:text-blue-700 hover:border-blue-200 transition-all flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </Button>
          
          <Button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-blue-700 text-white hover:bg-blue-800 shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <Home size={18} />
            Home
          </Button>
        </motion.div>

       
      </div>
    </div>
  );
};

export default NotFoundPage;
