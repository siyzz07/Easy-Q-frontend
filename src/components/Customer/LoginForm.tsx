import { useState } from "react";
import type { FC } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { ICustomerLogin } from "../../Shared/types/Types";
import {
  googleAuth,
  loginCustomer,
} from "../../Services/ApiService/CustomerApiService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { setAccessToken } from "../../utils/tokenUtils";
import { useDispatch } from "react-redux";
import { customerLoginSuccess } from "../../Redux/CustomeSlice";
import { connectSocketAction } from "../../Redux/SocketSlice";
import { GoogleLogin } from "@react-oauth/google";
import { connectSocket } from "../../Services/Socket/Socket";
import { registerSocketEvents } from "../../Services/Socket/SocketEvents";

const LoginForm: FC = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .test(
        "not-all-same",
        "Password cannot contain the same character repeated",
        (value) => {
          if (!value) return false;
          return !/^([a-zA-Z0-9])\1*$/.test(value);
        }
      )
      .test(
        "not-empty-spaces",
        "Password cannot be only spaces",
        (value) => value?.trim().length > 0
      ),
  });

  const submit = async (values: ICustomerLogin) => {
    try {
      const response = await loginCustomer(values);
      if (response.data.accesstoken) {
        setAccessToken(response.data.accesstoken);
        dispatch(customerLoginSuccess(response.data.accesstoken));
        dispatch(connectSocketAction(response.data.accesstoken)); // socket io
        navigate("/customer");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error?.response?.data) {
          toast.error(error.response.data.message);
        }
      } else {
        console.log("customer login error", error);
      }
    }
  };

 

  const handleGoogleLogin = async (res: any) => {
    try {
      const token = res.credential; 
      const response = await googleAuth(token);
      if (response.data.accesstoken) {
        setAccessToken(response.data.accesstoken);
        dispatch(customerLoginSuccess(response.data.accesstoken));
        dispatch(connectSocketAction(response.data.accesstoken));
        navigate("/customer");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-base">Q</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Easy Q
          </h1>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
        <p className="text-gray-500 text-sm">
          Log in to book your appointments.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="mb-6 p-1 bg-gray-50 rounded-lg inline-flex w-full border border-gray-100">
        <button className="flex-1 py-1.5 text-sm font-bold text-gray-900 bg-white shadow-sm rounded-md transition-all border border-gray-100">
          Customer
        </button>
        <button
          className="flex-1 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
          onClick={() => navigate("/vendor/login")}
        >
          Vendor
        </button>
      </div>

      <Formik
        initialValues={{ email: "", password: "", role: "customer" }}
        validationSchema={LoginSchema}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 h-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-[10px] mt-1 font-medium"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700">
                  Password
                </label>
                <Link
                  to="/customer/forgot-password"
                  className="text-primary text-[10px] font-bold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-10 px-4 pr-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-[10px] mt-1 font-medium"
              />
            </div>

            {/* Log In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white h-10 text-sm font-bold rounded-lg shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Log In
              </button>
            </div>

            {/* Google Login Button */}
            <GoogleLogin onSuccess={ handleGoogleLogin} />

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] font-medium uppercase tracking-wider">
                or
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Create Account Button */}
            <button
              type="button"
              className="w-full bg-gray-50 border border-transparent text-gray-700 hover:bg-gray-100 h-10 text-sm font-bold rounded-lg transition-all"
              onClick={() => navigate("/customer/signup")}
            >
              Do not have an account? Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
