import React from "react";
// import Image from "next/image";
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

const ShopImages = () => {
  return (
   <Card className="mt-6 w-full rounded-xl border bg-card shadow-sm">
  <CardHeader className="flex flex-row items-center justify-between pb-3">
    <CardTitle className="text-lg font-semibold">Shop Photos</CardTitle>
    <Button
      variant="default"
      size="sm"
      className="rounded-md bg-primary text-white hover:bg-primary/90"
    >
      + Add Photo
    </Button>
  </CardHeader>

  <CardContent className="p-0">
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

      {/* <TabsContent value="photos" className="mt-0 w-full">
        {PHOTOS.length > 0 ? (
          <div className="grid w-full grid-cols-2 gap-4 p-6 md:grid-cols-4 lg:grid-cols-6">
            {PHOTOS.map((p, i) => (
              <div
                key={i}
                className="aspect-[9/6] w-full overflow-hidden rounded-md border bg-muted"
              >
                <Image
                  src={p || "/placeholder.svg"}
                  alt={`Shop photo ${i + 1}`}
                  width={320}
                  height={214}
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
    </Tabs>
  </CardContent>
</Card>

  );
};

export default ShopImages;
