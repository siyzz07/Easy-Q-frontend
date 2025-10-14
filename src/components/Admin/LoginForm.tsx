import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { loginAdmin } from "../../Services/AdminApiService";
import { toast } from "react-toastify";
import { setAccessToken } from "../../Utils/tokenUtils";
import { useDispatch } from "react-redux";
import { adminLoginSuccess } from "../../Redux/AdminAuthSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await loginAdmin(values);
      if (response.data.accesstoken) {
        setAccessToken(response.data.accesstoken);
        dispatch(adminLoginSuccess(response.data.accesstoken));
        navigate("/admin");
      }
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data) {
        toast.error(error.response.data);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-1000 p-4">
      <div className="bg-gray-800 text-white shadow-lg rounded-xl w-full max-w-sm p-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-xl font-semibold">Easy Q Admin</h1>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* Email Field */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-300 font-medium mb-1">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-1" />
              </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-300 font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-400 text-xs mt-1" />
                <div className="text-right mt-1">
                  <a href="#" className="text-blue-500 text-xs hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium text-sm transition"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
