import { XCircle, AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IData {
  bookingDate: string;
  bookingTime: string;
}

function PaymentFailedPage() {
  const navigate = useNavigate();
  const [serarchParams] = useSearchParams();
  const [data, setData] = useState<IData | null>(null);

  let bookingData = serarchParams.get("id");

  useEffect(() => {
    if (!bookingData) {
      navigate("/customer");
      return;
    }
    decodeData();
  }, []);

  const decodeData = async () => {
    try {
      const decode = JSON.parse(atob(bookingData as string));

      if (decode) {
        setData(decode);
      }
    } catch (error: unknown) {
      navigate("/customer");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5]">
      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Failed
          </h2>
          <p className="text-gray-600">
            We couldn't process your payment. Please try again or use a
            different payment method.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-red-100 p-8 mb-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Transaction Error
              </h3>
              <p className="text-gray-600 text-sm">
                {`Your booking time on ${data?.bookingDate} at ${data?.bookingTime} has been temporarily reserved.
Please complete the payment within 15 minutes to confirm your booking.
Otherwise, the slot will be released automatically.`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/customer")}
            className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Home
          </button>
          {/* <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-red-500/30"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button> */}
        </div>

        <div className="text-center mt-8">
          {/* <p className="text-sm text-gray-600">
            Need help?{" "}
            <a href="#" className="text-red-600 hover:text-red-700 underline">
              Contact Support
            </a>
          </p> */}
        </div>
      </main>
    </div>
  );
}

export default PaymentFailedPage;
