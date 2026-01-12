import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MoreVertical,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { getVendorBookings } from "../../Services/ApiService/BookingApiService";
import { convertRailwayTime } from "../../utils/convertRailwayTime";
import Pagination from "../../components/Shared/Pagination";


interface ICustomer {
  name: string;
}

interface IService {
  name: string;
}

interface IBooking {
  id: string;
  _id: string;
  startTime: string;
  bookingId: string;
  customer: ICustomer;
  service: IService;
  date: string | Date;
  totalAmount: number | string;
  paymentStatus: string;
  status: string;
}

interface IPagination {
  totalPages: number;
}


type ConfigItem = { color: string; bg: string; icon?: React.ReactNode };

const STATUS_CONFIG: Record<string, ConfigItem> = {
  pending: { color: "text-amber-600", bg: "bg-amber-50", icon: <Clock size={14} /> },
  confirmed: { color: "text-blue-600", bg: "bg-blue-50", icon: <CheckCircle2 size={14} /> },
  completed: { color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 size={14} /> },
  cancelled: { color: "text-rose-600", bg: "bg-rose-50", icon: <XCircle size={14} /> },
};

const PAYMENT_CONFIG: Record<string, ConfigItem> = {
  paid: { color: "text-emerald-600", bg: "bg-emerald-100/50" },
  pending: { color: "text-amber-600", bg: "bg-amber-100/50" },
  failed: { color: "text-rose-600", bg: "bg-rose-100/50" },
};

const BookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(7); 
  const [date, setDate] = useState("");

  useEffect(() => {
    getBooking();
  }, [page, filter, date]);

  const getBooking = async () => {
    try {
      const response = await getVendorBookings(page, limit, filter, date);
      if (response?.data) {
        setBookings(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error: unknown) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/vendor/bookings/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-[900] text-gray-900 tracking-tight text-left">Bookings</h1>
            <p className="text-gray-500 font-medium mt-1 text-left">Manage appointments and track statuses.</p>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 transition-all cursor-pointer outline-none"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex gap-2 p-1 bg-gray-100/80 rounded-xl w-fit">
              {["all", "pending", "completed", "cancelled", "requests"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setFilter(tab); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    filter === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-5 text-[11px] font-black uppercase text-gray-400">Customer</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase text-gray-400">Service</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase text-gray-400">Date & Time</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase text-gray-400">Payment</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase text-gray-400">Status</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode="popLayout">
                  {bookings.length > 0 ? (
                    bookings.map((b) => {
                      const statusStyles = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
                      const paymentStyles = PAYMENT_CONFIG[b.paymentStatus] || PAYMENT_CONFIG.pending;

                      return (
                        <motion.tr
                          key={b._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4" onClick={() => handleViewDetails(b.id)}>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase text-xs">
                                {b.customer?.name?.charAt(0)}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-gray-900 text-sm">{b.customer?.name}</span>
                                <span className="text-[11px] text-gray-400">{b.bookingId}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-700 text-sm">{b.service?.name}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col text-sm font-medium text-gray-600">
                              <span>{format(new Date(b.date), "MMM dd, yyyy")}</span>
                              <span className="text-xs text-gray-400">{convertRailwayTime(b.startTime)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-gray-900 text-sm">₹{b.totalAmount}</span>
                              <span className={`w-fit px-2 py-0.5 rounded text-[9px] font-bold uppercase ${paymentStyles.bg} ${paymentStyles.color}`}>
                                {b.paymentStatus}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusStyles.bg} ${statusStyles.color}`}>
                              {statusStyles.icon}
                              <span className="text-[11px] font-bold uppercase">{b.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 text-gray-400 hover:text-gray-900">
                                <MoreVertical size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center text-gray-400 font-medium">
                        No bookings found for the selected criteria.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {bookings.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-white">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;