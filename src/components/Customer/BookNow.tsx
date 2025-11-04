import React, { useEffect, useState, type FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MapPin, User, X } from "lucide-react";
import type {
  ICustomerAddress,
  IService,
  IStaff,
} from "../../Shared/types/Types";
import { getAddress } from "../../Services/CustomerApiService";
import { useNavigate } from "react-router-dom";

interface Staff {
  id: number;
  name: string;
  avatar?: string;
}

const addresses = [
  "123 MG Road, Bangalore",
  "456 Marine Drive, Mumbai",
  "789 Anna Nagar, Chennai",
];

interface IBookNow {
  onClose: () => void;
  data: IService;
  shopId:string
}

const initialValues = {
  staff: "",
  address: "",
};

const validationSchema = Yup.object({
  staff: Yup.string().required("Please select a staff member"),
  address: Yup.string().required("Please select an address"),
});

  const BookNow: FC<IBookNow> = ({ onClose, data,shopId }) => {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [addresses, setAddress] = useState<ICustomerAddress[]>([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    getCustomerAddress();
  }, []);

  const getCustomerAddress = async () => {
    try {
      let response = await getAddress();
      if (response?.data?.data) {
        setAddress(response.data.data);
      }
    } catch (error: unknown) {
      console.log("error to get customer address");
    }
  };

  const today = new Date();

  let staffList: any = data.availableStaff;

  const allDates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const formatDay = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "short" });
  const formatDate = (date: Date) => date.getDate();



const handleSubmit = (
  values: typeof initialValues,
  selectedDate: Date,
  data: IService
) => {
  
  
  
  
  let bookingData = {
    staffId:values.staff,
    addressId:values.address,
    serviceId:data._id,
    selectedDate:selectedDate,
    shopId:shopId
  }

  let encode = btoa(JSON.stringify(bookingData))
    navigate(`/customer/service/checkout?bookingId=${encode}`)
  };
  






  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000055] backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Book Your Time
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Service Name */}
        <div className="mb-5 text-center">
          <h3 className="text-lg font-semibold text-blue-700">
            {data?.serviceName || "Selected Service"}
          </h3>
        </div>

        {/* Date Selector */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-3 overflow-hidden">
            {allDates.map((date) => {
              const isSelected =
                date.toDateString() === selectedDate.toDateString();

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center w-12 h-16 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xs">{formatDay(date)}</span>
                  <span className="text-lg font-semibold">
                    {formatDate(date)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values, selectedDate, data)}
        >
          {() => (
            <Form>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Staff
                </label>
                {staffList.length === 0 ? (
                  <p className="text-gray-500 text-sm">No staff found</p>
                ) : (
                  <div className="relative">
                    <Field
                      as="select"
                      name="staff"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                    >
                      <option value="">Choose Staff</option>
                      {staffList.map((staff: any) => (
                        <option key={staff._id} value={staff._id}>
                          {staff.staffName}
                        </option>
                      ))}
                    </Field>
                    <User className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                  </div>
                )}
                <ErrorMessage
                  name="staff"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Address
                </label>
                {addresses.length === 0 ? (
                  <p className="text-gray-500 text-sm">No address added</p>
                ) : (
                  <div className="relative">
                    <Field
                      as="select"
                      name="address"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                    >
                      <option value="">Choose Address</option>
                      {addresses.map((address, i) => (
                        <option key={i} value={address._id}>
                          {`${address.address}-${address.city}`}
                        </option>
                      ))}
                    </Field>
                    <MapPin className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                  </div>
                )}
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-lg shadow-md transition disabled:opacity-50"
              >
                Confirm Booking
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookNow;
