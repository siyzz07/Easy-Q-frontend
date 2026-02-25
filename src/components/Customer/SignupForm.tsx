import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ICustomer } from "../../Shared/types/Types";
import * as Yup from "yup";
import { customerSignup } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
  name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .matches(
          /^[A-Za-z0-9 ]+$/,
          "Name can only contain letters, numbers, and spaces"
        )
        .test(
          "not-only-spaces",
          "Name cannot be just spaces",
          (value) => value?.trim().length > 0
        )
        .test(
          "not-repeated-chars",
          "Name cannot be the same character repeated",
          (value) => (value ? !/^([A-Za-z0-9 ])\1+$/.test(value) : true)
        ),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .test(
      "valid-phone",
      "Phone number is not valid",
      (value) => value ? /^[6-9][0-9]{9,14}$/.test(value) : false
    ),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .test(
      "not-all-same",
      "Password cannot be the same character repeated",
      (value) => value ? !/^([a-zA-Z0-9@$!%*?&])\1*$/.test(value) : true
    ),

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
    role:"customer"
  };

  const handleSubmit = async(values: ICustomer) => {
    try{
      const { confirmPassword, ...payload } = values;
      await customerSignup(payload); 

      toast.info("Please verify your email. We have sent a verification link to your email address.",{
        autoClose:5000
      });
      navigate("/customer/login");

    }catch(error: unknown){
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
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
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Create Account</h1>
        </div>
        <p className="text-gray-500 text-sm">Join Easy Q and start booking seamlessly.</p>
      </div>

      <div className="w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({isSubmitting}) => (
            <Form className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 h-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-[10px] mt-1 font-medium"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 h-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-[10px] mt-1 font-medium"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                <Field
                  name="phone"
                  type="text"
                  placeholder="9876543210"
                  className="w-full px-4 h-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-[10px] mt-1 font-medium"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  className="w-full px-4 h-10 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-medium hover:bg-white"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-[10px] mt-1 font-medium"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-10 text-sm font-bold rounded-lg shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                        {isSubmitting ? "Creating Account..." : "Sign Up"}
                  </button>
              </div>


               <button
                 type="button"
                 onClick={() => navigate("/customer/login")}
                 className="w-full bg-gray-50 border border-transparent text-gray-700 hover:bg-gray-100 h-10 text-sm font-bold rounded-lg transition-all"
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
