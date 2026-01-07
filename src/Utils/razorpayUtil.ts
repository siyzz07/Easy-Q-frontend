import { createTransaction, verifyPayment } from "../Services/ApiService/TransactionApiService";
import { loadRazorpay } from "./loadRazorpay";



export const razorpay = (bookingId:string): Promise<string|void> => {
  return new Promise(async (resolve) => {
    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      resolve("razorpayError");
      return;
    }

    const response = await createTransaction(bookingId, "razorpay");

    if (!response?.data?.result) {
      resolve("failed");
      return;
    }

    const order = response.data.result;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      order_id: order.id,

      name: "EasyQ",
      description: "Booking payment",

      handler: async (response: any) => {
        try {
          await verifyPayment(response);
          resolve("paid");
        } catch {
          resolve("failed");
        }
      },

      modal: {
        ondismiss: () => {
          resolve("failed"); 
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.on("payment.failed", () => {
      resolve("failed"); 
    });

    rzp.open();
  });
};