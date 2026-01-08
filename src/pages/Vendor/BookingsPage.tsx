import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Scissors,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';

// Mock Data
const MOCK_BOOKINGS = [
  {
    id: 'BK-001',
    customerName: 'Alex Johnson',
    serviceName: 'Haircut & Beard Trim',
    date: new Date(2026, 0, 6, 10, 30),
    amount: 550,
    paymentStatus: 'paid',
    status: 'pending',
    avatar: 'A'
  },
  {
    id: 'BK-002',
    customerName: 'Sam Smith',
    serviceName: 'Hair Coloring',
    date: new Date(2026, 0, 6, 11, 45),
    amount: 1200,
    paymentStatus: 'pending',
    status: 'confirmed',
    avatar: 'S'
  },
  {
    id: 'BK-003',
    customerName: 'Michael Brown',
    serviceName: 'Facial Treatment',
    date: new Date(2026, 0, 5, 14, 0),
    amount: 800,
    paymentStatus: 'paid',
    status: 'completed',
    avatar: 'M'
  },
  {
    id: 'BK-004',
    customerName: 'David Wilson',
    serviceName: 'Manicure',
    date: new Date(2026, 0, 4, 9, 15),
    amount: 400,
    paymentStatus: 'failed',
    status: 'cancelled',
    avatar: 'D'
  }
];

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  pending: { color: 'text-amber-600', bg: 'bg-amber-50', icon: <Clock size={14} /> },
  confirmed: { color: 'text-blue-600', bg: 'bg-blue-50', icon: <CheckCircle2 size={14} /> },
  completed: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <CheckCircle2 size={14} /> },
  cancelled: { color: 'text-rose-600', bg: 'bg-rose-50', icon: <XCircle size={14} /> },
};

const PAYMENT_CONFIG: Record<string, { color: string; bg: string }> = {
  paid: { color: 'text-emerald-600', bg: 'bg-emerald-100/50' },
  pending: { color: 'text-amber-600', bg: 'bg-amber-100/50' },
  failed: { color: 'text-rose-600', bg: 'bg-rose-100/50' },
};

const BookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = booking.customerName.toLowerCase().includes(search.toLowerCase()) || 
                          booking.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusUpdate = (id: string, newStatus: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    setSelectedBooking(null);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/vendor/bookings/${id}`);
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    today: bookings.filter(b => b.date.toDateString() === new Date(2026, 0, 6).toDateString()).length // Mock date check
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-[900] text-gray-900 tracking-tight">Bookings</h1>
            <p className="text-gray-500 font-medium mt-1">Manage appointments and track statuses.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-all">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">
              <Calendar size={18} />
              <span>Calendar View</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Bookings', value: stats.total, icon: Calendar, color: 'blue' },
            { label: 'Pending Request', value: stats.pending, icon: Clock, color: 'amber' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'emerald' },
            { label: "Today's Schedule", value: stats.today, icon: AlertCircle, color: 'purple' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
              <div className={`h-12 w-12 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden">
          {/* Controls */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex gap-2 p-1 bg-gray-100/80 rounded-xl w-fit">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    filter === tab 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="relative w-full sm:w-72">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Search size={16} />
               </div>
               <input 
                  type="text" 
                  placeholder="Search bookings..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
               />
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-5 text-[11px] font-black uppercase tracking-wider text-gray-400">Customer</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase tracking-wider text-gray-400">Service</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase tracking-wider text-gray-400">Date & Time</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase tracking-wider text-gray-400">Payment</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase tracking-wider text-gray-400">Status</th>
                  <th className="px-6 py-5 text-right text-[11px] font-black uppercase tracking-wider text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode='popLayout'>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <motion.tr 
                        layout 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={booking.id} 
                        onClick={() => handleViewDetails(booking.id)}
                        className="group border-b border-gray-50 hover:bg-blue-50/30 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold border border-white shadow-sm">
                              {booking.avatar}
                            </div>
                            <div>
                               <p className="font-bold text-gray-900 text-sm">{booking.customerName}</p>
                               <p className="text-[11px] font-medium text-gray-400">{booking.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                                  <Scissors size={14} />
                              </div>
                              <span className="font-semibold text-gray-700 text-sm">{booking.serviceName}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                                 <Calendar size={12} className="text-gray-400" />
                                 {format(booking.date, 'MMM dd, yyyy')}
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
                                 <Clock size={12} />
                                 {format(booking.date, 'hh:mm a')}
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex flex-col gap-1">
                              <span className="font-bold text-gray-900">₹{booking.amount}</span>
                              <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${PAYMENT_CONFIG[booking.paymentStatus].bg} ${PAYMENT_CONFIG[booking.paymentStatus].color}`}>
                                {booking.paymentStatus}
                              </span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-transparent ${STATUS_CONFIG[booking.status].bg} ${STATUS_CONFIG[booking.status].color}`}>
                              {STATUS_CONFIG[booking.status].icon}
                              <span className="text-[11px] font-bold uppercase tracking-wide">{booking.status}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right relative">
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               setSelectedBooking(selectedBooking === booking.id ? null : booking.id);
                             }}
                             className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                           >
                              <MoreVertical size={18} />
                           </button>

                           {/* Status Action Dropdown */}
                           {selectedBooking === booking.id && (
                             <div className="absolute right-8 top-12 z-50 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                   Actions
                                </div>
                                <div className="p-1">
                                   <button
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       handleViewDetails(booking.id);
                                     }}
                                     className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors text-blue-600 hover:bg-blue-50"
                                   >
                                     <Eye size={12} />
                                     <span className="uppercase">View Details</span>
                                   </button>
                                   <div className="my-1 border-t border-gray-100"></div>
                                   <div className="px-2 py-1 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                      Update Status
                                   </div>
                                   {['pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                                     <button
                                       key={status}
                                       onClick={(e) => {
                                         e.stopPropagation();
                                         handleStatusUpdate(booking.id, status);
                                       }}
                                       className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors ${booking.status === status ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                     >
                                       {booking.status === status && <CheckCircle2 size={12} />}
                                       <span className="uppercase">{status}</span>
                                     </button>
                                   ))}
                                </div>
                             </div>
                           )}
                           
                           {/* Backdrop to close dropdown */}
                           {selectedBooking === booking.id && (
                             <div 
                               className="fixed inset-0 z-40 bg-transparent"
                               onClick={() => setSelectedBooking(null)}
                             />
                           )}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center">
                         <div className="flex flex-col items-center justify-center">
                            <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-3">
                               <Calendar size={32} />
                            </div>
                            <p className="text-gray-900 font-bold text-sm">No bookings found</p>
                            <p className="text-gray-400 text-xs mt-1">Try adjusting your filters or search.</p>
                         </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingsPage;
