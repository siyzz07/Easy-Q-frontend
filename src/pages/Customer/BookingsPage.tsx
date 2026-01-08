import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import BookingViewCard from '../../components/Customer/BookingViewCard';
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { getCustomerBookingData } from '../../Services/ApiService/BookingApiService';
import { toast } from 'react-toastify';
import Pagination from '../../components/Shared/Pagination';

// Updated DTO to include Payment Info
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
  image: string;
  icon?: string;
  amount: string;
  paymentStatus: string;
  isPaymentFailed: boolean;
};

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState<BookingCardDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    fetchBookings();
  }, [page, activeTab]);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setPage(1);
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getCustomerBookingData(page, limit, activeTab);
        console.log('mm',response)
      // Based on your console log structure: response.data.data.data
      const bookingArray = response?.data?.data || [];
      const totalPages = response?.data?.pagination.totalPages || 1;
      setTotalPage(totalPages);

      const mapped: BookingCardDTO[] = bookingArray.map((b: any) => {
        const status = b?.status?.toLowerCase() || 'pending';
        const pStatus = b?.paymentStatus?.toLowerCase() || 'pending';

        return {
          id: b?._id,
          title: b?.serviceId?.serviceName || 'General Service',
          location: b?.shopId?.shopName || 'Partner Shop',
          facility: b?.shopId?.city || 'Location N/A',
          date: b?.bookingDate, 
          time: `${b?.bookingTimeStart} - ${b?.bookingTimeEnd}`,
          status: b?.status || 'Pending',
          image: b?.shopId?.ProfileImage || '', 
          amount: b?.totalAmount?.toString() || '0',
          paymentStatus: b?.paymentStatus || 'pending',
          // UI Logic for failed payments
          isPaymentFailed: pStatus === 'failed',
          statusColor:
            status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
            status === 'pending' || status === 'booked' ? 'bg-amber-100 text-amber-700' :
            status === 'cancelled' ? 'bg-rose-100 text-rose-700' :
            'bg-slate-100 text-slate-700',
          bgColor:
            status === 'completed' ? 'bg-emerald-500/10' :
            status === 'pending' || status === 'booked' ? 'bg-amber-500/10' :
            status === 'cancelled' ? 'bg-rose-500/10' :
            'bg-slate-500/10',
          icon: b?.serviceId?.serviceName?.charAt(0)?.toUpperCase() || 'B'
        };
      });
      setBookings(mapped);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error('Failed to load your bookings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      {/* Hero Header */}
      <div className="relative overflow-hidden px-4 py-12 md:py-20 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-lg bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white"
          >
            My Bookings
          </motion.h1>
          <p className="mt-4 text-sm md:text-lg text-blue-100 max-w-xl mx-auto font-medium opacity-90">
            View status, manage payments, and track your schedule.
          </p>
        </div>
      </div>

      <div className="relative z-20 -mt-10 max-w-5xl mx-auto px-4 space-y-8 pb-20">
        <Tabs defaultValue="all" onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/50 backdrop-blur-md p-1.5 rounded-2xl h-14 border border-white shadow-sm inline-flex w-full md:w-auto">
              {['all', 'pending', 'complete', 'cancelled'].map(tab => (
                <TabsTrigger 
                  key={tab} 
                  value={tab} 
                  className="px-6 md:px-10 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="focus-visible:outline-none">
            <div className="grid gap-5">
              {loading ? (
                <LoadingSpinner />
              ) : bookings.length > 0 ? (
                <>
                  {bookings.map(b => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={b.id}
                      className="relative"
                    >
                      {/* Booking Card */}
                      <BookingViewCard booking={b} />
                      
                      {/* Overlay Alert for Failed Payment */}
                      {b.isPaymentFailed && (
                        <div className="absolute top-3 right-5 flex items-center gap-1.5 bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-red-200">
                           <AlertCircle size={12} /> Payment Failed
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  <div className="mt-8 flex justify-center">
                    <Pagination 
                      page={page}
                      totalPages={totalPage}
                      onPageChange={setPage}
                    />
                  </div>
                </>
              ) : (
                <EmptyState tab={activeTab} />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Sub-components
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-24 space-y-4">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600"></div>
    <p className="text-blue-600 font-bold text-sm animate-pulse">Fetching records...</p>
  </div>
);

const EmptyState = ({ tab }: { tab: string }) => (
  <div className="bg-white rounded-[3rem] p-16 md:p-24 flex flex-col items-center text-center border border-slate-100 shadow-sm">
    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
      <CalendarIcon className="w-12 h-12 text-slate-200" />
    </div>
    <h3 className="text-2xl font-bold text-slate-800">No {tab !== 'all' ? tab : ''} bookings</h3>
    <p className="text-slate-400 text-sm mt-2 max-w-xs font-medium">
      We couldn't find any records on the server for this category.
    </p>
  </div>
);

export default BookingsPage;  