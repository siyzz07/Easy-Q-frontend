import { useEffect, useState, type FC } from "react";
import { X, Plus, Image as ImageIcon } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { IService, IStaff } from "../../Shared/types/Types";
import { AxiosError } from "axios";
import { addService, getAllStffs } from "../../Services/ApiService/VendorApiServices";
import { uploadToCloudinary } from "../../Utils/cloudinaryUtils";
import { toast } from "react-toastify";

interface StaffMember {
  id: string;
  name: string;
  title: string;
}



interface IAddService {
  onClose: () => void;
}

let initialValues: IService = {
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
        !value || (value && ["image/jpeg",
              "image/png",
              "image/jpg",
              "image/webp",
              "image/gif",
              "image/bmp",
              "image/tiff",
              "image/svg+xml",
              "image/x-icon",
              "image/heic",
              "image/heif",
              "image/avif",].includes(value.type))
    ),
});

const AddService: FC<IAddService> = ({ onClose }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [staffMembers, setStaffMembers] = useState<IStaff[] | []>([]);

  useEffect(() => {
    getStaffs();
  }, []);

  const getStaffs = async () => {
    try {
      let response = await getAllStffs();
      if (response?.data?.data) {
        setStaffMembers(response.data.data);
      }
      console.log(response);
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
      console.log("values :>> ", values);
      const response = await addService(values);
      if (response.data.message) {
        toast.success(response.data.message);
      }
      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.request.data.message) {
          toast.error(error.request.data.message);
        }
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Service</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* ✅ Formik Section */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values, isValid ,isSubmitting}) => (
            <Form className="p-6 space-y-6">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Service Name<span className="text-red-500">*</span>
                </label>
                <Field
                  name="serviceName"
                  placeholder="Enter service name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="serviceName"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Duration and Price in one row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Duration
                  </label>
                  <div className="flex items-center gap-3">
                    <Field
                      name="duration"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">min</span>
                  </div>
                  <ErrorMessage
                    name="duration"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* ✅ Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Price<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">₹</span>
                    <Field
                      name="price"
                      type="number"
                      placeholder="Enter price"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <ErrorMessage
                    name="price"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows={5}
                  placeholder="Describe this service..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Service Image<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="image-upload"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition"
                  >
                    <ImageIcon size={18} />
                    Upload
                  </label>
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
                        reader.onload = () =>
                          setImagePreview(reader.result as string);
                        reader.readAsDataURL(file);
                      } else {
                        setImagePreview(null);
                      }
                    }}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 rounded-md border object-cover"
                    />
                  )}
                </div>
                <ErrorMessage
                  name="image"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Available Staff */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Available Staff<span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-md p-4 space-y-3 max-h-48 overflow-y-auto">
                  {staffMembers.map((staff) => (
                    <div key={staff._id} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id={`staff-${staff._id}`}
                        checked={values.availableStaff.includes(
                          staff._id ?? ""
                        )}
                        onChange={() => {
                          const updated = values.availableStaff.includes(
                            staff._id ?? ""
                          )
                            ? values.availableStaff.filter(
                                (id) => id !== staff._id
                              )
                            : [...values.availableStaff, staff._id];
                          setFieldValue("availableStaff", updated);
                        }}
                        className="mt-1 w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                      <label
                        htmlFor={`staff-${staff._id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {staff.staffName}
                        </div>
                        {/* <div className="text-xs text-gray-500">
                          {staff.title}
                        </div> */}
                      </label>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name="availableStaff"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Footer */}
              <div className="flex justify-center p-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={!isValid ||isSubmitting}
                  className={`flex items-center gap-2 px-6 py-2 font-medium rounded-md transition-colors
                     ${
                       isValid
                         ? "bg-blue-600 hover:bg-blue-700 text-white"
                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
                     }`}
                >
                  {isSubmitting? 'submitting...':'Add Service'} 
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddService;
