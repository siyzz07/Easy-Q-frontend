import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import BookingViewCard from '../../components/Customer/BookingViewCard';
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { getCustomerBookingData } from '../../Services/ApiService/BookingApiService';
import { toast } from 'react-toastify';

export type BookingCardDTO = {
  id: string;
  title: string;
  location: string;
  facility: string;
  date: string;
  time: string;
  status: string;
  statusColor: string;
  bgColor: string;
  image:string;
  icon?: string;
  amount:string
};

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState<BookingCardDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    setLoading(true);
    try {
      const response = await getCustomerBookingData();
      if (response?.data?.data) {
        const mapped: BookingCardDTO[] = response.data.data.map((b: any) => {
          const status = b?.status?.toLowerCase() || 'pending';
          return {
            id: b?._id,
            title: b?.serviceId?.serviceName || 'Service',
            location: b?.shopId?.shopName || 'Shop',
            facility: b?.shopId?.city || 'Unknown',
            date: b?.bookingDate,
            time: `${b?.bookingTimeStart} - ${b?.bookingTimeEnd}`,
            status: b?.status || 'Pending',
            image:b?.shopId.ProfileImage,
            amount:b?.totalAmount,
            statusColor:
              status === 'completed' ? 'bg-green-100 text-green-700' :
              status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              status === 'cancelled' ? 'bg-red-100 text-red-700' :
              'bg-slate-100 text-slate-700',
            bgColor:
              status === 'completed' ? 'bg-green-100/10' :
              status === 'pending' ? 'bg-yellow-100/10' :
              status === 'cancelled' ? 'bg-red-100/10' :
              'bg-slate-100/10',
            icon: b?.serviceId?.serviceName?.charAt(0)?.toUpperCase() || 'B'
          };
        });
        setBookings(mapped);
      }
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => ({
    total: bookings.length,
    upcoming: bookings.filter(b => ['pending', 'booked', 'checked-in'].includes(b.status.toLowerCase())).length,
    completed: bookings.filter(b => b.status.toLowerCase() === 'completed').length,
    cancelled: bookings.filter(b => b.status.toLowerCase() === 'cancelled').length,
  }), [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'complete') return b.status.toLowerCase() === 'completed';
      return b.status.toLowerCase().startsWith(activeTab.toLowerCase());
    });
  }, [activeTab, bookings]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="relative overflow-hidden px-4 py-10 md:px-6 md:py-20 rounded-b-[2rem] md:rounded-b-[3rem] shadow-sm bg-white border-b border-slate-100">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900"
          >
            My Bookings
          </motion.h1>
          <p className="mt-3 text-sm md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed px-4">
            Track your appointments and manage schedules easily.
          </p>
        </div>
      </div>

      <div className="relative z-20 -mt-8 md:-mt-10 max-w-5xl mx-auto px-4 space-y-6 md:space-y-8 pb-20">
        {/* Stats - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { label: 'Cancelled', value: stats.cancelled, icon: X, color: 'red' },
            { label: 'Pending', value: stats.upcoming, icon: Clock, color: 'amber' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'emerald' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 group">
              <div className={`shrink-0 h-12 w-12 rounded-xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-500 transition-transform group-hover:scale-105`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</p>
                <p className="text-2xl md:text-3xl font-black text-slate-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs & Content */}
        <div className="space-y-6">
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto pb-1 no-scrollbar">
              <TabsList className="inline-flex w-full md:w-auto bg-slate-100 p-1 rounded-xl h-12 md:h-14 border border-slate-200">
                {['all', 'pending', 'complete', 'cancelled'].map(tab => (
                  <TabsTrigger 
                    key={tab} 
                    value={tab} 
                    className="flex-1 md:flex-none px-6 md:px-10 h-full rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-6 focus-visible:outline-none">
              <div className="grid gap-4">
                {loading ? (
                  /* Basic Loading State */
                  <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                  </div>
                ) : filteredBookings.length > 0 ? (
                  filteredBookings.map(b => (
                    <BookingViewCard key={b.id} booking={b} />
                  ))
                ) : (
                  /* Empty State */
                  <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-12 md:p-20 flex flex-col items-center text-center border border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <CalendarIcon className="w-10 h-10 text-slate-200" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No Bookings Found</h3>
                    <p className="text-slate-400 text-sm mt-2 max-w-xs">
                      You don't have any {activeTab !== 'all' ? activeTab : ''} bookings in your records.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
      </div>
    </div>
  );
};

export default BookingsPage;