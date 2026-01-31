import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";
import {
  Star,
  ImagePlus,
  Upload,
  MessageSquare,
  Trash2,
  Edit2
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ShopImageUpload from "./ShopImageUpload&Preview";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils";
import { addImages, imageRemove } from "../../Services/ApiService/VendorApiServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { IImage } from "../../Shared/types/Types";
import { addReview, deleteReview, getVendorReviews, updateReview } from "../../Services/ApiService/ReviewApiService";
import { decodeToken } from "../../utils/tokenUtils";
import { isThereBooking } from "../../Services/ApiService/BookingApiService";


const reviewSchema = Yup.object({
  rating: Yup.number().min(1, "Select a rating").required(),
  comment: Yup.string().trim().min(5, "Comment too short").required(),
});

interface ShopViewsProps {
  isVendor: boolean;
  vendorImages: IImage[] | [];
  isUpdate?: () => void;
  vendorId?: string;
}

const ShopViews: React.FC<ShopViewsProps> = ({
  isVendor,
  vendorImages,
  isUpdate,
  vendorId
}) => {




  const [photos, setPhotos] = useState<IImage[] | []>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [shopImagePopup, setShopImagePopup] = useState(false);
  const [preview, setPreview] = useState<IImage | null>(null);
  const [type, setType] = useState<string>("");
  const [userReview, setUserReview] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [eligibility,setEligibility] = useState<boolean>(false)



  useEffect(() => {
    if (vendorImages) {
      setPhotos(vendorImages);
    }
  }, [vendorImages]);

  useEffect(() => {
     if(vendorId){
        fetchReviews();
        reviewEligibility()
     }
  },[vendorId]);




  const reviewEligibility = async ()=>{
    try{
        if(!vendorId)return
        const response = await isThereBooking(vendorId)

        if(response.data){
            setEligibility(response.data.data)
        }

    }catch(error:unknown){
        if(error){
            console.log('reviewEligibility error');
            console.log(error);
            
            
        }
    }
  }


  const fetchReviews = async () => {
    if(!vendorId) return;
    try {
        const response = await getVendorReviews(vendorId);
        if(response.data.success){
            const fetchedReviews = response.data.data;
            setReviews(fetchedReviews);
            
            const userInfo = decodeToken();
            if(userInfo?.userId && fetchedReviews.length > 0){
               
                const firstReview = fetchedReviews.find((r:any) => (r.customerId?._id || r.customerId) === userInfo.userId);
                    setUserReview(firstReview || null);

                // const firstReview = fetchedReviews[0];
                const reviewUserId = firstReview.customerId?._id || firstReview.customerId;
                
                if(reviewUserId === userInfo.userId){
                    setUserReview(firstReview);
                } else {
                    setUserReview(null);
                }
            }
        }
    } catch (error) {
        console.log("Error fetching reviews", error);
    }
  };

  const calculateAverageRating = (reviews: any[]) => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + Number(r.rating), 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = (reviews: any[]) => {
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
        const rating = Math.round(Number(r.rating));
        if(rating >=1 && rating <=5) dist[rating - 1]++;
    });
    return dist;
  };

  const avgRating = calculateAverageRating(reviews);
  const distribution = getRatingDistribution(reviews);
  const totalReviews = reviews.length;

  // Save uploaded image
  const handleSaveImage = async (image: File | null) => {
    try {
      let imageUrl = await uploadToCloudinary(image as File);
      let imageData = {
        url: imageUrl.secure_url,
        publicId: imageUrl.public_id,
      };

      let response = await addImages(imageData);
      if (response?.data.message) {
        toast.success(response.data.message);
      }
      setShopImagePopup(false);
      isUpdate?.();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error to add shop image ");
        console.log(error.response);
      }
      setShopImagePopup(false);
    }
  };

  // Add review
  const handleReviewForm = async (
    values: { rating: number; comment: string },
    { resetForm }: any
  ) => {
    if(!vendorId) return;
    try {
        const reviewData = {
            rating: values.rating.toString(),
            comment: values.comment,
            vendorId: vendorId
        };

        if(isEditing && userReview){
           const response = await updateReview(userReview._id, reviewData);
           if(response.data.success){
             toast.success("Review updated successfully");
             setIsEditing(false);
             fetchReviews();
             resetForm();
           }
        } else {
            const response = await addReview(reviewData);
            if(response.data.success){
                toast.success("Review added successfully");
                fetchReviews();
                resetForm();
            }
        }
    } catch (error) {
        if(error instanceof AxiosError){
            toast.error(error.response?.data?.message || "Failed to submit review");
        }
    }
  };

  const handleDeleteReview = async () => {
      if(!userReview) return;
      try {
          const response = await deleteReview(userReview._id);
          if(response.data.success){
              toast.success("Review deleted successfully");
              setUserReview(null);
              setIsEditing(false);
              fetchReviews();
          }
      } catch (error) {
           if(error instanceof AxiosError){
            toast.error(error.response?.data?.message || "Failed to delete review");
        }
      }
  };

  const imagePrivew = (p: IImage) => {
    setType("preview");
    setPreview(p);
    setShopImagePopup(true);
  };

  const deleteImage = async (id: string, imageId: string) => {
    try{

      const publicId = id;
      const image_id = imageId;
        const data ={
          publicId,
          image_id
        };
        setShopImagePopup(false);
      const response = await imageRemove(data);
        if(response?.data?.message){
          toast.success(response.data.message);
        }
        isUpdate?.();

    }catch(error){
        if(error instanceof AxiosError){
          if(error.response?.data.message){
            toast.error(error.response?.data.message);
          }else{
            toast.error("Error to delete image");
          }
          setShopImagePopup(false);
        }

    }
  };

  const addImage = (val: boolean) => {
    setType("upload");
    setShopImagePopup(val);
  };
  
  return (
    <>
      <AnimatePresence>
      {shopImagePopup && (
        <ShopImageUpload
          use={type as "preview" | "upload"}
          onClose={() => setShopImagePopup(false)}
          onSave={handleSaveImage}
          url={preview?.url}
          publicId={preview?.publicId}
          isVendor={isVendor}
          onDelete={deleteImage}
          imageId={preview?._id}
        />
      )}
      </AnimatePresence>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
        >
        <Card className=" border-0 bg-transparent shadow-none">
      
            <CardContent className="p-0">
            <Tabs defaultValue="photos" className="w-full">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                    <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/50 p-1 rounded-full w-full sm:w-auto self-start">
                        <TabsTrigger
                            value="photos"
                            className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                        >
                            <ImagePlus className="mr-2 h-4 w-4" /> Photos
                        </TabsTrigger>

                        <TabsTrigger
                            value="reviews"
                            className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                        >
                            <MessageSquare className="mr-2 h-4 w-4" /> Reviews
                        </TabsTrigger>
                    </TabsList>
                    
                    {isVendor && (
                        <Button
                        onClick={() => addImage(true)}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105"
                        >
                        <Upload className="mr-2 h-4 w-4" /> Upload Photo
                        </Button>
                    )}
                </div>

                {/* PHOTOS TAB */}
                <TabsContent value="photos" className="mt-0">
                    <div className="glass-card rounded-2xl p-6 min-h-[300px]">
                        {photos.length ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {photos.map((p, i) => (
                                <motion.div
                                key={i}
                                onClick={() => imagePrivew(p)}
                                layoutId={`image-${p.publicId}`}
                                whileHover={{ scale: 1.03, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all bg-gray-100"
                                >
                                <img
                                    src={p.url}
                                    alt="Shop interior"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                </motion.div>
                            ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                                <ImagePlus className="w-16 h-16 mb-4 opacity-20" />
                                <p>No photos uploaded yet.</p>
                            </div>
                        )}
                    </div>
                </TabsContent>




                {/* REVIEWS TAB */}
                <TabsContent value="reviews" className="mt-0">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Rating Summary */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="glass-card rounded-2xl p-6 text-center">
                                <h3 className="text-lg font-semibold mb-2">Overall Rating</h3>
                                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                                {avgRating}
                                </div>
                                <div className="flex justify-center gap-1 mb-2 text-yellow-400">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`w-5 h-5 ${s <= Number(avgRating) ? "fill-current" : "text-gray-300 dark:text-gray-600"}`} />
                                ))}
                                </div>
                                <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
                            </div>

                            <div className="glass-card rounded-2xl p-6">
                                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Rating Distribution</h4>
                                <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = distribution[star - 1];
                                    const percent = (count / totalReviews) * 100 || 0;

                                    return (
                                    <div key={star} className="flex items-center gap-3 text-sm">
                                        <div className="w-8 font-medium flex items-center gap-1">
                                            {star} <Star className="w-3 h-3 fill-current text-gray-400" />
                                        </div>
                                        <Progress
                                        value={percent}
                                        className="h-2 flex-1"
                                        // indicatorClassName="bg-yellow-400" // using default styling for now, usually handled by CSS or library
                                        />
                                        <div className="w-8 text-right text-muted-foreground">{count}</div>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                        </div>

                        {/* Reviews List & Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* {!isVendor && eligibility && (!userReview || isEditing) && ( */}
                            {!isVendor  && (!userReview || isEditing) && (
                            <div className="glass-card rounded-2xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                  <h3 className="font-semibold text-lg">{isEditing ? "Edit your review" : "Write a Review"}</h3>
                                  {isEditing && (
                                      <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel Edit</Button>
                                  )}
                                </div>
                                <Formik
                                initialValues={{ 
                                    rating: isEditing && userReview ? Number(userReview.rating) : 0, 
                                    comment: isEditing && userReview ? userReview.comment : "" 
                                }}
                                enableReinitialize
                                validationSchema={reviewSchema}
                                onSubmit={handleReviewForm}
                                >
                                {({ values, setFieldValue }) => (
                                    <Form className="space-y-4">
                                    <div className="flex gap-2 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFieldValue("rating", star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                            className={`w-8 h-8 ${
                                                values.rating >= star
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300 hover:text-yellow-200"
                                            }`}
                                            />
                                        </button>
                                        ))}
                                    </div>
                                    <ErrorMessage name="rating" component="p" className="text-destructive text-sm" />

                                    <Field
                                        as={Textarea}
                                        name="comment"
                                        placeholder="Share your experience..."
                                        className="min-h-[100px] bg-white/50"
                                    />
                                    <ErrorMessage name="comment" component="p" className="text-destructive text-sm" />

                                    <div className="flex justify-end">
                                        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                        {isEditing ? "Update Review" : "Post Review"}
                                        </Button>
                                    </div>
                                    </Form>
                                )}
                                </Formik>
                            </div>
                            )}

                            <div className="space-y-4">
                                {reviews.map((r, index) => {
                                    const isMyReview = userReview && (r._id === userReview._id);
                                    if(isMyReview && isEditing) return null; // Hide my review item when editing

                                    return (
                                    <motion.div
                                        key={r._id || index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`glass-card rounded-2xl p-6 ${isMyReview ? "border-primary/20 bg-primary/5" : ""}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-primary font-bold">
                                                    {r.customerId?.name ? r.customerId.name.charAt(0) : "U"}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        {r.customerId?.name || "User"} 
                                                        {isMyReview && <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">You</span>}
                                                    </h4>
                                                    <span className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < Number(r.rating) ? "fill-current" : "text-gray-200"}`} />
                                                    ))}
                                                </div>
                                                {!isVendor && isMyReview && (
                                                    <div className="flex items-center gap-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => setIsEditing(true)}>
                                                            <Edit2 size={16} />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={handleDeleteReview}>
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed pl-13">{r.comment}</p>
                                    </motion.div>
                                    );
                                })}
                            </div>
                        </div>



                    </div>
                </TabsContent>
            </Tabs>
            </CardContent>
        </Card>
        </motion.div>
    </>
  );
};

export default ShopViews;
