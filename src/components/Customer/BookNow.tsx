import { useEffect, useState, type FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MapPin, User, X, Clock, Calendar, ChevronRight, Banknote, Timer } from "lucide-react";
import type {
  ICustomerAddress,
  IService,
  IStaff,
  IvendroFullData,
} from "../../Shared/types/Types";
import { getAddress } from "../../Services/ApiService/CustomerApiService";
import { useNavigate } from "react-router-dom";
import { convertRailwayTime } from "../../utils/convertRailwayTime";
import { toast } from "react-toastify";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { bookAvailableTime } from "../../Services/ApiService/BookingApiService";

interface IBookNow {
  onClose: () => void;
  data : IService;
  shopId: string;
  shopData: IvendroFullData;
  type: "reschedule" | "booking";
  onSubmit: (
    values: typeof initialValues,
    date: Date,
    service: IService
  ) => Promise<void>;
}

const initialValues = {
  staff: "",
  address: "",
  preferredTime: "",
};


const BookNow: FC<IBookNow> = ({ onClose, data, shopId, shopData ,onSubmit,type = "booking"}) => {

 const validationSchema = Yup.object({
  staff: Yup.string().required("Please select a staff member"),

  address: Yup.string().when([], {
    is: () => type === "booking",
    then: (schema) =>
      schema.required("Please select an address"),
    otherwise: (schema) => schema.notRequired(),
  }),

  preferredTime: Yup.string().required("Please select a preferred time"),
});


  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [addresses, setAddress] = useState<ICustomerAddress[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);
  const [staffAvailable, setStaffAvailable] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getCustomerAddress();
  }, []);

  const getCustomerAddress = async () => {
    try {
      let response = await getAddress();
      if (response?.data?.data) setAddress(response.data.data);
    } catch {}
  };

  const today = new Date();
  const staffList: any = data.availableStaff || [];

  const allDates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const isWorkingDay = (date: Date, workingDays?: string[]) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return workingDays?.includes(days[date.getDay()]) ?? false;
  };

  const checkStaffAvailability = (date: Date, staff: IStaff | null) => {
    if (!date || !staff) {
      setStaffAvailable(true);
      return;
    }
    const day = date.toISOString().split("T")[0];
    const isBlocked = (staff.blockedDates ?? []).some((bd) => {
      return new Date(bd).toISOString().split("T")[0] === day;
    });
    setStaffAvailable(!isBlocked);
  };

  useEffect(() => {
    checkStaffAvailability(selectedDate, selectedStaff);
  }, [selectedDate, selectedStaff]);

  // const handleSubmit = async (
  //   values: typeof initialValues,
  //   date: Date,
  //   service: IService
  // ) => {
  //   try {
  //     const bookingData = {
  //       staffId: values.staff,
  //       addressId: values.address,
  //       timePreffer: values.preferredTime,
  //       serviceId: service._id!,
  //       date: date,
  //       shopId,
  //     };

  //     let response = await bookAvailableTime(bookingData);

  //     if (response?.data.success == false) {
  //       toast.info(response.data.message, { autoClose: 3000 });
  //     } else {
  //       const checkoutData = {
  //         staffId: values.staff,
  //         addressId: values.address,
  //         serviceId: service._id,
  //         selectedDate: date,
  //         bookingId: response.data.bookingId,
  //         shopId,
  //       };
  //       navigate(`/customer/service/checkout?bookingId=${btoa(JSON.stringify(checkoutData))}`);
  //     }
  //   } catch (error: unknown) {
  //     console.log(error);
  //   }
  // };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Book Appointment
              </h2>
              <p className="text-sm text-gray-500 mt-1">{data.serviceName}</p>
                 <div className="flex items-center gap-4 mt-3 text-xs font-medium text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-2.5 py-1.5 rounded-lg">
                   <Timer className="w-3.5 h-3.5" />
                   <span>{data.duration} mins</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-2.5 py-1.5 rounded-lg">
                   <Banknote className="w-3.5 h-3.5" />
                   <span>₹{data.price}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
 <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={(values) => onSubmit(values, selectedDate, data)}
>
                {({ setFieldValue, values }) => (
                  <Form className="space-y-6">
                    
                    {/* Date Selection - Keep Horizontal Scroll */}
                     <div className="space-y-2">
                         <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                             <Calendar className="w-4 h-4 text-blue-500" />
                             Select Date
                        </label>
                        <div className="flex gap-2 overflow-x-auto pb-2 items-center justify-center scrollbar-hide -mx-2 px-2">
                            {allDates.map((date) => {
                            const isSelected = date.toDateString() === selectedDate.toDateString();
                            const isAvailable = isWorkingDay(date, shopData.workingDays);
                            return (
                                <button
                                type="button"
                                key={date.toISOString()}
                                onClick={() => setSelectedDate(date)}
                                disabled={!isAvailable}
                                className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-18 py-2 rounded-lg border transition-all ${
                                    isSelected
                                    ? "bg-gray-900 text-white border-gray-900 ring-2 ring-gray-200 dark:ring-gray-700"
                                    : isAvailable
                                    ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-400"
                                    : "bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 opacity-50 cursor-not-allowed"
                                }`}
                                >
                                <span className={`text-[10px] uppercase font-semibold mb-1 ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                                </span>
                                <span className="text-lg font-bold">
                                    {date.getDate()}
                                </span>
                                </button>
                            );
                            })}
                        </div>
                         {!isWorkingDay(selectedDate, shopData.workingDays) && (
                            <div className="text-xs text-red-500 bg-red-50 p-2 rounded border border-red-100 text-center">
                               Shop closed on this day.
                            </div>
                         )}
                    </div>

                    {!isWorkingDay(selectedDate, shopData.workingDays) ? null : (
                        <>
                        {/* Staff Selection - Standard Select */}
                         <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <User className="w-4 h-4 text-purple-500" /> Select Professional
                            </label>
                            <div className="relative">
                                <Field
                                as="select"
                                name="staff"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const staffId = e.target.value;
                                    setFieldValue("staff", staffId);
                                    const staffObj = staffList.find((s: IStaff) => s._id === staffId);
                                    setSelectedStaff(staffObj || null);
                                    setFieldValue("preferredTime", "");
                                }}
                                className="w-full pl-3 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none text-sm"
                                >
                                <option value="">Choose Staff Member</option>
                                {staffList.map((s: IStaff) => (
                                    <option key={s._id} value={s._id}>
                                    {s.staffName}
                                    </option>
                                ))}
                                </Field>
                                <ChevronRight className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                            </div>
                            <ErrorMessage name="staff" component="p" className="text-xs text-red-500" />
                        </div>

                        {/* Preferred Time - Standard Select */}
                         <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-500" /> Preferred Time
                            </label>
                            
                            {!values.staff ? (
                                <div className="text-sm text-gray-500 italic px-1">Select a professional first</div>
                            ) : !staffAvailable ? (
                                <div className="text-sm text-red-500 px-1">Professional unavailable on this date</div>
                            ) : (
                                <div className="relative">
                                    <Field
                                    as="select"
                                    name="preferredTime"
                                    className="w-full pl-3 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none text-sm"
                                    >
                                    <option value="">Select Preferred Time</option>
                                    {selectedStaff?.breaks?.map((b, i) => (
                                        <option key={i} value={b.breakStartTime}>
                                        Before {convertRailwayTime(b.breakStartTime)}
                                        </option>
                                    ))}
                                    {selectedStaff?.closingTime && (
                                        <option value={selectedStaff.closingTime}>
                                        Before {convertRailwayTime(selectedStaff.closingTime)}
                                        </option>
                                    )}
                                    </Field>
                                    <ChevronRight className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                                </div>
                            )}
                             <ErrorMessage name="preferredTime" component="p" className="text-xs text-red-500" />
                        </div>

                        {/* Address - Standard Select */}
                        {type == "booking" &&
                        <div className="space-y-2">
                             <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-green-500" /> Location
                            </label>
                             <div className="relative">
                                    <Field
                                    as="select"
                                    name="address"
                                    className="w-full pl-3 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none text-sm"
                                    >
                                    <option value="">Select Address</option>
                                    {addresses.map((a) => (
                                        <option key={a._id} value={a._id}>
                                            {a.address} - {a.city}
                                        </option>
                                    ))}
                                    </Field>
                                    <ChevronRight className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                                </div>
                                {addresses.length === 0 && (
                                    <p className="text-xs text-orange-500">Please add an address in your profile.</p>
                                )}
                            <ErrorMessage name="address" component="p" className="text-xs text-red-500" />
                        </div>
                      }

                         <Button
                            type="submit"
                            className="w-full h-11 text-base font-semibold bg-primary hover:bg-blue-700 text-white rounded-xl shadow-md transition-all mt-4"
                        >
                            Confirm Booking
                        </Button>
                        </>
                    )}

                  </Form>
                )}
            </Formik>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookNow;
