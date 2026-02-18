import { useState, type FC } from "react";
import type { IService, IStaff } from "../../Shared/types/Types";
import { Clock, DollarSign } from "lucide-react";
import BookNow from "./BookNow";
import type { IvendroFullData } from "../../Shared/types/Types";
import { bookAvailableTime } from "../../Services/ApiService/BookingApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";


interface InterfaceServicesList {
  services: IService[];
  shopId: string;
  shopData: IvendroFullData;
}

const ServicesList: FC<InterfaceServicesList> = ({
  services,
  shopId,
  shopData,
}) => {

  const [bookService, setBookService] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<IService | null>(null);
  const navigate = useNavigate();




  const handleSubmit = async (
    values: { address: string; preferredTime: string; staff: string },
    date: Date,
    service: any,
  ) => {
    try {
      const bookingData = {
        staffId: values.staff,
        addressId: values.address,
        timePreffer: values.preferredTime,
        serviceId: service.id!,
        date: date,
        shopId,
      };

      let response = await bookAvailableTime(bookingData);
      console.log(response.data.success);

      if (response?.data.success == false) {
        toast.info(response.data.message, { autoClose: 3000 });
      } else {
        const checkoutData = {
          staffId: values.staff,
          addressId: values.address,
          serviceId: service.id,
          selectedDate: date,
          bookingId: response.data.bookingId,
          shopId,
        };
        navigate(
          `/customer/service/checkout?bookingId=${btoa(
            JSON.stringify(checkoutData),
          )}`,
        );
      }
    } catch (error: unknown) {
      setBookService(false);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "service not available");
      }
    }
  };




  

  const staffAvailable = (data: any) => {
    const available = data.some((value: IStaff) => value.isActive == true);
    return available;
  };

  return (
    <>
      {/* book now modal */}
      {bookService && (
        <BookNow
          onClose={() => setBookService(false)}
          data={serviceData as IService}
          shopId={shopId}
          shopData={shopData}
          onSubmit={handleSubmit}
          type="booking"
        />
      )}

      <section className="py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 gap-4 px-2">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Our Services
            </h2>
            <p className="text-muted-foreground mt-1">
              Choose from our wide range of professional services
            </p>
          </div>
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold border border-primary/20">
            {services.filter((s) => s.isActive).length} Available
          </span>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-border/50 hover:border-primary/20 flex flex-col"
            >
              {/* Service Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={(service.image as string) || "/placeholder.svg"}
                  alt={service.serviceName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm ${
                      service.isActive && staffAvailable(service.availableStaff)
                        ? "bg-white/90 text-green-700 dark:bg-black/80 dark:text-green-400"
                        : "bg-white/90 text-red-700 dark:bg-black/80 dark:text-red-400"
                    }`}
                  >
                    {service.isActive && staffAvailable(service.availableStaff)
                      ? "Available"
                      : "Unavailable"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {service.serviceName}
                  </h3>
                  <div className="flex items-center gap-1 text-primary font-bold bg-primary/5 px-2 py-1 rounded-lg shrink-0">
                    <DollarSign size={16} />
                    <span>{service.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Clock size={16} className="text-blue-500" />
                  <span>{service.duration} mins</span>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 md:line-clamp-3 mb-6 flex-1">
                  {service.description}
                </p>

                {/* Book Button */}
                <div className="mt-auto">
                  {service.isActive &&
                  staffAvailable(service.availableStaff) ? (
                    <button
                      onClick={() => {
                        setBookService(true);
                        setServiceData(service);
                      }}
                      className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:translate-y-[-2px] active:translate-y-[0px]"
                    >
                      Book Appointment
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 bg-muted text-muted-foreground rounded-xl font-medium cursor-not-allowed border border-border"
                    >
                      Currently Unavailable
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No services found.
          </div>
        )}
      </section>
    </>
  );
};

export default ServicesList;
