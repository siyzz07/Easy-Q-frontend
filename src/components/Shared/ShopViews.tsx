import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Star,
  ImagePlus,
  Upload,
  Camera,
  User,
  MessageSquare,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// --- Mock Data ---
const PHOTOS = ["/shop-1.jpg", "/shop-2.jpg", "/shop-3.jpg"];
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "John Doe",
    date: "Oct 10, 2025",
    rating: 5,
    comment: "Excellent service!",
  },
  {
    id: 2,
    name: "Sarah Lee",
    date: "Oct 8, 2025",
    rating: 4,
    comment: "Good experience overall.",
  },
];

// --- Validation Schema ---
const reviewSchema = Yup.object({
  rating: Yup.number().min(1, "Please select a rating").required(),
  comment: Yup.string().trim().min(5, "Comment too short").required(),
});

// --- Helpers ---
const calculateAverageRating = (reviews: typeof INITIAL_REVIEWS) => {
  if (!reviews.length) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return (total / reviews.length).toFixed(1);
};

const getRatingDistribution = (reviews: typeof INITIAL_REVIEWS) => {
  const dist = [0, 0, 0, 0, 0];
  reviews.forEach((r) => dist[r.rating - 1]++);
  return dist;
};

interface ShopViewsProps {
  isVendor: boolean;
  addReview? :()=> void
  addImage?:()=>void
}

const ShopViews: React.FC<ShopViewsProps> = ({ isVendor,addReview,addImage }) => {
  const [photos, setPhotos] = useState(PHOTOS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const avgRating = calculateAverageRating(reviews);
  const distribution = getRatingDistribution(reviews);
  const totalReviews = reviews.length;


  const handleAddPhoto = () => {
    if (!photoFile) return;
    const newPhotoUrl = URL.createObjectURL(photoFile);
    setPhotos((prev) => [...prev, newPhotoUrl]);
    setPhotoFile(null);
  };

 
  const handleReviewForm = async (values: { rating: number; comment: string },{ resetForm }: any) => {
    
  };

  return (
    <Card className="mt-6 w-full rounded-xl border bg-card shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-3 px-6">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" /> Shop Overview
        </CardTitle>

        {isVendor && (
          <div className="flex gap-2 items-center">
            <Input
              type="file"
              accept="image/*"
              className="w-48"
              onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
            />
            <Button
              onClick={handleAddPhoto}
              size="sm"
              className="bg-primary text-white"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Photo
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0 overflow-hidden">
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="flex w-full border-b bg-muted/20 px-6">
            <TabsTrigger
              value="photos"
              className="flex-1 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <ImagePlus className="mr-2 h-4 w-4" /> Photos
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="flex-1 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Reviews
            </TabsTrigger>
          </TabsList>

          {/* --- PHOTOS TAB --- */}
          <TabsContent value="photos" className="p-6">
            {photos.length ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {photos.map((p, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-lg border overflow-hidden shadow-sm"
                  >
                    <img
                      src={p || "/placeholder.svg"}
                      alt={`Shop ${i}`}
                      className="w-full h-36 object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground py-6">
                No photos uploaded yet.
              </p>
            )}
          </TabsContent>

          {/* --- REVIEWS TAB --- */}
          <TabsContent value="reviews" className="p-6 space-y-6">
            {/* Overall Rating Summary */}
            <div className="rounded-lg border bg-muted/10 p-5">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" /> Overall Ratings
              </h3>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Average */}
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary">
                    {avgRating}
                  </span>
                  <div className="text-yellow-500 text-lg">
                    {"⭐".repeat(Math.round(Number(avgRating)))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {totalReviews} total reviews
                  </p>
                </div>

                {/* Distribution */}
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = distribution[star - 1];
                    const percent = (count / totalReviews) * 100 || 0;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="w-10 text-sm font-medium">
                          {star}★
                        </span>
                        <Progress
                          value={percent}
                          className="h-2 flex-1 [&>div]:bg-yellow-400"
                        />
                        <span className="w-6 text-xs text-muted-foreground text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* --- Add Review --- */}
            {!isVendor && (
              <div className="rounded-lg border bg-muted/10 p-5 space-y-3">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" /> Add Your Review
                </h3>

                <Formik
                  initialValues={{ rating: 0, comment: "" }}
                  validationSchema={reviewSchema}
                  onSubmit={handleReviewForm}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="space-y-3">
                      {/* Rating Selector */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            size="sm"
                            type="button"
                            variant="ghost"
                            onClick={() => setFieldValue("rating", star)}
                            className={`rounded-full p-2 transition ${
                              values.rating >= star
                                ? "text-yellow-400"
                                : "text-gray-400"
                            } hover:bg-transparent`}
                          >
                            <Star
                              className={`h-4 w-4 ${
                                values.rating >= star
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-400"
                              }`}
                            />
                          </Button>
                        ))}
                      </div>
                      <ErrorMessage
                        name="rating"
                        component="p"
                        className="text-xs text-red-500"
                      />

                      {/* Comment Field */}
                      <div>
                        <Field
                          as={Textarea}
                          name="comment"
                          placeholder="Write your experience..."
                          className="w-full"
                        />
                        <ErrorMessage
                          name="comment"
                          component="p"
                          className="text-xs text-red-500 mt-1"
                        />
                      </div>

                      {/* Submit */}
                      <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                        Submit Review
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            {/* Review List */}
            <div className="flex flex-col gap-4">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-lg border bg-muted/10 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center gap-1">
                      <User className="h-4 w-4 text-muted-foreground" />{" "}
                      {r.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {r.date}
                    </span>
                  </div>
                  <div className="text-yellow-500 text-sm mt-1">
                    {"⭐".repeat(r.rating)}{" "}
                    <span className="text-muted-foreground text-xs">
                      ({r.rating}/5)
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShopViews;
