import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editAddress } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { ICustomerAddress } from "../../Shared/types/Types";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, Loader2, Save } from "lucide-react";

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
});

interface Props {
  onClose: () => void;
  data: ICustomerAddress | null;
}

const EditAddressModal: React.FC<Props> = ({ onClose, data }) => {
  const initialValues = {
    address: data?.address || "",
    city: data?.city || "",
    state: data?.state || "",
    country: data?.country || "",
    phone: data?.phone || "",
    _id: data?._id,
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting }: any
  ) => {
    try {
      const hasChanges = Object.keys(initialValues).some(
        (key) => (values as any)[key] !== (initialValues as any)[key]
      );

      if (!hasChanges) {
        toast.info("No changes detected!");
        onClose();
        return;
      }
      values.phone = values.phone.toString();
      let response = await editAddress(values);
      if (response.data.message) {
        toast.success(response.data.message);
      }
      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something went wrong");
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
          className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-8 bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-between text-white shrink-0">
            <div>
              <h2 className="text-2xl font-black">Edit Address</h2>
              <p className="text-sm font-medium opacity-80">Update your saved location</p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid }) => (
                <Form className="space-y-6">
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
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">City</label>
                      <Field
                        type="text"
                        name="city"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">State</label>
                      <Field
                        type="text"
                        name="state"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Country</label>
                      <Field
                        type="text"
                        name="country"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                        <Phone size={14} className="text-indigo-500" /> Phone
                      </label>
                      <Field
                        type="number"
                        name="phone"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all duration-300 active:scale-95 disabled:bg-slate-200 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Update Address
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
export default EditAddressModal;
