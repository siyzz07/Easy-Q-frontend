
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Share2, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { Button } from '../../components/ui/button';

// Extracted Components
import DetailsHero from '../../components/Customer/BookingDetails/DetailsHero';
import StatusStepper from '../../components/Customer/BookingDetails/StatusStepper';
import StaffSection from '../../components/Customer/BookingDetails/StaffSection';
import LocationSection from '../../components/Customer/BookingDetails/LocationSection';
import PaymentSummary from '../../components/Customer/BookingDetails/PaymentSummary';
import ActionSidebar from '../../components/Customer/BookingDetails/ActionSidebar';
import { getSelectedBookingData } from '../../Services/ApiService/BookingApiService';
import { useEffect, useRef, useState } from 'react';
import type { IBooking } from '../../Shared/types/Types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

// Dummy data
const bookingDatas = {
  id: 'BOK-7729104',
  serviceName: 'Hair Cutting & Styling',
  serviceDuration: '45 mins',
  shopName: 'Elite Salon & Spa',
  shopRating: 4.9,
  shopReviews: 124,
  shopAddress: '123 Luxury Ave, Beverly Hills, CA 90210',
  shopPhone: '+1 (555) 000-1234',
  date: 'December 24, 2025',
  time: '3:30 PM',
  staff: 'Michael Stevens',
  staffRole: 'Senior Stylist',
  status: 'Confirmed',
  price: '$65.00',
  tax: '$5.20',
  total: '$70.20',
  customerName: 'John Doe',
  paymentStatus: 'Paid',
  paymentMethod: 'Visa (**** 4242)',
  notes: 'Following up on our last conversation about the taper fade. I would also like to add a quick beard trim if there is time!',
  policy: 'Flexible cancellation. Full refund if cancelled 24 hours before the appointment.'
};

// const statusSteps = [
//   { label: 'Booked', date: 'Dec 20, 10:15 AM', completed: true },
//   { label: 'Confirmed', date: 'Dec 20, 11:30 AM', completed: true },
//   { label: 'Checked In', date: '--', completed: false, current: true },
//   { label: 'Completed', date: '--', completed: false },
// ];

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const called = useRef(false);
  const [bookingData , setBookingData] = useState<any|null>(null)

  useEffect(() => {
  if (called.current) return;
  called.current = true;
  getEachBookingData();
}, []);
 
  const getEachBookingData = async () =>{
    try{

      if(id){
           const response = await getSelectedBookingData(id)
           console.log(response.data)
        if(response?.data?.data){

            setBookingData(response.data.data[0])
        }
           

      }else{
        navigate('/customer/bookings')

      }

    }catch(error:unknown){
        if(error instanceof AxiosError){
          console.log(error)
          toast.error('Invalied booking id')
          navigate('/customer/bookings')
        }
    }
  }


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
          
          <h3 className="mt-6 text-lg font-bold text-slate-800">Loading details...</h3>
          <p className="text-slate-500 text-sm">Please wait while we fetch your booking info.</p>
        </motion.div>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 md:pb-12">
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
            <span className="font-semibold text-sm hidden sm:inline">Back to Bookings</span>
          </motion.button>

          {/* <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-border">
              <Share2 size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-border" title="Help Center">
              <HelpCircle size={18} />
            </Button>
          </div> */}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <DetailsHero bookingData={bookingData} id={id} />
            {/* <StatusStepper statusSteps={statusSteps} /> */}
            <StaffSection bookingData={bookingData} />
            <LocationSection bookingData={bookingData} />
          </div>

          {/* Right Column: Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <PaymentSummary bookingData={bookingData} />
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
