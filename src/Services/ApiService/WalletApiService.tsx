
import { WalletAxiosInstance } from "../../config/AxiosInstance";
import { WALLET_API_ROUTES } from "../../Shared/Constants/ApiEndpoints";




/**
 * 
 *  customer
 * 
 */

/**
 * 
 *   Get wallet balance ----
 */
export const getCustomerWalletBalance = async() =>{
    const response = await WalletAxiosInstance.get(WALLET_API_ROUTES.CUSTOMER_WALLET);
    return response;
};


/**
 * 
 *   Get wallet transactions ----
 */
export const getWalletTransactions = async(page:number = 1, limit:number = 10) =>{
    const response = await WalletAxiosInstance.get(WALLET_API_ROUTES.WALLET_TRANSACTIONS, {
        params: { page, limit }
    });
    return response;
};


/**
 * 
 *   Add money to wallet ----
 */
export const addMoneyToWallet = async(amount:number) =>{
    const response = await WalletAxiosInstance.post(WALLET_API_ROUTES.ADD_MONEY, { amount });
    return response;
};

/**
 * 
 *  vendor 
 * 
 */
/**
 * 
 *   Get vendor wallet transactions ----
 */
export const getVendorWalletBalance = async() =>{
    const response = await WalletAxiosInstance.get(WALLET_API_ROUTES.VENDOR_WALLET);
    return response;
};
