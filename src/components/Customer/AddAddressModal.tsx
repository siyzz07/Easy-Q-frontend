import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Map from "../Shared/Map"; 
import { postNewAddress } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Navigation, Phone, Loader2, Plus } from "lucide-react";

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
      values.phone = values.phone.toString();
      const response = await postNewAddress(values);
      onClose();

      if (response?.data?.message) {
        toast.success(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Error to add address!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-8 bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-between text-white shrink-0">
            <div>
              <h2 className="text-2xl font-black">Add New Address</h2>
              <p className="text-sm font-medium opacity-80">Mark your location on the map</p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          <div className="overflow-y-auto p-8 custom-scrollbar">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values, isValid }) => (
                <Form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Form Fields */}
                    <div className="space-y-6">
                      {/* Address */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                          <MapPin size={14} className="text-indigo-500" /> Street Address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="123 Main St"
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 font-medium text-slate-700 bg-slate-50/50"
                        />
                        <ErrorMessage name="address" component="div" className="text-red-500 text-[10px] font-bold uppercase tracking-tight pl-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* City */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">City</label>
                          <Field
                            type="text"
                            name="city"
                            placeholder="City"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700"
                          />
                          <ErrorMessage name="city" component="div" className="text-red-500 text-[10px] font-bold uppercase tracking-tight pl-2" />
                        </div>
                        {/* State */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">State</label>
                          <Field
                            type="text"
                            name="state"
                            placeholder="State"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700"
                          />
                          <ErrorMessage name="state" component="div" className="text-red-500 text-[10px] font-bold uppercase tracking-tight pl-2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Country */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Country</label>
                          <Field
                            type="text"
                            name="country"
                            placeholder="Country"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700"
                          />
                          <ErrorMessage name="country" component="div" className="text-red-500 text-[10px] font-bold uppercase tracking-tight pl-2" />
                        </div>
                        {/* Phone */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                            <Phone size={14} className="text-indigo-500" /> Phone
                          </label>
                          <Field
                            type="number"
                            name="phone"
                            placeholder="Phone"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700"
                          />
                          <ErrorMessage name="phone" component="div" className="text-red-500 text-[10px] font-bold uppercase tracking-tight pl-2" />
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Map Selection */}
                    <div className="space-y-4 flex flex-col">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                        <Navigation size={14} className="text-indigo-500" /> Pin Location
                      </label>
                      <div className="flex-1 min-h-[250px] rounded-[2rem] overflow-hidden border border-slate-200 shadow-inner group">
                        <Map onSelect={(loc) => setFieldValue("coordinates", loc)} />
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 italic">
                        {values.coordinates.lat && values.coordinates.lng ? (
                          <div className="flex items-center justify-between text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                            <span>Lat: {values.coordinates.lat.toFixed(4)}</span>
                            <span>Lng: {values.coordinates.lng.toFixed(4)}</span>
                          </div>
                        ) : (
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">Tap the map to set location</p>
                        )}
                        <ErrorMessage name="coordinates.lat" component="div" className="text-red-500 text-[10px] font-bold text-center mt-1" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all duration-300 active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        Save Address
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddAddressModal;
