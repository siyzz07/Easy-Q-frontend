import  { useState } from "react";
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
    role:"vendor"
  };

  const handleSubmit = async (values: IVendor, { setSubmitting }: any) => {
    try {
  
        const imageUrl = values.proof
        ? await uploadToCloudinary(values.proof,"vendor-proof")
        :"";


      const formData = new FormData();
      formData.append("shopName", values.shopName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("proofImage",imageUrl.secure_url);
      formData.append("role","vendor");

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
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
            <span className="text-white font-bold text-base">Q</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">vendor Signup</h1>
        </div>
        <p className="text-gray-500 text-sm">Join as a vendor and grow your business today.</p>
      </div>

      <div className="w-full">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-3">
              {/* --- Existing Inputs --- */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Shop Name</label>
                    <Field
                    id="shopName"
                    name="shopName"
                    type="text"
                    placeholder="Shop Name"
                    className="w-full px-4 h-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
                    />
                    <ErrorMessage name="shopName" component="div" className="text-red-500 text-[10px] mt-1 font-medium" />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile</label>
                    <Field
                    id="phone"
                    name="phone"
                    type="number"
                    placeholder="Mobile"
                    className="w-full px-4 h-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-[10px] mt-1 font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@business.com"
                  className="w-full px-4 h-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-[10px] mt-1 font-medium" />
              </div>


              <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full h-10 px-4 pr-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-[10px] mt-1 font-medium" />
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm</label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm"
                      className="w-full px-4 h-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-[10px] mt-1 font-medium" />
                  </div>
              </div>

            
              <div className="pt-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
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
                    className="hidden" 
                    />
                    <label 
                        htmlFor="proof" 
                        className="flex items-center justify-center w-full h-10 px-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-500 cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-all hover:text-blue-600"
                    >
                        {values.proof ? (
                            <div className="flex items-center text-blue-600 font-medium text-xs">
                                <span className="truncate max-w-[200px]">{values.proof.name}</span>
                            </div>
                        ) : (
                            <>
                             <Upload size={16} className="mr-2" />
                             <span className="text-xs font-medium">Click to upload document</span>
                            </>
                        )}
                    </label>
                </div>
                <ErrorMessage name="proof" component="div" className="text-red-500 text-[10px] mt-1 font-medium" />
              </div>

      

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-sm font-bold rounded-lg shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 mt-4"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
                
               <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] font-medium uppercase tracking-wider">or</span>
                  <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                type="button"
                className="w-full bg-gray-50 border border-transparent text-gray-700 hover:bg-gray-100 h-10 text-sm font-bold rounded-lg transition-all"
                onClick={()=> navigate("/vendor/login")}
              >
                Already have an account? Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
