import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Eye, EyeOff, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ICustomer } from "../../Shared/types/Auth";
import * as Yup from "yup";
import { customerSignup } from "../../Services/CustomerApiService";
import { toast } from "react-toastify";

// Yup Validation Schema

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "Name must be at least 4 characters long")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits")
      .required("Phone number is required"),

    password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues: ICustomer = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async(values: ICustomer) => {
    try{




      const { confirmPassword, ...payload } = values;
      const response = await customerSignup(payload) 


      toast.info("Please verify your email. We have sent a verification link to your email address.",{
        autoClose:5000
      })
      


      navigate('/customer/login')





    }catch(error:any){
      console.log(error);
      
        if(error.response.data){
          toast.error(error.response.data)
        }else{
          toast.error('some error please try later')
        }
        
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-black">
      {/* Logo and Heading */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl font-bold">Signup</h1>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto space-y-4 bg-white p-6 rounded-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone
                </label>
                <Field
                  name="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <Field
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
                  placeholder="Confirm your password"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Already have an account */}
              <div className="flex justify-end mt-2 space-x-2 text-sm">
                <p className="text-gray-500 cursor-pointer">
                  Already have an account?
                </p>
                <p
                  className="text-blue-400 hover:underline"
                  onClick={() => navigate("/customer/login")}
                >
                  Login
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-medium rounded-lg cursor-pointer"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
