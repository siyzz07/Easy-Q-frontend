import { useEffect, useState, type FC } from "react";
import { X, Image as ImageIcon, Check } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { IService, IStaff } from "../../Shared/types/Types";
import { AxiosError } from "axios";
import { addService, getAllStffs } from "../../Services/ApiService/VendorApiServices";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface IAddService {
  onClose: () => void;
}

const initialValues: IService = {
  serviceName: "",
  duration: "",
  price: "",
  description: "",
  availableStaff: [],
  image: null,
};

const validationSchema = Yup.object({
  serviceName: Yup.string()
    .trim()
    .min(4, "Must be at least 4 characters")
    .matches(/^(?!\s*$).+$/, "Cannot be only spaces")
    .required("Service name is required"),
  duration: Yup.number()
    .typeError("Duration must be a number")
    .min(1, "Must be at least 1 minute")
    .required("Duration is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(1, "Price must be at least 1")
    .required("Price is required"),
  description: Yup.string()
    .trim()
    .min(5, "Must be at least 5 characters")
    .required("Description is required"),
  availableStaff: Yup.array()
    .min(1, "Select at least one staff member")
    .required("Required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "File too large (max 4MB)",
      (value: any) => !value || (value && value.size <= 4 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Only JPG/PNG allowed",
      (value: any) =>
        !value || (value && ["image/jpeg", "image/png", "image/webp"].includes(value.type))
    ),
});

const AddService: FC<IAddService> = ({ onClose }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [staffMembers, setStaffMembers] = useState<IStaff[]>([]);

  useEffect(() => {
    getStaffs();
  }, []);

  const getStaffs = async () => {
    try {
      let response = await getAllStffs();
      if (response?.data?.data) {
        setStaffMembers(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("error to fetch the staffs data");
      }
    }
  };

  const onSubmit = async (values: IService) => {
    try {
      const imageUrl = values.image
        ? await uploadToCloudinary(values.image as File, "service-images")
        : "";

      values.image = imageUrl.secure_url;
      const response = await addService(values);
      if (response.data.message) {
        toast.success(response.data.message);
      }
      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        }
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Service</h2>
              <p className="text-sm text-gray-500 mt-1">Create a new service offering for your customers.</p>
            </div>
            <button
                onClick={onClose}
                className="p-2 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all shadow-sm border border-gray-100"
            >
                <X size={20} />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 custom-scrollbar">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
            {({ setFieldValue, values, isValid ,isSubmitting}) => (
                <Form className="space-y-8">
                
                {/* Section 1: Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Service Name <span className="text-red-500">*</span>
                        </label>
                        <Field
                            name="serviceName"
                            placeholder="e.g. Haircut & Beard Trim"
                            className="w-full px-4 h-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                        />
                         <ErrorMessage name="serviceName" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                    </div>

                    <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Duration <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Field
                            name="duration"
                            type="number"
                            placeholder="30"
                            className="w-full px-4 h-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">min</span>
                        </div>
                        <ErrorMessage name="duration" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Price (₹) <span className="text-red-500">*</span>
                        </label>
                         <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                            <Field
                            name="price"
                            type="number"
                            placeholder="500"
                            className="w-full pl-10 pr-4 h-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                    </div>

                     <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <Field
                            as="textarea"
                            name="description"
                            rows={4}
                            placeholder="Describe what's included in this service..."
                            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 resize-none"
                        />
                         <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                    </div>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                {/* Section 2: Media & Staff */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Image Upload */}
                    <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Service Image <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                const file = e.currentTarget.files?.[0] || null;
                                setFieldValue("image", file);
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => setImagePreview(reader.result as string);
                                    reader.readAsDataURL(file);
                                } else {
                                    setImagePreview(null);
                                }
                                }}
                            />
                            <label
                                htmlFor="image-upload"
                                className={`flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${imagePreview ? "border-primary/50 bg-primary/5" : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"}`}
                            >
                                {imagePreview ? (
                                     <div className="relative w-full h-full p-2">
                                        <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-xl shadow-sm"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl mx-2 my-2">
                                            <span className="text-white font-medium text-sm">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <ImageIcon size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-gray-700">Click to upload</p>
                                        <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max 4MB)</p>
                                    </div>
                                )}
                            </label>
                             <ErrorMessage name="image" component="div" className="text-red-500 text-xs mt-2 font-medium" />
                        </div>
                    </div>

                    {/* Available Staff */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Assign Staff <span className="text-red-500">*</span>
                        </label>
                        <div className="border border-gray-200 rounded-2xl p-4 h-48 overflow-y-auto custom-scrollbar bg-gray-50/50">
                            {staffMembers.length > 0 ? (
                                <div className="space-y-2">
                                    {staffMembers.map((staff) => {
                                        const isSelected = values.availableStaff.includes(staff._id ?? "");
                                        return (
                                            <div 
                                                key={staff._id} 
                                                onClick={() => {
                                                    const updated = isSelected
                                                        ? values.availableStaff.filter((id) => id !== staff._id)
                                                        : [...values.availableStaff, staff._id];
                                                    setFieldValue("availableStaff", updated);
                                                }}
                                                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                                    isSelected 
                                                    ? "bg-white border-primary shadow-sm" 
                                                    : "bg-white border-gray-100 hover:border-gray-300"
                                                }`}
                                            >
                                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isSelected ? "bg-primary border-primary" : "border-gray-300 bg-white"}`}>
                                                    {isSelected && <Check size={12} className="text-white" />}
                                                </div>
                                                <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-gray-700"}`}>
                                                    {staff.staffName}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                                    <p className="text-sm">No staff members found.</p>
                                    <p className="text-xs mt-1">Add staff from the Staff page first.</p>
                                </div>
                            )}
                        </div>
                        <ErrorMessage name="availableStaff" component="div" className="text-red-500 text-xs mt-2 font-medium" />
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                     <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="px-6 py-2.5 text-sm font-bold text-white bg-primary rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Adding Service..." : "Create Service"}
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

export default AddService;
