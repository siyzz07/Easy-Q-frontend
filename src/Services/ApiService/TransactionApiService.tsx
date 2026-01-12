import { TransactionAxiosInstance } from "../../config/AxiosInstance";



/**
 * 
 *    create payment ----
 */
export const createTransaction = async(bookingId:string,type:string) =>{

    const response = await TransactionAxiosInstance.post("/transaction/create-pay",{bookingId,type});
    return response;

};

/**
 * 
 *   verify payment ----
 */
export const verifyPayment = async(payload:any) =>{

    const response = await TransactionAxiosInstance.post("/transaction/verify",payload);
    return response;
};

/**
 * 
 *   fetch customerr transactions ----
 */
export const getTransactions = async (page:number,limit:number,filter:string) =>{
    const response = await  TransactionAxiosInstance("/transaction/transactions",{
        params:{
            page,
            limit,
            filter
        }
    });
    return response;
};
