import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editProfile } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000068] bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email (Read Only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  readOnly
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed mt-1"
                />
                <ErrorMessage
                  name="email"
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
                  type="text"
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfileModal;
