import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// Dummy photo array
const PHOTOS = [
  "/shop-1.jpg",
  "/shop-2.jpg",
  "/shop-3.jpg",
  "/shop-4.jpg",
  "/shop-5.jpg",
  "/shop-6.jpg",
];

// Dummy reviews array
const REVIEWS = [
  { id: 1, name: "John Doe", date: "Oct 10, 2025", rating: 5, comment: "Excellent service and great quality!" },
  { id: 2, name: "Sarah Lee", date: "Oct 8, 2025", rating: 4, comment: "Good experience overall, will return again." },
  { id: 3, name: "Michael Smith", date: "Oct 5, 2025", rating: 3, comment: "Average, but staff was friendly." },
  { id: 4, name: "Priya Sharma", date: "Oct 2, 2025", rating: 5, comment: "Loved it! Highly recommend this place." },
  { id: 5, name: "Amit Verma", date: "Sep 28, 2025", rating: 4, comment: "Nice shop with reasonable prices." },
];

// --- Helper functions ---
const calculateAverageRating = (reviews: typeof REVIEWS) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return (total / reviews.length).toFixed(1);
};

const getRatingDistribution = (reviews: typeof REVIEWS) => {
  const distribution = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    distribution[r.rating - 1]++;
  });
  return distribution;
};

const ShopViews = () => {
  const avgRating = calculateAverageRating(REVIEWS);
  const distribution = getRatingDistribution(REVIEWS);
  const totalReviews = REVIEWS.length;

  return (
    <Card className="mt-6 w-full rounded-xl border bg-card shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-3 px-6">
        <CardTitle className="text-lg font-semibold">Shop Photos</CardTitle>
        <Button
          variant="default"
          size="sm"
          className="rounded-md bg-primary text-white hover:bg-primary/90"
        >
          + Add Photo
        </Button>
      </CardHeader>

      <CardContent className="p-0 overflow-x-hidden">
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="flex w-full rounded-none border-b bg-muted/20 px-6">
            <TabsTrigger
              value="photos"
              className="flex-1 rounded-none py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              Photos
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="flex-1 rounded-none py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

        
          {/* <TabsContent value="photos" className="mt-0 w-full overflow-x-hidden">
            {PHOTOS.length > 0 ? (
              <div className="grid w-full grid-cols-2 gap-4 p-6 md:grid-cols-4 lg:grid-cols-6 box-border">
                {PHOTOS.map((p, i) => (
                  <div
                    key={i}
                    className="aspect-[9/6] w-full rounded-md border bg-muted overflow-hidden"
                  >
                    <img
                      src={p || "/placeholder.svg"}
                      alt={`Shop photo ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full py-8 text-center text-sm text-muted-foreground">
                No photos uploaded yet.
              </div>
            )}
          </TabsContent> */}

          {/* <TabsContent value="reviews" className="mt-0 w-full overflow-x-hidden">
            {REVIEWS.length > 0 ? (
              <div className="p-6 space-y-6">
           
                <div className="rounded-lg border bg-muted/10 p-5 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Overall Ratings</h3>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
               
                    <div className="flex flex-col items-center justify-center text-center min-w-[120px]">
                      <span className="text-4xl font-bold text-primary">{avgRating}</span>
                      <div className="text-yellow-500 text-lg">
                        {"⭐".repeat(Math.round(Number(avgRating)))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {totalReviews} total reviews
                      </p>
                    </div>

                  
                    <div className="flex-1 space-y-1">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = distribution[star - 1];
                        const percent = (count / totalReviews) * 100 || 0;
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="w-10 text-sm font-medium">{star} ★</span>
                            <div className="h-2 flex-1 bg-muted rounded-full">
                              <div
                                className="h-full bg-yellow-400 transition-all duration-300"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <span className="w-6 text-xs text-muted-foreground text-right">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

             
                <div className="flex flex-col gap-4">
                  {REVIEWS.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-lg border bg-muted/10 p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{r.name}</h3>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <div className="mt-1 text-yellow-500">
                        {"⭐".repeat(r.rating)}{" "}
                        <span className="text-muted-foreground text-xs">
                          ({r.rating}/5)
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full py-8 text-center text-sm text-muted-foreground">
                No reviews yet.
              </div>
            )}
          </TabsContent> */}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShopViews;
