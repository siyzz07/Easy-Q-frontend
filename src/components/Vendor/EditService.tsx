import { useEffect, useState, type FC } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { IService, IStaff } from "../../Shared/types/Types";
import { AxiosError } from "axios";
import {
  addService,
  editServices,
  getAllStffs,
} from "../../Services/VendorApiServices";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils";
import { toast } from "react-toastify";

interface IAddService {
  onClose: () => void;
  data?: IService;
}

const validationSchema = (hasExistingImage: boolean) =>
  Yup.object({
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
      .test(
        "fileRequired",
        "Image is required",
        (value: any) => hasExistingImage || !!value
      )
      .test("fileSize", "File too large (max 6MB)", (value: any) => {
        if (!value || typeof value === "string") return true;
        return value.size <= 6 * 1024 * 1024;
      })
      .test("fileType", "Only JPG/PNG/WebP allowed", (value: any) => {
        if (!value || typeof value === "string") return true;
        return [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/jpg",
          "image/gif",
          "image/bmp",
          "image/tiff",
          "image/svg+xml",
          "image/x-icon",
          "image/heic",
          "image/heif",
          "image/avif",
        ].includes(value.type);
      }),
  });

const AddService: FC<IAddService> = ({ onClose, data }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    typeof data?.image === "string" ? data.image : null
  );
  const [staffMembers, setStaffMembers] = useState<IStaff[]>([]);

  useEffect(() => {
    getStaffs();
  }, []);

  const getStaffs = async () => {
    try {
      const response = await getAllStffs();
      if (response?.data?.data) setStaffMembers(response.data.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error fetching staff:", error.message);
      }
    }
  };

  const initialValues: IService = {
    serviceName: data?.serviceName || "",
    duration: data?.duration || "",
    price: data?.price || "",
    description: data?.description || "",
    availableStaff: data?.availableStaff || [],
    image: data?.image as string,
    isActive: data?.isActive ?? true,
  };

  const onSubmit = async (values: IService) => {
    try {
      values._id = data?._id;
      let payload;

      if (typeof values.image !== "string") {
        const imageUrl = values.image
          ? await uploadToCloudinary(values.image as File, "service-images")
          : "";
        payload = { ...values, image: imageUrl.secure_url };
      } else {
        payload = { ...values };
      }

      const response = data
        ? await editServices(payload)
        : await addService(payload);

      if (response.data.message) toast.success(response.data.message);
      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to save service");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {data ? "Edit Service" : "Add Service"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema(!!data?.image)}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values, isValid, isSubmitting }) => (
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

              {/* Duration & Price */}
              <div className="grid grid-cols-2 gap-4">
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
                  rows={4}
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
                      } else setImagePreview(null);
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
                        checked={values.availableStaff.includes(staff._id ?? "")}
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

              {/* Active Status Toggle */}
              <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3">
                <label className="text-sm font-medium text-gray-900">
                  Active Status
                </label>
                <div
                  onClick={() => setFieldValue("isActive", !values.isActive)}
                  className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors ${
                    values.isActive ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      values.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center p-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`flex items-center gap-2 px-6 py-2 font-medium rounded-md transition-colors
                     ${
                       isValid
                         ? "bg-blue-600 hover:bg-blue-700 text-white"
                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
                     }`}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : data
                    ? "Update Service"
                    : "Add Service"}
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
