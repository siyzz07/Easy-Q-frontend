import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FC } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils";
import { editShopData } from "../../Services/ApiService/VendorApiServices";
import type { IVendroShopData } from "../../Shared/types/Types";
import { X } from "lucide-react";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface IEditModal {
  onClose: () => void;
  vendorData: IVendroShopData;
}

const EditProfileModal: FC<IEditModal> = ({ onClose, vendorData }) => {

  console.log('vendorData :>> ', vendorData);


  const navigate = useNavigate();

  const initialValues: any = {
    shopName: vendorData.shopName || "",
    state: vendorData.state || "",
    city: vendorData.city || "",
    openAt: vendorData.openAt || "",
    closeAt: vendorData.closeAt || "",
    ProfileImage: vendorData.ProfileImage || "",
    workingDays: vendorData.workingDays || [],
  };

  const validationSchema = Yup.object({
    shopName: Yup.string().required("Shop name is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    openAt: Yup.string().required("Opening time is required"),
    closeAt: Yup.string().required("Closing time is required"),
    ProfileImage: Yup.mixed().required("Image is required"),
    workingDays: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one working day"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {

  
      const imageUrl = values.ProfileImage && typeof values.ProfileImage !== "string"
          ? await uploadToCloudinary(values.ProfileImage, "shop-images")
          : typeof values.ProfileImage === "string"
          ? values.ProfileImage
          : "";

        
      const formData = new FormData();
      formData.append("shopName", values.shopName);
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("openAt", values.openAt);
      formData.append("closeAt", values.closeAt);
      formData.append("ProfileImage", imageUrl.secure_url?imageUrl.secure_url:imageUrl);
      formData.append("workingDays", values.workingDays);

      const response = await editShopData(formData);
      if (response.data.message) {
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong while saving shop details");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="
          relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl 
          max-h-[90vh] overflow-y-auto 
          p-6 sm:p-8 md:p-10
          scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Edit Shop Details
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => {
            const toggleDay = (day: string) => {
              const updatedDays = values.workingDays.includes(day)
                ? values.workingDays.filter((d: string) => d !== day)
                : [...values.workingDays, day];
              setFieldValue("workingDays", updatedDays);
            };

            return (
              <Form className="space-y-5 sm:space-y-6">
                {/* Shop Name */}
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">
                    Shop Name
                  </label>
                  <Field
                    type="text"
                    name="shopName"
                    placeholder="Enter shop name"
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name="shopName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-700 mb-1">
                        State
                      </label>
                      <Field
                        type="text"
                        name="state"
                        placeholder="Enter state"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-700 mb-1">
                        Open At
                      </label>
                      <Field
                        type="time"
                        name="openAt"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      />
                      <ErrorMessage
                        name="openAt"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-700 mb-1">
                        City
                      </label>
                      <Field
                        type="text"
                        name="city"
                        placeholder="Enter city"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-700 mb-1">
                        Close At
                      </label>
                      <Field
                        type="time"
                        name="closeAt"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                      />
                      <ErrorMessage
                        name="closeAt"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Working Days */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Working Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {weekdays.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-4 py-2 rounded-xl border text-sm sm:text-base ${
                          values.workingDays.includes(day)
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                        } transition`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  <ErrorMessage
                    name="workingDays"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Profile Image */}
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {values.ProfileImage && typeof values.ProfileImage === "string" && (
                    <img
                      src={values.ProfileImage}
                      alt="Profile Preview"
                      className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl border shadow-sm"
                    />
                  )}
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setFieldValue(
                          "ProfileImage",
                          event.currentTarget.files?.[0] || values.ProfileImage
                        )
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                    />
                    <ErrorMessage
                      name="ProfileImage"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition shadow"
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfileModal;
