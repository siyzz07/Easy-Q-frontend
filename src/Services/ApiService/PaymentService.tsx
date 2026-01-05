import { PaymentAxiosInstance } from "../../config/AxiosInstance"


/**
 * 
 *  create new payment 
 * 
 */
export const createPayment = async (amount: number) => {
  const response = await PaymentAxiosInstance.post("/payment/create", { amount });
  return response.data;
};