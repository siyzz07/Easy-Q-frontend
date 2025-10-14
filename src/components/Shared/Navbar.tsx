import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, X,User } from "lucide-react";
import { customerGetAccessToken, getAccessToken } from "../../Utils/tokenUtils";

interface NavbarProps {
  menu: { label: string; path: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ menu }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = getAccessToken();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white text-[20px] font-bold">
            Q
          </span>
          <span className="text-xl font-semibold tracking-tight">
            Easy <span className="text-black">Q</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {menu.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-gray-600 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {token ? (
            <>
              <button className="relative rounded-full border border-gray-300 p-2 hover:bg-gray-200">
                <Bell className="h-4 w-4 text-gray-700" />
                <span className="sr-only">Notifications</span>
              </button>

              <div
              onClick={()=>navigate("profile")}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                <User/>
              </div>
            </>
          ) : (
            <Link
              to="/customer/signup"
              className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          )}

      
          <button
            className="md:hidden p-2 rounded-md border border-gray-300"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>


      {isOpen && (
        <nav className="md:hidden bg-gray-100 border-t border-gray-200">
          <ul className="flex flex-col gap-2 px-4 py-3">
            {menu.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="block text-gray-700 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
