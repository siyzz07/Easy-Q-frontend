
import { CustomerAxiosInstance } from "../../config/AxiosInstance";
import { REVIEW_API_ROUTES } from "../../Shared/Constants/ApiEndpoints";

export const addReview = async (data: { vendorId: string; rating: string; comment: string }) => {
  const response = await CustomerAxiosInstance.post(REVIEW_API_ROUTES.ADD_REVIEW, data);
  return response;
};

export const getVendorReviews = async (vendorId: string) => {
  const response = await CustomerAxiosInstance.get(`${REVIEW_API_ROUTES.VENDOR_REVIEWS}${vendorId}`);
  return response;
};

export const updateReview = async (reviewId: string, data: { rating: string; comment: string }) => {
  const response = await CustomerAxiosInstance.put(`${REVIEW_API_ROUTES.UPDATE_REVIEW}${reviewId}`, data);
  return response;
};

export const deleteReview = async (reviewId: string) => {
  const response = await CustomerAxiosInstance.delete(`${REVIEW_API_ROUTES.DELETE_REVIEW}${reviewId}`);
  return response;
};
 