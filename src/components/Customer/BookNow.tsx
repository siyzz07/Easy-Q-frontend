import React, { useEffect, useState, type FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MapPin, User, X, Clock } from "lucide-react";
import type {
  ICustomerAddress,
  IService,
  IStaff,
} from "../../Shared/types/Types";
import { getAddress } from "../../Services/ApiService/CustomerApiService";
import { useNavigate } from "react-router-dom";
import type { IvendroFullData } from "../../pages/Customer/ViewServicesPage";
import { convertRailwayTime } from "../../utils/convertRailwayTime";
import { toast } from "react-toastify";
import { bookAvailableTime } from "../../Services/ApiService/CustomerApiService";

interface IBookNow {
  onClose: () => void;
  data: IService;
  shopId: string;
  shopData: IvendroFullData;
}

const initialValues = {
  staff: "",
  address: "",
  preferredTime: "",
};

const validationSchema = Yup.object({
  staff: Yup.string().required("Please select a staff member"),
  address: Yup.string().required("Please select an address"),
  preferredTime: Yup.string().required("Please select a preferred time"),
});

const BookNow: FC<IBookNow> = ({ onClose, data, shopId, shopData }) => {
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

  // ---- staff availability check ----
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

  const handleSubmit = async (
    values: typeof initialValues,
    date: Date,
    service: IService
  ) => {
    try {
      // if (!selectedStaff || !selectedDate || !value) return;

      const bookingData = {
        staffId: values.staff,
        addressId: values.address,
        timePreffer: values.preferredTime,
        serviceId: service._id!,
        date: date,
        shopId,
      };

      console.log(values);
      let response = await bookAvailableTime(bookingData);
      console.log("response", response.data);

      //  let response = await checkTimeAvailable({
      //     staffId: selectedStaff._id!,
      //     timePreffer: value,
      //     date: selectedDate,
      //     serviceId: data._id!,
      //   });

      console.log(response)
      if (response?.data.success == false) {
        toast.info(response.data.message, { autoClose: 3000 });
      } else {
        const bookingData = {
          staffId: values.staff,
          addressId: values.address,
          serviceId: service._id,
          selectedDate: date,
          bookingId:response.data.bookingId,
          shopId,
        };
        navigate( `/customer/service/checkout?bookingId=${btoa(JSON.stringify(bookingData))}`);

        console.log('bookingData',bookingData)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  };

  // const handleSubmit = (
  //   values: typeof initialValues,
  //   date: Date,
  //   service: IService
  // ) => {
  //   const bookingData = {
  //     staffId: values.staff,
  //     addressId: values.address,
  //     preferredTime: values.preferredTime,
  //     serviceId: service._id,
  //     selectedDate: date,
  //     shopId,
  //   };

  //   console.log('---',bookingData);

  //   navigate( `/customer/service/checkout?bookingId=${btoa(JSON.stringify(bookingData))}`);
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000055] backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Book Your Time</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <div className="text-center mb-4 font-semibold text-blue-600">
          {data.serviceName}
        </div>

        {/* Date Select */}
        <div className="flex justify-center gap-3 mb-5">
          {allDates.map((date) => {
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`w-12 h-16 flex flex-col items-center justify-center rounded-xl border ${
                  isSelected ? "bg-blue-600 text-white" : ""
                }`}
              >
                <span className="text-xs">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-lg font-bold">{date.getDate()}</span>
              </button>
            );
          })}
        </div>

        {!isWorkingDay(selectedDate, shopData.workingDays) ? (
          <div className="text-center text-red-500 font-medium mt-4 h-45 p-8">
            {" "}
            No booking available on this day{" "}
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(v) => handleSubmit(v, selectedDate, data)}
          >
            {({ setFieldValue }) => (
              <Form>
                {/* Staff */}
                <div className="mb-4">
                  <label>Select Staff</label>
                  <div className="relative">
                    <Field
                      as="select"
                      name="staff"
                      onChange={(e: any) => {
                        const staffId = e.target.value;
                        setFieldValue("staff", staffId);

                        const staffObj = staffList.find(
                          (s: IStaff) => s._id === staffId
                        );
                        setSelectedStaff(staffObj || null);
                      }}
                      className="w-full border px-3 py-2 rounded-lg appearance-none"
                    >
                      <option value="">Choose Staff</option>
                      {staffList.map((s: IStaff) => (
                        <option key={s._id} value={s._id}>
                          {s.staffName}
                        </option>
                      ))}
                    </Field>
                    <User
                      size={19}
                      className="absolute right-3 top-3 text-gray-400"
                    />
                  </div>
                  <ErrorMessage
                    name="staff"
                    className="text-red-500"
                    component="div"
                  />
                </div>

                {/* If staff available */}
                {staffAvailable ? (
                  <>
                    {/* Preferred Time */}
                    <div className="mb-4">
                      <label>Choose Time Preference</label>
                      <div className="relative">
                        <Field
                          as="select"
                          name="preferredTime"
                          onChange={(e: any) => {
                            const val = e.target.value;
                            setFieldValue("preferredTime", val);
                            // checkAvailableTime(val);
                          }}
                          className="w-full border px-3 py-2 rounded-lg appearance-none"
                        >
                          <option value="">Preferred Time</option>

                          {selectedStaff?.breaks?.map((b, i) => (
                            <option key={i} value={b.breakStartTime}>
                              Before {convertRailwayTime(b.breakStartTime)}
                            </option>
                          ))}

                          {selectedStaff?.closingTime && (
                            <option value={selectedStaff.closingTime}>
                              Before{" "}
                              {convertRailwayTime(selectedStaff.closingTime)}
                            </option>
                          )}
                        </Field>
                        <Clock
                          size={19}
                          className="absolute right-3 top-3 text-gray-400"
                        />
                      </div>
                      <ErrorMessage
                        name="preferredTime"
                        className="text-red-500"
                        component="div"
                      />
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                      <label>Select Address</label>
                      <div className="relative">
                        <Field
                          as="select"
                          name="address"
                          className="w-full border px-3 py-2 rounded-lg appearance-none"
                        >
                          <option value="">Choose Address</option>
                          {addresses.map((a) => (
                            <option key={a._id} value={a._id}>
                              {a.address}-{a.city}
                            </option>
                          ))}
                        </Field>
                        <MapPin
                          size={19}
                          className="absolute right-3 top-3 text-gray-400"
                        />
                      </div>

                      <ErrorMessage
                        name="address"
                        className="text-red-500"
                        component="div"
                      />
                    </div>

                    <button
                      className="w-full py-3 bg-blue-600 text-white rounded-lg"
                      type="submit"
                    >
                      Confirm Booking
                    </button>
                  </>
                ) : (
                  <div className="text-center text-red-500 font-medium mt-4 h-45 p-8">
                    Staff not available on this date
                  </div>
                )}
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default BookNow;
