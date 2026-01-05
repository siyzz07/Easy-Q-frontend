import { useLocation } from "react-router-dom";
import { Bell, Search, User, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const path = location?.pathname.split("/").filter(Boolean);
  const page = path[1]
    ? path[1].charAt(0).toUpperCase() + path[1].slice(1).replace("-", " ")
    : "Main Dashboard";

  return (
    <header className="sticky top-0 z-30 glass-nav border-b border-white/5 px-8 py-5">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex flex-col">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-1 h-8 bg-primary rounded-full" />
            <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase italic">
              {page}
            </h1>
          </motion.div>
          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2 ml-4">
            <span className="opacity-50">Core</span>
            <span className="text-primary/50">/</span>
            <span className="text-foreground">{page}</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Quick Search */}
          <div className="hidden lg:flex items-center gap-4 bg-secondary/30 rounded-2xl border border-white/5 px-5 py-2.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all group">
            <Search size={18} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="System search..." 
              className="bg-transparent border-none focus:outline-none text-sm font-medium w-48 placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative w-12 h-12 rounded-2xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all group overflow-hidden">
               <Bell size={20} className="text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
               <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
            </button>
            
            <button className="w-12 h-12 rounded-2xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all group">
               <Zap size={20} className="text-primary animate-pulse" />
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4 pl-8 border-l border-white/5">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-black text-foreground uppercase tracking-widest">Administrator</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-tighter mt-1 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">Active Node</span>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-indigo-600 p-[2px] shadow-2xl shadow-primary/20 cursor-pointer"
            >
              <div className="w-full h-full rounded-[14px] bg-background flex items-center justify-center text-primary group">
                <User size={22} className="group-hover:scale-110 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
