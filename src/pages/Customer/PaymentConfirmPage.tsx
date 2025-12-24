import { Calendar, Tag, Briefcase, CreditCard, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { convertRailwayTime } from "../../utils/convertRailwayTime";

interface IData{
    bookingDate:string;
    bookingTime:string;
    paymentMethod:string;
    totalAmount:string
}

function PaymentConfirmPage() {
     const [serarchParams] = useSearchParams();
     const [data,setData] = useState<IData|null>(null)
  const navigate = useNavigate();
   let bookingData = serarchParams.get("id");

    useEffect(() => {
    if (!bookingData) {
      navigate("/customer");
      return;
    }
    decodeData();
  }, []);
  

  console.log('--',data);
  

//   const formattedDate = new Date(data?.bookingDate).toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });


  const decodeData = async () =>{
    try{
        const decode = JSON.parse(atob(bookingData as string));
        console.log('----------',decode);
        
        if(decode){
            setData(decode)
        }
    }catch(error:unknown){
       navigate('/customer')
        
    }
  }

  // Format readable payment method
//   const paymentLabel =
//     booking.paymentMethod === "razorpay"
//       ? "Online (Razorpay)"
//       : booking.paymentMethod === "wallet"
//       ? "Wallet Payment"
//       : "Pay at Shop";

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h2>
          <p className="text-gray-600">Your booking has been successfully completed.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6 space-y-6">
         

          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <p className="text-sm text-gray-600 mb-1">Booking Date</p>
              {/* <p className="text-lg font-semibold text-gray-900">{formattedDate}</p> */}
              <p className="text-lg font-semibold text-gray-900">{data?.bookingDate}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-orange-500 mt-1" />
            <div>
              <p className="text-sm text-gray-600 mb-1">Time</p>
              <p className="text-lg font-semibold text-gray-900">{ convertRailwayTime(data?.bookingTime)}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CreditCard className="w-5 h-5 text-yellow-500 mt-1" />
            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Method</p>
              <p className="text-lg font-semibold text-gray-900">{data?.paymentMethod}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CreditCard className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-lg font-semibold text-gray-900">₹{data?.totalAmount}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/customer")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate("/my-bookings")}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors"
          >
            View My Bookings
          </button>
        </div>

    
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              Contact Support
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

export default PaymentConfirmPage;
