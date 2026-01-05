import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editProfile } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, Loader2 } from "lucide-react";

interface ModalProps {
  name: string;
  email: string;
  phone: string;
  onClose: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
    .required("Name is required")
    .test("no-only-spaces", "Name cannot be only spaces", (value) =>
      value ? value.trim().length > 0 : false
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

const EditProfileModal: React.FC<ModalProps> = ({
  name,
  email,
  phone,
  onClose,
}) => {
  const initialValues: FormValues = { name, email, phone };

  const handleSubmit = async (values: FormValues) => {
    try {
      const hasChanges = Object.keys(initialValues).some(
        (key) => (values as any)[key] !== (initialValues as any)[key]
      );

      if (!hasChanges) {
        toast.info("No changes detected!");
        onClose();
        return;
      }

      const response = await editProfile(values);
      if (response.data.message) {
        toast.success(response.data.message);
      } else {
        toast.error("Error updating profile");
      }

      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to update profile"
        );
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Decorative Header */}
          <div className="h-24 bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-between px-8 text-white">
            <div>
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <p className="text-xs font-medium text-white/80">Update your account details</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
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
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                      <User size={14} className="text-indigo-500" /> Full Name
                    </label>
                    <div className="relative">
                      <Field
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 font-medium text-slate-700 bg-slate-50/50"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-[10px] font-bold uppercase tracking-tight pl-2"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 opacity-70">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                      <Mail size={14} className="text-indigo-500" /> Email Address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      readOnly
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-100/50 cursor-not-allowed font-medium text-slate-500 outline-none"
                    />
                    <p className="text-[10px] text-slate-400 font-semibold pl-2 italic">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                      <Phone size={14} className="text-indigo-500" /> Phone Number
                    </label>
                    <Field
                      type="text"
                      name="phone"
                      placeholder="10 digit number"
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 font-medium text-slate-700 bg-slate-50/50"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-[10px] font-bold uppercase tracking-tight pl-2"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all duration-300 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Updating...
                      </>
                    ) : (
                      "Save Changes"
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
export default EditProfileModal;
