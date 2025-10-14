import React, { useState } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { IVendor } from "../../Shared/types/Types";
import { verifyEmail } from "../../Services/VendorApiServices";
import { toast } from "react-toastify";


interface IResetPasswordForm{
  onSubmit :(token:string) => void
}



const ResetPasswordForm: FC<IResetPasswordForm> = ({onSubmit}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .test(
        "not-only-spaces",
        "Password cannot be only spaces",
        (value) => value?.trim().length > 0
      )
      .test(
        "not-all-same",
        "Password cannot be the same character repeated",
        (value) => !/^([a-zA-Z0-9])\1+$/.test(value || "")
      )
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  interface IResetPassword{
    password:string;
    confirmPassword:string
}


  const initialValues:IResetPassword  = {

    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: IResetPassword) => {
          onSubmit(values.password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-4 text-white">
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl font-bold">Signup</h1>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto p-5 space-y-4  rounded-3xl shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium  mb-2 mt-2"
                >
                  Password
                </label>
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
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium  mb-2 mt-2"
                >
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>


              <button
                type="submit"
                disabled={isSubmitting}
                className={" w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-medium rounded-lg mt-3 "}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
