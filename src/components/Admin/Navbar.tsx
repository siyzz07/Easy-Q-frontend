import { useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const path = location?.pathname.split("/").filter(Boolean);
  const page = path[1]
    ? path[1].charAt(0).toUpperCase() + path[1].slice(1).replace("-", " ")
    : "Dashboard";

  return (
    <header className="sticky bg-black top-0 z-30  border-b border-border px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex flex-col">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={page}
            className="text-2xl font-bold text-white text-foreground tracking-tight"
          >
            {page}
          </motion.h1>
          
        </div>

        <div className="flex items-center gap-6">
        

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-6 border-l border-border">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm text-white font-bold  leading-none">Administrator</span>
              <span className="text-[10px] items-center gap-1 font-semibold text-primary uppercase tracking-tighter mt-1">Super Admin</span>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 p-0.5 shadow-lg shadow-primary/20 cursor-pointer"
            >
              <div className="w-full h-full rounded-[10px] bg-background flex items-center justify-center text-primary">
                <User size={20} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
