
import { TransactionAxiosInstance } from "../../config/AxiosInstance";
import { TRANSACTION_API_ROUTES } from "../../Shared/Constants/ApiEndpoints";



/**
 * 
 *    create payment ----
 */
export const createTransaction = async(bookingId:string,type:string) =>{

    const response = await TransactionAxiosInstance.post(TRANSACTION_API_ROUTES.CREATE_PAY,{bookingId,type});
    return response;

};

/**
 * 
 *   verify payment ----
 */
export const verifyPayment = async(payload:any) =>{

    const response = await TransactionAxiosInstance.post(TRANSACTION_API_ROUTES.VERIFY,payload);
    return response;
};

/**
 * 
 *   fetch customerr transactions ----
 */
export const getTransactions = async (page:number,limit:number,filter:string) =>{
    const response = await  TransactionAxiosInstance(TRANSACTION_API_ROUTES.GET_TRANSACTIONS,{
        params:{
            page,
            limit,
            filter
        }
    });
    return response;
};
