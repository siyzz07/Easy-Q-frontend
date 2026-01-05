import { ReviewAxiosInstance } from "../../config/AxiosInstance"



/**
 * 
 * Review
 * 
 */




//------------------------------------------------------Add review
export const addReview = async(form:{rating:number,comment:string,vendorid:string}) =>{
   
    
    const response = await ReviewAxiosInstance.post('/review/new-review',form)
    return response
}

//------------------------------------------------------get reviews
export const getReviews = async (vendorId:string) =>{

    const response = await ReviewAxiosInstance.get(`/review/vendor-reviews/${vendorId}`,)
    return response

}

//------------------------------------------------------update review
export const updateReview = async (reviewId:string, form:{rating:number,comment:string,vendorId:string}) =>{

    const response = await ReviewAxiosInstance.put(`/review/update-review/${reviewId}`,form)
    return response

}

//------------------------------------------------------delete review
export const deleteReview = async (reviewId:string, vendorId:string) =>{

    const response = await ReviewAxiosInstance.delete(`/review/delete-review/${reviewId}?vendorId=${vendorId}`)
    return response

}

