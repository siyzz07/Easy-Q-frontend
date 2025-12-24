import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ICustomer } from "../../Shared/types/Types";
import * as Yup from "yup";
import { customerSignup } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";


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
    role:'customer'
  };

  const handleSubmit = async(values: ICustomer) => {
    try{




      const { confirmPassword, ...payload } = values;
      await customerSignup(payload); 


      toast.info("Please verify your email. We have sent a verification link to your email address.",{
        autoClose:5000
      });
      


      navigate("/customer/login");





    }catch(error:any){
      console.log(error);
      
        if(error.response.data){
          toast.error(error.response.data.message);
        }else{
          toast.error("some error please try later");
        }
        navigate("/customer/login")
        
    }
  };

  return (
    <div className="w-full">
      {/* Logo and Heading */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
           <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create Account</h1>
        </div>
        <p className="text-gray-500 font-medium">Join Easy Q and start booking seamlessly.</p>
      </div>

      <div className="w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({isSubmitting}) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 h-11 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 h-11 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <Field
                  name="phone"
                  type="text"
                  placeholder="9876543210"
                  className="w-full px-4 h-11 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Field
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
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  className="w-full px-4 h-11 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-sm font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                        {isSubmitting ? "Creating Account..." : "Sign Up"}
                  </button>
              </div>

              {/* Already have an account */}
               <div className="relative flex py-2 items-center mt-4">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium">Already have an account?</span>
                  <div className="flex-grow border-t border-gray-200"></div>
              </div>

               <button
                 type="button"
                 onClick={() => navigate("/customer/login")}
                 className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 h-12 text-sm font-bold rounded-xl transition-all"
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
