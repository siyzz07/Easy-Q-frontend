import Sidebar from "../../../components/Admin/Sidebar";
import Navbar from "../../../components/Admin/Navbar";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans selection:bg-primary/30 selection:text-foreground">
      {/* Sidebar - Persistent navigation */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Dynamic ambient background blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-10 pointer-events-none animate-pulse" />
        <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] -z-10 pointer-events-none animate-bounce duration-[10000ms]" />

        <Navbar />

        <main className="flex-1 overflow-y-auto scroll-smooth relative custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.01, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
