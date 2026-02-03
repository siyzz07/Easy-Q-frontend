import React, { useEffect, useState } from "react";
import { 
  Calendar, 
  CreditCard, 
  Clock, 
  Hash, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convertRailwayTime } from "../../utils/convertRailwayTime";

interface IData {
  bookingDate: string;
  bookingTime: string;
  paymentMethod: string;
  totalAmount: string;
  bookingId: string;
}

const PaymentConfirmPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<IData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const bookingData = searchParams.get("id");

  useEffect(() => {
    if (!bookingData) {
      navigate("/customer");
      return;
    }
    decodeData();
  }, [bookingData]);

  const decodeData = () => {
    try {
      // Use try-catch for atob to handle non-base64 strings gracefully
      const decodedString = atob(bookingData as string);
      const parsedData = JSON.parse(decodedString);
      setData(parsedData);
    } catch (error) {
      console.error("Decoding error:", error);
      navigate("/customer");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <main className="max-w-xl mx-auto px-4 py-12 md:py-20">
        
        {/* --- Success Animation & Header --- */}
        <div className="text-center mb-10">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-25"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full shadow-lg shadow-green-200">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Booking Confirmed!</h2>
          <p className="text-slate-500 mt-2 font-medium">
            Great news! Your service has been scheduled successfully.
          </p>
        </div>

        {/* --- Receipt Style Card --- */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden mb-8">
          <div className="p-8">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">Order Summary</h4>
            
            <div className="space-y-6">
              {/* Booking ID */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-slate-100 rounded-xl text-slate-500">
                    <Hash className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Reference</p>
                    <p className="text-sm font-bold text-slate-800">#{data?.bookingId}</p>
                  </div>
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-dashed border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</p>
                    <p className="text-sm font-bold text-slate-800">{data?.bookingDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time</p>
                    <p className="text-sm font-bold text-slate-800">{convertRailwayTime(data?.bookingTime || "")}</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Payment via</p>
                    <p className="text-sm font-bold text-slate-800 capitalize">{data?.paymentMethod.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Paid</p>
                   <p className="text-xl font-black text-green-600">₹{data?.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer Helper */}
          <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex items-center justify-center space-x-2">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">A confirmation email has been sent.</span>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/customer")}
            className="group flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-slate-200"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          
          <button
            onClick={() => navigate("/customer/bookings")}
            className="group flex items-center justify-center space-x-2 bg-white hover:bg-blue-50 text-blue-600 font-bold py-4 px-6 rounded-2xl border-2 border-blue-100 transition-all duration-300"
          >
            <span>My Bookings</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Support Link */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-400 font-medium">
            Issues with your booking?{" "}
            <a href="#" className="text-blue-500 hover:text-blue-600 font-bold decoration-2 underline-offset-4 underline">
              Chat with Support
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmPage;