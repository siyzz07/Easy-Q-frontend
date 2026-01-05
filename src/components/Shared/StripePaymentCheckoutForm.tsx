import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { createPayment } from "../../Services/ApiService/PaymentService";
import { PaymentStripe } from "../../config/StripeConfig";
import { X, ShieldCheck, Lock } from "lucide-react";

interface CheckoutFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
  shopName?: string;
  serviceName?: string;
}

const CheckoutFormContent = ({ 
  amount, 
  onSuccess, 
  shopName, 
  serviceName 
}: { 
  amount: number; 
  onSuccess: () => void;
  shopName?: string;
  serviceName?: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/customer/service/payment-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-8 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
        <p className="text-sm text-gray-500 mt-1">{shopName} • {serviceName}</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
        {/* Price Tag */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <span className="text-gray-500 font-medium">Total Amount</span>
          <span className="text-2xl font-black text-gray-900">₹{amount}.00</span>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Payment Method</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <PaymentElement options={{ 
              layout: 'accordion',
              paymentMethodOrder: ['upi', 'card'],
              defaultValues: {
                billingDetails: {
                  address: { country: 'IN' }
                }
              }
            }} />
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm font-medium">
            <X className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-8 pt-4 bg-gray-50 border-t border-gray-100">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              <span>Pay ₹{amount}.00 Now</span>
            </>
          )}
        </button>
        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-4">
          Secure 256-bit SSL Encrypted Payment
        </p>
      </div>
    </form>
  );
};

const CheckoutForm = ({ 
  amount, 
  onSuccess, 
  onCancel,
  shopName,
  serviceName
}: CheckoutFormProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (amount > 0) {
      createPayment(amount)
        .then((res: any) => {
          if (res.clientSecret) {
            setClientSecret(res.clientSecret);
          } else {
            setError("The payment session could not be established.");
          }
        })
        .catch(() => {
          setError("Network error. Please check your connection.");
        });
    }
  }, [amount]);

  if (!clientSecret && !error) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] p-12 max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-6" />
          <p className="text-slate-900 font-black text-lg">Safeguarding Transaction</p>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Connecting to Stripe</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-lg sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[100vh] sm:max-h-[85vh]">
        {/* Close Button */}
        <button 
          onClick={onCancel}
          className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all z-20"
        >
          <X className="w-6 h-6" />
        </button>

        {error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6">
              <X className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Payment Failed</h3>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed px-4">{error}</p>
            <button onClick={onCancel} className="w-full py-4 bg-gray-50 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all">
              Go Back
            </button>
          </div>
        ) : (
          <Elements stripe={PaymentStripe} options={{ 
            clientSecret,
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#2563eb',
                colorBackground: '#ffffff',
                colorText: '#1f2937',
                colorDanger: '#ef4444',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                spacingUnit: '4px',
                borderRadius: '12px',
              },
              rules: {
                '.Input': {
                  border: '1px solid #e5e7eb',
                  padding: '12px',
                },
                '.Tab': {
                   border: '1px solid #e5e7eb',
                },
                '.Tab--selected': {
                   borderColor: '#2563eb',
                   boxShadow: '0 0 0 1px #2563eb',
                }
              }
            }
          }}>
            <CheckoutFormContent 
              amount={amount} 
              onSuccess={onSuccess} 
              shopName={shopName}
              serviceName={serviceName}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
