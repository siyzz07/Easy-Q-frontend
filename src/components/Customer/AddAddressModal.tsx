import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Map from "../Shared/Map"; 
import { postNewAddress } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";
import { Axios, AxiosError } from "axios";

const initialValues = {
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  coordinates: { lat: 0, lng: 0 },
};


const validationSchema = Yup.object({
  address: Yup.string()
    .required("Address is required")
    .matches(/^[A-Za-z0-9\s,.-]+$/, "Invalid characters in address")
    .test(
      "not-empty",
      "Address cannot be only spaces",
      (val) => val?.trim().length > 0
    ),
  city: Yup.string()
    .required("City is required")
    .matches(/^[A-Za-z\s]+$/, "City can contain only letters")
    .test(
      "not-empty",
      "City cannot be only spaces",
      (val) => val?.trim().length > 0
    ),
  state: Yup.string()
    .required("State is required")
    .matches(/^[A-Za-z\s]+$/, "State can contain only letters")
    .test(
      "not-empty",
      "State cannot be only spaces",
      (val) => val?.trim().length > 0
    ),
  country: Yup.string()
    .required("Country is required")
    .matches(/^[A-Za-z\s]+$/, "Country can contain only letters")
    .test(
      "not-empty",
      "Country cannot be only spaces",
      (val) => val?.trim().length > 0
    ),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone must be numbers only")
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone can't exceed 15 digits")
    .required("Phone is required"),
  coordinates: Yup.object().shape({
    lat: Yup.number()
      .required("Latitude required")
      .notOneOf([0], "Please select a valid location"),
    lng: Yup.number()
      .required("Longitude required")
      .notOneOf([0], "Please select a valid location"),
  }),
});

interface Props {
  onClose: () => void;
}

const AddAddressModal: React.FC<Props> = ({ onClose }) => {
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      values.phone=values.phone.toString()
      const response = await postNewAddress(values);
      onClose();

      if (response?.data?.message) {
        toast.success(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error to add address!");
        }
      }
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white z-10 pb-2 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Add Address</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values, isValid }) => (
            <Form className="flex flex-col gap-4">
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <Field
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <Field
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <Field
                  type="text"
                  name="country"
                  placeholder="Enter country"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <Field
                  type="number"
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Map */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shop Location (Map)
                </label>
                <div className="mt-1 h-40 w-full border rounded-md overflow-hidden">
                  <Map
                    onSelect={(loc) => {
                      setFieldValue("coordinates", loc);
                    }}
                  />
                </div>

                {values.coordinates.lat && values.coordinates.lng ? (
                  <p className="mt-2 text-gray-700 text-sm">
                    Latitude: {values.coordinates.lat.toFixed(6)}, Longitude:{" "}
                    {values.coordinates.lng.toFixed(6)}
                  </p>
                ) : (
                  <p className="mt-2 text-gray-500 text-sm">
                    No location selected
                  </p>
                )}

              
                <ErrorMessage
                  name="coordinates.lat"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <ErrorMessage
                  name="coordinates.lng"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`w-full py-2 rounded-md text-white font-semibold transition ${
                  isSubmitting || !isValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Save Address"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddAddressModal;
