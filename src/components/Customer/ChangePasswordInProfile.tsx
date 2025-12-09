import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { AxiosError } from "axios";
import { changePassword } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your new password"),
});

const ChangePasswordInProfile = () => {
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      let { confirmPassword, ...payload } = { ...values };
      let result = await changePassword(payload);
    

      if (result?.data.message) {
        toast.success(result.data.message);
        resetForm(); 
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast.error(error.response.data.message);
          resetForm(); 
        }
      }
    }
  };

  return (
    <div className="rounded-lg border border-gray-400 bg-card p-4 shadow-sm md:p-6">
      <h2 className="mb-4 font-bold text-xl">Reset Password</h2>

      <Formik
        initialValues={{
          currentPassword: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Current Password */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium mb-1"
              >
                Current Password
              </label>
              <Field
                name="currentPassword"
                type="password"
                placeholder="Enter your current password"
                className="w-full h-10 px-3 rounded-lg border-2 bg-gray-100 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                New Password
              </label>
              <div className="relative mt-1">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="w-full h-10 pr-12 px-3 rounded-lg border-2 bg-gray-100 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                className="w-full mt-1 px-3 h-10 rounded-lg bg-gray-100 border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 shadow-sm text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordInProfile;
