import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  CheckCircle2,
  XCircle,
  Scissors,
  IndianRupee,
  Package,
  MessageSquare,
  Coins
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { bookingRefund, getSelectedBookingData, updateBookingStatus } from "../../Services/ApiService/BookingApiService";
import { convertRailwayTime } from "../../utils/convertRailwayTime";

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
  pending: { 
    color: "text-amber-600", 
    bg: "bg-amber-50", 
    icon: <Clock size={20} />, 
    label: "Pending" 
  },
  confirmed: { 
    color: "text-blue-600", 
    bg: "bg-blue-50", 
    icon: <CheckCircle2 size={20} />, 
    label: "Confirmed" 
  },
  completed: { 
    color: "text-emerald-600", 
    bg: "bg-emerald-50", 
    icon: <CheckCircle2 size={20} />, 
    label: "Completed" 
  },
  cancelled: { 
    color: "text-rose-600", 
    bg: "bg-rose-50", 
    icon: <XCircle size={20} />, 
    label: "Cancelled" 
  },
};

const PAYMENT_STATUS_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  paid: { color: "text-emerald-600", bg: "bg-emerald-100/50", label: "Paid" },
  pending: { color: "text-amber-600", bg: "bg-amber-100/50", label: "Pending" },
  failed: { color: "text-rose-600", bg: "bg-rose-100/50", label: "Failed" },
};

const VendorBookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const called = useRef(false);
  const [bookingData, setBookingData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    fetchBookingDetails();
  }, []);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      console.log("id :>> ", id);
      if (id) {
        console.log("booking data clling");
        const response = await getSelectedBookingData(id);
        console.log("bookingData :>> ", response);
        if (response?.data?.data) {
          setBookingData(response.data.data);
        }
      } else {
        navigate("/vendor/bookings");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error("Invalid booking ID");
        navigate("/vendor/bookings");
      }
    } finally {
      setLoading(false);
    }
  };


  const refund =  async(id:string) =>{

    try{

      console.log("refund funcion called");
      const response = await bookingRefund(id);
      if(response?.data){

        toast.success(response.data.message);
        fetchBookingDetails();
      }
    }catch(error:unknown){
      if(error instanceof AxiosError){
         
        toast.error(error.response?.data.message);
      }
    }

  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!bookingData?._id) return;
    
    try {
      setUpdating(true);
      const response = await updateBookingStatus(bookingData._id, newStatus);
      
      if (response?.data?.success) {
        toast.success(`Booking ${newStatus} successfully`);
        setBookingData({ ...bookingData, status: newStatus });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to update booking status");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <h3 className="mt-6 text-lg font-bold text-gray-800">Loading booking details...</h3>
          <p className="text-gray-500 text-sm">Please wait</p>
        </motion.div>
      </div>
    );
  }

  if (!bookingData) {
    return null;
  }

  const currentStatus = bookingData.status || "pending";
  const statusConfig = STATUS_CONFIG[currentStatus];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/vendor/bookings")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all group"
          >
            <div className="p-2 rounded-xl bg-white shadow-sm border border-gray-200 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <ChevronLeft size={20} />
            </div>
            <span className="font-semibold text-sm hidden sm:inline">Back to Bookings</span>
          </motion.button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Booking ID:</span>
            <span className="text-sm font-bold text-gray-900">{bookingData.bookingId}</span>
          </div>
        </div>

        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${statusConfig.bg} border-2 border-${currentStatus === "pending" ? "amber" : currentStatus === "cancelled" ? "red" : currentStatus === "completed" ? "emerald" : "rose"}-200 rounded-2xl p-6`}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${statusConfig.bg} ${statusConfig.color} border-2 border-current`}>
                {statusConfig.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Status</p>
                <p className={`text-xl font-black ${statusConfig.color}`}>{statusConfig.label}</p>
              </div>
            </div>

            {/* Action Buttons */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-red-50 to-red-50 rounded-2xl border border-red-200 shadow-sm p-6"
            > */}
              {/* <h3 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Cash refund</h3> */}

              {bookingData.paymentStatus == "paid" && bookingData.status =="cancelled" && bookingData.paymentMethod != "payAtShop" && (

             
              <div className="space-y-2">
                <button
                  onClick={()=>refund(bookingData.id)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed justify-center flex bg-red-600 text-center ">
                  <Coins size={18} className="text-white  " />
                  <span className="text-sm font-bold">Refund</span>
                </button>
              </div> 
              )
               } 
            {/* </motion.div> */}

            
            {currentStatus !== "cancelled" && currentStatus !== "completed" && (
              <div className="flex gap-2 flex-wrap">
                {currentStatus === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate("confirmed")}
                      disabled={updating}
                      className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 size={18} />
                      <span>Completed</span>
                    </button>
                    {/* <button
                      onClick={() => handleStatusUpdate('cancelled')}
                      disabled={updating}
                      className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle size={18} />
                      <span>Cancel</span>
                    </button> */}
                  </>
                )}
                {currentStatus === "confirmed" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate("completed")}
                      disabled={updating}
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 size={18} />
                      <span>Mark as Completed</span>
                    </button>
                    <button
                      onClick={() => handleStatusUpdate("cancelled")}
                      disabled={updating}
                      className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle size={18} />
                      <span>Cancel</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Customer Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
            >
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-blue-600" />
                Customer Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-lg border-2 border-white shadow-md">
                    {bookingData.customerId?.name?.charAt(0).toUpperCase() || "C"}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-base">{bookingData.customer?.name || "N/A"}</p>
                    <div className="flex flex-col gap-1 mt-2">
                      {bookingData.customer?.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} className="text-gray-400" />
                          <span>{bookingData.customer.email}</span>
                        </div>
                      )}
                      {bookingData.customer?.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} className="text-gray-400" />
                          <span>{bookingData.customer .phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
            >
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <Scissors size={20} className="text-indigo-600" />
                Service Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Package size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{bookingData.service?.name || "N/A"}</p>
                    {/* <p className="text-sm text-gray-600 mt-1">{bookingData.service?.description || 'No description'}</p> */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-600">
                          {bookingData.service?.duration || "N/A"} mins
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <IndianRupee size={14} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-600">
                          ₹{bookingData.service?.price || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Appointment Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
            >
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-purple-600" />
                Appointment Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-purple-600" />
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</p>
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    {bookingData.date ? format(new Date(bookingData.date), "MMM dd, yyyy") : "N/A"}
                  </p>
                </div>
                <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-orange-600" />
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Time</p>
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    {convertRailwayTime(bookingData.startTime) || "N/A"}
                  </p>
                </div>
              </div>

              {/* Staff Information */}
              {bookingData.staffId && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-gray-600" />
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Assigned Staff</p>
                  </div>
                  <p className="text-base font-bold text-gray-900">{bookingData.staffId?.name || "N/A"}</p>
                </div>
              )}
            </motion.div>

            {/* Address */}
            {bookingData.addressId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
              >
                <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-rose-600" />
                  Service Location
                </h2>
                <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {bookingData.addressId.street}, {bookingData.addressId.city}, {bookingData.addressId.state} - {bookingData.addressId.pincode}
                  </p>
                </div>
              </motion.div>
            )}

          </div>

          {/* Right Column - Payment & Summary */}
          <div className="space-y-6">
            
            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6"
            >
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-green-600" />
                Payment Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Service Amount</span>
                  <span className="text-sm font-bold text-gray-900">₹{bookingData.totalAmount || 0}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Payment Method</span>
                  <span className="text-sm font-bold text-gray-900 capitalize">{bookingData.paymentMethod || "N/A"}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Payment Status</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${PAYMENT_STATUS_CONFIG[bookingData.paymentStatus]?.bg} ${PAYMENT_STATUS_CONFIG[bookingData.paymentStatus]?.color}`}>
                    {PAYMENT_STATUS_CONFIG[bookingData.paymentStatus]?.label || bookingData.paymentStatus}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-base font-black text-gray-900">Total Amount</span>
                  <span className="text-xl font-black text-blue-600">₹{bookingData.totalAmount || 0}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            

          </div>

        </div>

      </div>
    </div>
  );
};

export default VendorBookingDetailsPage;
