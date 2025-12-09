import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DeleteButton from "./DeleteButton";
import Map from "../Shared/Map";
import { addShopData, getShopType } from "../../Services/ApiService/VendorApiServices";
import { uploadToCloudinary } from "../../Utils/cloudinaryUtils";
import type {
  IServiceVendorTypes,
  IShopData,
  IVendor,
} from "../../Shared/types/Types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ShopdataExtra = () => {
  useEffect(() => {}, []);

  let navigate = useNavigate();
  const [vendorTypes, setVendorType] = useState<IServiceVendorTypes[] | []>([]);

  let hasShop = useSelector((state: any) => state.vendorSlice.hasShop);
  useEffect(() => {
    if (hasShop == true) {
      navigate("/vendor");
    }
  });

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      let response = await getShopType();
      if (response?.data.data) {
        setVendorType(response.data.data);
      }
    } catch (error: unknown) {
      console.log("error to fetch the vendor types");
    }
  };

  const initialValues: IShopData = {
    state: "",
    city: "",
    shopType: "",
    openAt: "",
    closeAt: "",
    ProfileImage: "",
    workingDays: [] as string[],
    coordinates: { lat: 0, lng: 0 },
  };

  const validationSchema = Yup.object({
    state: Yup.string()
      .required("State is required")
      .matches(
        /^(?!.*\s{2,})[A-Za-z\s]+$/,
        "State can only contain letters and single spaces"
      )
      .test(
        "not-empty",
        "State cannot be just spaces",
        (val) => val?.trim().length > 0
      )
      .test(
        "no-repeated-letters",
        "State cannot contain the same letter repeated only",
        (val) => {
          if (!val) return false;
          const trimmed = val.replace(/\s/g, "");
          return !/^([A-Za-z])\1+$/.test(trimmed);
        }
      ),

    city: Yup.string()
      .required("City is required")
      .matches(
        /^(?!.*\s{2,})[A-Za-z\s]+$/,
        "City can only contain letters and single spaces"
      )
      .test(
        "not-empty",
        "City cannot be just spaces",
        (val) => val?.trim().length > 0
      )
      .test(
        "no-repeated-letters",
        "City cannot contain the same letter repeated only",
        (val) => {
          if (!val) return false;
          const trimmed = val.replace(/\s/g, "");
          return !/^([A-Za-z])\1+$/.test(trimmed);
        }
      ),

    shopType: Yup.string()
      .required("Shop type is required")
      .test(
        "not-empty",
        "Shop type cannot be just spaces",
        (val) => val?.trim().length > 0
      ),

    openAt: Yup.string()
      .required("Opening time is required")
      .matches(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Opening time must be in HH:MM format"
      ),

    closeAt: Yup.string()
      .required("Closing time is required")
      .matches(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Closing time must be in HH:MM format"
      )
      .test(
        "after-open",
        "Closing time must be after opening time",
        function (value) {
          const { openAt } = this.parent;
          if (!openAt || !value) return true;
          return value > openAt;
        }
      ),

    ProfileImage: Yup.mixed()
      .required("Image is required")
      .test(
        "fileSize",
        "Image size must be less than 4MB",
        (file: any) => !file || (file && file.size <= 4 * 1024 * 1024)
      )
      .test(
        "fileType",
        "Only JPG, JPEG, and PNG formats are allowed",
        (file: any) =>
          !file ||
          (file &&
            [
              "image/jpeg",
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
              "image/avif",
            ].includes(file.type))
      ),

    workingDays: Yup.array()
      .of(Yup.string().oneOf(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]))
      .min(1, "Select at least one working day")
      .required("Working days are required"),

    coordinates: Yup.object().shape({
      lat: Yup.number()
        .required("Latitude is required")
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90"),
      lng: Yup.number()
        .required("Longitude is required")
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180"),
    }),
  });
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const imageUrl = values.ProfileImage
        ? await uploadToCloudinary(values.ProfileImage, "shop-images")
        : "";

      const formData = new FormData();
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("shopType", values.shopType);
      formData.append("openAt", values.openAt);
      formData.append("closeAt", values.closeAt);
      formData.append("ProfileImage", imageUrl.secure_url);
      formData.append("workingDays",values.workingDays);
      formData.append("latitude", String(values.coordinates.lat));
      formData.append("longitude", String(values.coordinates.lng));

      const response = await addShopData(formData);
      console.log(response);

      if (response.data.message) {
        navigate("/vendor");
        toast.success("Shop details have been added successfully!");
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-slate-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl text-white font-bold text-center mb-8">
          Add Your Shop Details
        </h1>

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
              <Form>
                <section className="bg-white rounded-lg shadow-md p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        State
                      </label>
                      <Field
                        type="text"
                        name="state"
                        placeholder="Enter state"
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        City
                      </label>
                      <Field
                        type="text"
                        name="city"
                        placeholder="Enter city"
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        Shop Location (Map)
                      </label>
                      <div className="mt-1 h-32 w-full border rounded-md overflow-hidden">
                        <Map
                          onSelect={(loc) => {
                            setFieldValue("coordinates", loc);
                          }}
                        />
                      </div>
                      {values.coordinates.lat && values.coordinates.lng ? (
                        <p className="mt-2 text-gray-700">
                          Latitude: {values.coordinates.lat.toFixed(6)},
                          Longitude: {values.coordinates.lng.toFixed(6)}
                        </p>
                      ) : (
                        <p className="mt-2 text-gray-500">
                          No location selected
                        </p>
                      )}
                      <ErrorMessage
                        name="coordinates"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        Shop Type<span className="text-red-500">*</span>
                      </label>

                      <Field
                        as="select"
                        name="shopType"
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select type</option>

                        {vendorTypes.map((type:IServiceVendorTypes) => (
                          <option key={type._id} value={type._id}>
                            {type.serviceName}
                          </option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name="shopType"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        Working Days
                      </label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {weekdays.map((day) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`px-3 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                              values.workingDays.includes(day)
                                ? "bg-blue-500 text-white"
                                : "bg-white hover:bg-blue-50"
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                      <ErrorMessage
                        name="workingDays"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">
                          Open At
                        </label>
                        <Field
                          type="time"
                          name="openAt"
                          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage
                          name="openAt"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">
                          Close At
                        </label>
                        <Field
                          type="time"
                          name="closeAt"
                          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage
                          name="closeAt"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        Add Image
                      </label>
                      <input
                        type="file"
                        onChange={(event) =>
                          setFieldValue(
                            "ProfileImage",
                            event.currentTarget.files?.[0] || null
                          )
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="ProfileImage"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                      {/* <DeleteButton
                        onDelete={() => console.log()}
                      /> */}
                      <button
                        type="submit"
                        className="flex-1 rounded-xl border-2 border-blue-500 bg-blue-500 text-white py-2 font-semibold hover:opacity-90 transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </section>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ShopdataExtra;
