import React, { useState } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { IVendor } from "../../Shared/types/Types";
import { verifyEmail } from "../../Services/VendorApiServices";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../Utils/cloudinaryUtils";

const SignupForm: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = Yup.object({
    shopName: Yup.string()
      .required("Shop name is required")
      .min(3, "Shop name must be at least 3 characters")
      .matches(/^[A-Za-z0-9 ]+$/, "Shop name can only contain letters, numbers, and spaces"),
    email: Yup.string().trim().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    proof: Yup.mixed().required("Proof (Aadhaar or License) is required"), 
  });

  const initialValues: IVendor = {
    shopName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    proof: null, 
    role:'vendor'
  };

  const handleSubmit = async (values: IVendor, { setSubmitting }: any) => {
    try {
  
        const imageUrl = values.proof
        ? await uploadToCloudinary(values.proof,'vendor-proof')
        :''


      const formData = new FormData();
      formData.append("shopName", values.shopName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append('proofImage',imageUrl)
      formData.append('role','vendor')

      const response = await verifyEmail(formData);

      toast.info("Please verify your email. We have sent a verification link.", {
        autoClose: 5000,
      });
      navigate("/vendor/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || "Some error, please try later");
      navigate("/vendor/login");  
    } finally {
      setSubmitting(false);
    }
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

      <div className="w-full max-w-md mx-auto p-5 space-y-4 rounded-3xl shadow-md">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              {/* --- Existing Inputs --- */}
              <div>
                <label htmlFor="shopName" className="block text-sm font-medium mb-2 mt-2">
                  Shop Name
                </label>
                <Field
                  id="shopName"
                  name="shopName"
                  type="text"
                  placeholder="Enter your shop name"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="shopName" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 mt-2">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 mt-2">
                  Phone
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="Enter your phone number"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="phone" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 mt-2">
                  Password
                </label>
                <div className="relative mt-1">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-12 pr-12 px-3 rounded-lg border-2 bg-white border-gray-300 text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 mt-2">
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm mt-1" />
              </div>

            
              <div className="mt-3">
                <label className="block text-sm font-medium mb-2">
                  Upload Proof (Aadhaar / License)
                </label>
                <input
                  id="proof"
                  name="proof"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    if (e.currentTarget.files && e.currentTarget.files[0]) {
                      setFieldValue("proof", e.currentTarget.files[0]);
                    }
                  }}
                  className="w-full border-2 border-gray-300 bg-white rounded-lg p-2 text-slate-900"
                />
                <ErrorMessage name="proof" component="div" className="text-red-400 text-sm mt-1" />
                {values.proof && (
                  <p className="text-sm text-gray-300 mt-2">
                    Selected file: {values.proof.name}
                  </p>
                )}
              </div>

              <div className="flex justify-end items-center mt-2">
                <span className="text-sm">Already have an account?</span>
                <p
                  onClick={() => navigate("/vendor/login")}
                  className="text-blue-400 ml-1 text-sm hover:underline cursor-pointer"
                >
                  Login
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-medium rounded-lg mt-3"
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

export default SignupForm;
