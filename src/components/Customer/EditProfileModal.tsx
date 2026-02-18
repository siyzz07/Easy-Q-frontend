import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editProfile } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { X, User, Mail, Phone, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative z-10 border border-gray-100"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
        
        {/* Header */}
        <div className="px-8 pt-10 pb-6 flex items-start justify-between">
          <div className="space-y-1">
             <div className="flex items-center gap-2 text-blue-600 mb-2">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Settings</span>
             </div>
             <h2 className="text-2xl font-black text-gray-900 tracking-tight">Edit Profile</h2>
             <p className="text-gray-500 text-sm font-medium">Update your identity and contact info.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-all"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Container */}
        <div className="px-8 pb-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="flex flex-col gap-6">
                {/* Name Input */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Display Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                      <User size={18} />
                    </div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border ${touched.name && errors.name ? "border-red-300 ring-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"} rounded-2xl text-[15px] font-medium text-gray-700 outline-none transition-all placeholder:text-gray-300`}
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-[11px] font-bold ml-1 animate-in fade-in slide-in-from-top-1"
                  />
                </div>

                {/* Email Input (Read Only) */}
                <div className="space-y-2.5 opacity-80">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <Field
                      type="email"
                      name="email"
                      readOnly
                      disabled
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-100 border border-gray-200 rounded-2xl text-[15px] font-medium text-gray-400 cursor-not-allowed italic"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                      <Phone size={18} />
                    </div>
                    <Field
                      type="text"
                      name="phone"
                      placeholder="10-digit number"
                      className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border ${touched.phone && errors.phone ? "border-red-300 ring-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"} rounded-2xl text-[15px] font-medium text-gray-700 outline-none transition-all placeholder:text-gray-300`}
                    />
                  </div>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-[11px] font-bold ml-1 animate-in fade-in slide-in-from-top-1"
                  />
                </div>

                {/* Submit Actions */}
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-2xl hover:opacity-90 shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? "Updating Profile..." : "Save My Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-3.5 text-gray-400 text-sm font-bold hover:text-gray-600 transition-colors"
                  >
                    Discard Changes
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;
