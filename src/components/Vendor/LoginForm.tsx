import React, { useState } from "react";
import type { FC } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { IVendorLogin } from "../../Shared/types/Types";
import { loginVendor } from "../../Services/ApiService/VendorApiServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { hasShopData, shopData, vendorLoginSuccess } from "../../Redux/VendorSlice";
import { setAccessToken } from "../../utils/tokenUtils";
import { connectSocket } from "../../Services/Socket/Socket";
import { connectSocketAction } from "../../Redux/SocketSlice";

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
    role:'vendor'
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {

    
      let response = await loginVendor(values);
      if (response.data.accesstoken) {


        setAccessToken(response.data.accesstoken);
        dispatch(connectSocketAction(response.data.accesstoken))// socket io
        dispatch(vendorLoginSuccess(response.data.accesstoken));
        if(response.data.data){

          dispatch(shopData(response.data.data));
          dispatch(hasShopData(response.data.data.hasShop)); 
          
          if(response.data.data.hasShop==true){
   
            navigate("/vendor");
          }else{
            navigate("/vendor/shop-data");
          }

        }

      } else {
        toast.error("Internal error please try again later");
      }
    } catch (error: any) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mr-2 shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Easy Q Vendor</h1>
        </div>
        <p className="text-gray-500 text-sm font-medium">
          Manage your business efficiently.
        </p>
      </div>

      <div className="mb-6 relative w-full">
        <div className="flex bg-gray-100/50 rounded-xl p-1 relative border border-gray-200">
          <button
            onClick={() => navigate("/customer/login")}
             className="flex-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            Customer
          </button>
          <button className="flex-1 py-2 text-sm font-semibold rounded-lg shadow-sm bg-white text-gray-900 transition-all">
            Vendor
          </button>
        </div>
      </div>

      <div className="w-full">
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
                  placeholder="Business Email"
                  className="w-full px-4 h-12 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1 ml-1 font-medium"
                />
              </div>

              <div>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-12 px-4 pr-12 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                  className="text-red-500 text-xs mt-1 ml-1 font-medium"
                />
               <Link
                to="/vendor/forgot-password"
                className="text-primary text-xs font-semibold hover:underline block text-right mt-2"
              >
                Forgot Password?
              </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-sm font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-2"
              >
                Log In
              </button>

               <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-4 text-xs text-gray-400 font-medium">OR</span>
                  <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                type="button"
                className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 h-12 text-sm font-bold rounded-xl transition-all"
                onClick={()=> navigate("/vendor/signup")}
              >
                Register as Vendor
              </button>

              <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed">
                By logging in, you agree to our{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Terms
                </a>{" "}
                &{" "}
                <a href="#" className="text-primary hover:underline font-medium">
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
