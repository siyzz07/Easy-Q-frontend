import React from "react";
import { Star } from "lucide-react";

interface Service {
  title: string;
  image?: string;
  rating: number;
  reviews: number;
  category: string;
  location: string;
}

const ShopDataCard: React.FC = () => {
  const services: Service[] = [
    {
      image: "https://images.unsplash.com/photo-1589987607627-2b46c3d43c25?w=800",
      title: "Spa & Wellness",
      rating: 4.8,
      reviews: 89,
      category: "Spa",
      location: "Los Angeles, USA",
    },
    {
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
      title: "Family Restaurant",
      rating: 4.3,
      reviews: 210,
      category: "Restaurant",
      location: "Chicago, USA",
    },
    {
      image: "https://images.unsplash.com/photo-1588776814546-d0d020a3b5c5?w=800",
      title: "Dental Checkup",
      rating: 4.7,
      reviews: 54,
      category: "Healthcare",
      location: "Houston, USA",
    }
    ,
    {
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
      title: "Family Restaurant",
      rating: 4.3,
      reviews: 210,
      category: "Restaurant",
      location: "Chicago, USA",
    },
    {
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
      title: "Family Restaurant",
      rating: 4.3,
      reviews: 210,
      category: "Restaurant",
      location: "Chicago, USA",
    },
    {
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
      title: "Family Restaurant",
      rating: 4.3,
      reviews: 210,
      category: "Restaurant",
      location: "Chicago, USA",
    },
  ];

  return (
    <>
      {services.map((service, idx) => (
        <article
          key={idx}
          className="overflow-hidden border border-gray-200 bg-white shadow-lg rounded-xl hover:shadow-2xl transition w-full"
        >
          <div className="p-4">
            {/* Image */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="h-48 w-full object-cover"
              />
            </div>

            {/* Service Info */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>

              {/* Rating */}
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={i < Math.floor(service.rating) ? "text-yellow-400" : "text-gray-300"}
                      size={14}
                    />
                  ))}
                  <span className="ml-1 font-medium">{service.rating.toFixed(1)}</span>
                  <span className="ml-1 text-[11px]">({service.reviews})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-indigo-100 text-indigo-700 px-2 py-0.5 text-[10px]">
                    {service.category}
                  </span>
                  <span className="rounded-md bg-gray-100 text-gray-700 px-2 py-0.5 text-[10px]">
                    {service.location}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                  Visit
                </button>
                <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default ShopDataCard;
