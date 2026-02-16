import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Share2, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "../../components/ui/button";

import DetailsHero from "../../components/Customer/BookingDetails/DetailsHero";
import StatusStepper from "../../components/Customer/BookingDetails/BookingActionCard";
import StaffSection from "../../components/Customer/BookingDetails/StaffSection";
import LocationSection from "../../components/Customer/BookingDetails/LocationSection";
import PaymentSummary from "../../components/Customer/BookingDetails/PaymentSummary";
import ActionSidebar from "../../components/Customer/BookingDetails/ActionSidebar";
import {
  bookingCanceling,
  bookingReschedule,
  createBooking,
  getSelectedBookingData,
} from "../../Services/ApiService/BookingApiService";
import { useEffect, useRef, useState } from "react";
import type {
  IBooking,
  IBookingPayload,
  IService,
  IServiceData,
} from "../../Shared/types/Types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import BookingActionCard from "../../components/Customer/BookingDetails/BookingActionCard";
import ConfirmationModal from "../../components/Shared/ConfirmationModal";
import BookNow from "../../components/Customer/BookNow";
import { getEachShopServices, getSelectedSerivce, getSelectedSerivcePopulated } from "../../Services/ApiService/CustomerApiService";
import { razorpay } from "../../utils/razorpayUtil";


const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const called = useRef(false);
  const [bookingData, setBookingData] = useState<any | null>(null);
  const [serviceData, setServiceData] = useState<IServiceData | null>(null);
  const [cancelPopup, setCancelPopup] = useState<boolean>(false);
  const [reschedulePopup, setReschedulePopup] = useState<boolean>(false);



  console.log("bookingData :>> ", bookingData);

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    getEachBookingData();
  }, []);

  const getEachBookingData = async () => {
    try {
      if (id) {
        const response = await getSelectedBookingData(id,"Customer");
        if (response?.data?.data) {
          setBookingData(response.data.data);
        }
      } else {
        navigate("/customer/bookings");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        navigate("/customer/bookings");
      }
    }
  };

  const rescheduleBooking = async (
    values: { address: string; preferredTime: string; staff: string },
    date: Date,
    service: IService
  ) => {
    try {

      const data ={
        staffId:values.staff,
        timePreffer:values.preferredTime,
        date:date,
        bookingId:bookingData.id
      };
      const response = await bookingReschedule(data);

        if(response?.data){
          toast.success(response.data.message);
          getEachBookingData();
        }
        setReschedulePopup(false);

    } catch (error: unknown) {
      if(error instanceof AxiosError){
        toast.error(error.response?.data.message);
      }
      setReschedulePopup(false);
    }
  };

  const fetchService = async () :Promise<any>=> {
    try {
      const response = await  getEachShopServices(bookingData.shop.id as string);
    
      if (response?.data.data) {
       return response.data.data;
        //  getEachShopServices(id as string),
      }
    } catch (error: unknown) {
      console.log("error to fetch service data in reschedule page");
    }
  };

  const paymentRetry = async () => {
    let status = "failed";

    const result = await razorpay(bookingData.id);

    if (result && result == "razorpayError") {
      toast.error("Failed to load razorpay");
      return;
    } else if (result && result !== "razorpayError") {
      status = result;
    }

    const bookingPayload: IBookingPayload = {
      totalAmount: bookingData.totalAmount,
      paymentMethod: "razorpay",
      bookingId: bookingData.id,
      status: status,
    };

    const response = await createBooking(bookingPayload);

    if (response?.data.data) {
      if (response?.data.data.paymentStatus == "failed") {
        let data = {
          bookingDate: response.data.data.bookingDate,
          bookingTime: response.data.data.bookingTimeStart,
        };

        let encode = btoa(JSON.stringify(data));
        window.location.replace(`/customer/payment-failed?id=${encode}`);
      } else {
        let data = {
          bookingDate: response.data.data.bookingDate,
          bookingTime: response.data.data.bookingTimeStart,
          paymentMethod: response.data.data.paymentMethod,
          totalAmount: response.data.data.totalAmount,
        };

        let encode = btoa(JSON.stringify(data));
        window.location.replace(
          `/customer/service/booking-confirm?id=${encode}`
        );
      }
    }
  };

  const onPopupClick = async () => {

     let serviceData = await fetchService();
     let data = serviceData.find ((data:any) =>data.id == bookingData.service.id);
     if(data){
      setServiceData(data);
     }
  
    setReschedulePopup(true);
  };




  const cancelBooking = async () => {
    try {
      setCancelPopup(false);
      if (bookingData.id) {
        const response = await bookingCanceling(bookingData.id);
        if (response.data.success) {
          toast.success(response.data.message);
          getEachBookingData();
        }
      } else {
        toast.error("Error to cancel booking , inavalied booking id");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const cancelationMessage =
    "Are you sure you want to cancel this booking?Refund eligibility depends on the cancellation time.";

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          {/* Animated Spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary rounded-full animate-spin"></div>
          </div>

          <h3 className="mt-6 text-lg font-bold text-slate-800">
            Loading details...
          </h3>
          <p className="text-slate-500 text-sm">
            Please wait while we fetch your booking info.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 md:pb-12">
      {cancelPopup && (
        <ConfirmationModal
          submit={cancelBooking}
          close={() => setCancelPopup(!cancelPopup)}
          description={cancelationMessage}
        />
      )}
      {reschedulePopup && (
        <BookNow
          onClose={() => setReschedulePopup(false)}
          shopId={bookingData.shop.id}
          shopData={bookingData.shop}
          onSubmit={rescheduleBooking}
          data={serviceData as IService}
          type="reschedule"
        />
      )}
      {/* Dynamic Background Element */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-primary/5 -z-10" />

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group"
          >
            <div className="p-2 rounded-xl bg-white shadow-sm border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ChevronLeft size={20} />
            </div>
            <span className="font-semibold text-sm hidden sm:inline">
              Back to Bookings
            </span>
          </motion.button>

        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <DetailsHero bookingData={bookingData} id={id} />
            <BookingActionCard
              status={bookingData.status}
              bookingDate={bookingData.bookingDate}
              onCancel={() => {
                setCancelPopup(true);
              }}
              onReschedule={() => onPopupClick()}
            />
            {/* <StaffSection bookingData={bookingData} /> */}
            <LocationSection bookingData={bookingData} />
          </div>

          {/* Right Column: Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <PaymentSummary bookingData={bookingData} onRetry={paymentRetry} />
            {/* <ActionSidebar bookingData={bookingData} /> */}
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Bar */}
      {/* <div className="fixed bottom-6 left-4 right-4 md:hidden z-50">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-slate-900 text-white rounded-[2rem] p-4 flex items-center justify-between shadow-2xl border border-white/10"
        >
          <div className="font-black flex items-center gap-2 px-2 text-sm uppercase tracking-tight">
            <MessageSquare size={20} className="text-primary" />
            <span>Chat with Salon</span>
          </div>
          <Button variant="secondary" className="rounded-xl font-black px-6 h-12 bg-white text-slate-900 border-none hover:bg-slate-100 transition-colors">
            SUPPORT
          </Button>
        </motion.div>
      </div> */}
    </div>
  );
};

export default BookingDetailsPage;
