import React from "react";
import { LayoutDashboard,List,Calendar,CreditCard ,Users,Briefcase,FileText,User,LogOut } from 'lucide-react';
const Sidebar = () => {
  return (
    <>
      <div className="w-64 h-screen bg-slate-800 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-xl font-semibold">Easy Q</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-700 border-l-[#3B82F6]  border-l-4 text-white"
              >
                <List size={18} />
                <span>Services</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Calendar size={18} />
                <span>Bookings</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <CreditCard size={18} />
                <span>Payments</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Users size={18} />
                <span>Staffs</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Briefcase size={18} />
                <span>Works</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <FileText size={18} />
                <span>Contract</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <User size={18} />
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-700 hover:bg-slate-700 hover:text-white transition-colors w-full">
            <LogOut size={18} color="red" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
