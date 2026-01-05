import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const StripePaymentModal = ({
  clientSecret,
  onSuccess,
  onClose,
}: {
  clientSecret: string;
  onSuccess: () => void;
  onClose: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async () => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements. getElement(CardElement)!,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Pay with Card</h2>

        <CardElement />

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2"
          >
            Cancel
          </button>
          <button
            onClick={handlePay}
            className="flex-1 bg-blue-600 text-white rounded-lg py-2"
          >
            Pay Now
          </button>
        </div>  
      </div>
    </div>
  );
};

export default StripePaymentModal;
