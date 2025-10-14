import React, { useState } from "react";
import type { FC } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { IVendorLogin } from "../../Shared/types/Types";
import { loginVendor } from "../../Services/VendorApiServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { hasShopData, shopData, vendorLoginSuccess } from "../../Redux/VendorSlice";
import { setAccessToken } from "../../Utils/tokenUtils";

const SignupForm: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
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

  const initialValues: IVendorLogin = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      let response = await loginVendor(values);
      if (response.data.accesstoken) {


        setAccessToken(response.data.accesstoken)
        dispatch(vendorLoginSuccess(response.data.accesstoken));
        if(response.data.data){

          dispatch(shopData(response.data.data))
          dispatch(hasShopData(response.data.data.hasShop)) 
          
          if(response.data.data.hasShop==true){
   
            navigate('/vendor')
          }else{
            navigate('/vendor/shop-data')
          }

        }

      } else {
        toast.error("Internal error please try again later");
      }
    } catch (error: any) {
      if (error.response.data) {
        toast.error(error.response.data);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl font-bold">Easy Q</h1>
        </div>
        <p className="text-gray-300 text-sm">
          Manage your bookings effortlessly and
          <br />
          serve customers faster!
        </p>
      </div>

      <div className="mb-6 relative">
        <div className="flex bg-slate-700 rounded-lg p-1 relative">
          <button
            onClick={() => navigate("/customer/login")}
            className="px-8 py-2 text-sm font-medium rounded-md transition-colors relative z-10 cursor-pointer"
          >
            Customer
          </button>
          <button className="px-8 py-2 text-sm font-medium rounded-md transition-colors relative z-10 text-slate-800 bg-white">
            Vendor
          </button>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto p-6 space-y-4 bg-slate-800 rounded-3xl shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
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
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <div>
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
                  className="text-red-400 text-sm mt-1"
                />
               <Link
                to="/vendor/forgot-password"
                className="text-blue-400 text-sm hover:underline "
              >
                Forgot Password?
              </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-medium rounded-lg cursor-pointer"
              >
                Log In
              </button>

              <button
                type="button"
                className="w-full border border-gray-500 text-white hover:bg-slate-700 h-12 text-base font-medium bg-transparent rounded-lg cursor-pointer" 
                onClick={()=> navigate('/vendor/signup')}
              >
                Create an Account
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                By logging in, you agree to our{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Terms
                </a>{" "}
                &{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
