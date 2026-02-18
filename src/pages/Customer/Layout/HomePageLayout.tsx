import  { useEffect, useState } from "react";
import Navbar from "../../../components/Shared/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../components/Shared/Footer";
import { getAccessToken } from "../../../utils/tokenUtils";
import { useDispatch } from "react-redux";
import { fetchNotification } from "../../../Redux/notificationSlice";
import type Store from "../../../Redux/Store";


export type AppDispatch = typeof Store.dispatch;

interface CallData {
  senderName: string;
  senderImage?: string;
  roomId: string;
  type: "audio" | "video";
}

const HomePageLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [inChat, setInChat] = useState(true);

  // const [callDetails, setCallDetails] = useState<CallData | null>(null);

  const token = getAccessToken();
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    const pathSegments = pathname.split("/").filter(v => v.length > 0);
    const isInsideChat = pathSegments[0] === "customer" && pathSegments[1] === "contract" && pathSegments.length === 3;
    setInChat(!isInsideChat);
  }, [pathname]);

  useEffect(() => {
    if (token) {
      dispatch(fetchNotification());
    }
  }, [token, dispatch]);

  const menuItems = [
    { label: "Home", path: "/customer" },
    { label: "Bookings", path: "/customer/bookings" },
    { label: "Contract", path: "/customer/contract" },
    { label: "Favorite", path: "/customer/favorite" },
    { label: "About", path: "/customer/about" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar menu={menuItems} />

    

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {inChat && <Footer />}
    </div>
  );
};

export default HomePageLayout;