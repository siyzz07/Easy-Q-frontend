import Sidebar from "../../../components/Admin/Sidebar";
import Navbar from "../../../components/Admin/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">

      <Sidebar />

      
      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar />

    
        <main className="flex-1 overflow-y-auto bg-secondary/20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
