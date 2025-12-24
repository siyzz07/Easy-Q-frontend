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
    <div className="w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
           <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Partner Signup</h1>
        </div>
        <p className="text-gray-500 font-medium">Join as a vendor and grow your business today.</p>
      </div>

      <div className="w-full">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-4">
              {/* --- Existing Inputs --- */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                    <Field
                    id="shopName"
                    name="shopName"
                    type="text"
                    placeholder="Shop Name"
                    className="w-full px-4 h-11 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                    />
                    <ErrorMessage name="shopName" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                    <Field
                    id="phone"
                    name="phone"
                    type="number"
                    placeholder="Phone Number"
                    className="w-full px-4 h-11 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@business.com"
                  className="w-full px-4 h-11 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full h-11 px-4 pr-12 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  className="w-full px-4 h-11 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

            
              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-600 mb-2 ml-1/3">
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
                        className="flex items-center justify-center w-full h-12 px-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all hover:text-primary"
                    >
                        {values.proof ? (
                            <div className="flex items-center text-primary font-medium">
                                <span className="truncate max-w-[200px]">{values.proof.name}</span>
                            </div>
                        ) : (
                            <>
                             <Upload size={18} className="mr-2" />
                             <span className="text-sm font-medium">Click to upload document</span>
                            </>
                        )}
                    </label>
                </div>
                <ErrorMessage name="proof" component="div" className="text-red-500 text-xs mt-1 font-medium" />
              </div>

      

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-sm font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 mt-6"
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </button>
                
               <div className="relative flex py-2 items-center mt-4">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium">Already have an account?</span>
                  <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                type="button"
                className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 h-12 text-sm font-bold rounded-xl transition-all"
                onClick={()=> navigate("/vendor/login")}
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
