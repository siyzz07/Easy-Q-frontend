import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Lock, Key, ShieldCheck, CheckCircle2 } from "lucide-react";
import { AxiosError } from "axios";
import { changePassword } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your new password"),
});

const ChangePasswordInProfile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      let { confirmPassword, ...payload } = { ...values };
      let result = await changePassword(payload);

      if (result?.data.message) {
        toast.success(result.data.message);
        resetForm(); 
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[440px]">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <ShieldCheck size={20} />
           </div>
           <div>
              <h2 className="font-bold text-xl text-gray-900 tracking-tight">Security Settings</h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Keep your account safe by updating your password regularly.</p>
           </div>
        </div>
      </div>

      <div className="p-8 pt-6">
        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="max-w-md space-y-6">
              {/* Current Password */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Current Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <Key size={18} />
                  </div>
                  <Field
                    name="currentPassword"
                    type="password"
                    placeholder="Existing password"
                    className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border ${touched.currentPassword && errors.currentPassword ? "border-red-300 ring-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"} rounded-2xl text-[15px] font-medium text-gray-700 outline-none transition-all placeholder:text-gray-300`}
                  />
                </div>
                <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-[11px] font-bold ml-1" />
              </div>

              {/* New Password */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  New Password
                </label>
                <div className="relative group text-left">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    className={`w-full pl-11 pr-12 py-3.5 bg-gray-50 border ${touched.password && errors.password ? "border-red-300 ring-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"} rounded-2xl text-[15px] font-medium text-gray-700 outline-none transition-all placeholder:text-gray-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <Eye size={18} strokeWidth={2} /> : <EyeOff size={18} strokeWidth={2} />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-[11px] font-bold ml-1" />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <CheckCircle2 size={18} />
                  </div>
                  <Field
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat new password"
                    className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border ${touched.confirmPassword && errors.confirmPassword ? "border-red-300 ring-red-50" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"} rounded-2xl text-[15px] font-medium text-gray-700 outline-none transition-all placeholder:text-gray-300`}
                  />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-[11px] font-bold ml-1" />
              </div>

              {/* Action */}
              <div className="pt-4 text-left">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-2xl px-10 py-4 text-sm font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 text-white transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? "Updating Password..." : "Update Password"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="p-8 pt-0 mt-4">
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-start gap-3">
             <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                <ShieldCheck size={16} />
             </div>
             <div className="space-y-1">
                <h4 className="text-[13px] font-bold text-amber-900">Security Recommendation</h4>
                <p className="text-[12px] text-amber-700/80 font-medium leading-relaxed">
                   Use at least 8 characters with a mix of letters, numbers, and symbols to create a stronger password.
                </p>
             </div>
          </div>
      </div>
    </div>
  );
};

export default ChangePasswordInProfile;
