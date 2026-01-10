import { WalletAxiosInstance } from "../../config/AxiosInstance"




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
    const response = await WalletAxiosInstance.get('/wallet/customer-wallet',)
    return response
}


/**
 * 
 *   Get wallet transactions ----
 */
export const getWalletTransactions = async(page:number = 1, limit:number = 10) =>{
    const response = await WalletAxiosInstance.get('/transaction/wallet/transactions', {
        params: { page, limit }
    })
    return response
}


/**
 * 
 *   Add money to wallet ----
 */
export const addMoneyToWallet = async(amount:number) =>{
    const response = await WalletAxiosInstance.post('/transaction/wallet/add-money', { amount })
    return response
}

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
    const response = await WalletAxiosInstance.get('/wallet/vendor-wallet')
    return response
}
