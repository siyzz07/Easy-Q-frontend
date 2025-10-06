import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { loginAdmin } from "../../Services/AdminApiService";
import { toast } from "react-toastify";
import { adminSetAceesToken } from "../../Utils/tokenUtils";
import { useDispatch } from "react-redux";
import { adminLoginSuccess } from "../../Redux/AdminAuthSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await loginAdmin(values);
      if(response.data.accesstoken){
        adminSetAceesToken(response.data.accesstoken)
          dispatch(adminLoginSuccess(response.data.accesstoken))
          navigate('/admin')

      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data) {
          toast.error(error.response.data);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-black">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl text-white font-bold">Easy Q</h1>
        </div>
      </div>

      <h1 className="text-white text-2xl font-bold mb-4">Admin Login</h1>

      <div className="w-full max-w-md mx-auto p-6 space-y-4">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({}) => (
            <Form>
              {/* Email Field */}
              <div className="mb-4">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <div className="relative mt-1">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-12 pr-12 px-3 rounded-lg border-2 bg-white border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="text-red-500 text-sm mt-1"
                />
                <div className="text-right mt-2">
                  <a href="#" className="text-blue-400 text-sm hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-medium rounded-lg transition"
              >
                {true ? "Login" : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
