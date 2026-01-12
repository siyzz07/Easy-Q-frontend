
import { CustomerAxiosInstance } from "../../config/AxiosInstance";

export const addReview = async (data: { vendorId: string; rating: string; comment: string }) => {
  console.log(data);
  const response = await CustomerAxiosInstance.post("/review/new-review", data);
  return response;
};

export const getVendorReviews = async (vendorId: string) => {
  const response = await CustomerAxiosInstance.get(`/review/vendor-reviews/${vendorId}`);
  return response;
};

export const updateReview = async (reviewId: string, data: { rating: string; comment: string }) => {
  const response = await CustomerAxiosInstance.put(`/review/update-review/${reviewId}`, data);
  return response;
};

export const deleteReview = async (reviewId: string) => {
  const response = await CustomerAxiosInstance.delete(`/review/delete-review/${reviewId}`);
  return response;
};
