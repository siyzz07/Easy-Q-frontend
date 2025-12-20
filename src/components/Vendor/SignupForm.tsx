import React, { useState } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { IVendor } from "../../Shared/types/Types";
import { verifyEmail } from "../../Services/ApiService/VendorApiServices";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils";

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
      formData.append('proofImage',imageUrl.secure_url)
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
    <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40">
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mr-2 shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Partner Signup</h1>
        </div>
        <p className="text-gray-500 text-sm font-medium">
            Join as a vendor and grow your business.
        </p>
      </div>

      <div className="w-full">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-3">
              {/* --- Existing Inputs --- */}
              <div>
                <Field
                  id="shopName"
                  name="shopName"
                  type="text"
                  placeholder="Shop Name"
                  className="w-full px-4 h-12 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                />
                <ErrorMessage name="shopName" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

              <div>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Business Email"
                  className="w-full px-4 h-12 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

              <div>
                <Field
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="Phone Number"
                  className="w-full px-4 h-12 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1 font-medium" />
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
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

              <div>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full px-4 h-12 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

            
              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-600 mb-2 ml-1">
                  Upload Proof (Aadhaar / License)
                </label>
                <div className="relative">
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
                    className="hidden" // Hide the default file input
                    />
                    <label 
                        htmlFor="proof" 
                        className="flex items-center justify-center w-full h-12 px-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                    >
                        {values.proof ? (
                            <span className="text-gray-900 font-medium truncate">{values.proof.name}</span>
                        ) : (
                            <>
                             <Upload size={18} className="mr-2" />
                             <span>Click to upload document</span>
                            </>
                        )}
                    </label>
                </div>
                
                <ErrorMessage name="proof" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

      

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-sm font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 mt-4"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
                
              <div className="flex justify-center items-center mt-4">
                 <span className="text-gray-500 text-xs">Already have an account?</span>
                 <button
                   type="button"
                   onClick={() => navigate("/vendor/login")}
                   className="text-primary ml-1 text-xs font-bold hover:underline"
                 >
                   Log In
                 </button>
               </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
