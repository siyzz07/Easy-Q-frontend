import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Lock, Key, ShieldCheck, CheckCircle2, ShieldAlert } from "lucide-react";
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white p-10">
      <div className="flex items-center gap-4 text-left mb-10">
         <div className="p-3 bg-blue-50 text-blue-600 rounded-[1.2rem]">
            <ShieldCheck size={24} />
         </div>
         <div>
            <h2 className="font-black text-2xl text-slate-900 tracking-tight leading-none">Security Settings</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5">Manage your credentials and privacy</p>
         </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-12 xl:col-span-7">
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
              <Form className="space-y-8">
                {/* Current Password */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 ml-1">
                     <Key size={14} className="text-slate-400" />
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Current Password
                     </label>
                  </div>
                  <div className="relative group">
                    <Field
                      name="currentPassword"
                      type="password"
                      placeholder="Existing password"
                      className={`w-full px-6 py-4 bg-slate-50 border ${touched.currentPassword && errors.currentPassword ? "border-rose-300 ring-rose-50" : "border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5"} rounded-[1.5rem] text-[15px] font-bold text-slate-700 outline-none transition-all placeholder:text-slate-300`}
                    />
                  </div>
                  <ErrorMessage name="currentPassword" component="div" className="text-rose-500 text-[11px] font-black uppercase tracking-wider ml-2" />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                   {/* New Password */}
                   <div className="space-y-3">
                     <div className="flex items-center gap-2 ml-1">
                        <Lock size={14} className="text-slate-400" />
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                           New Password
                        </label>
                     </div>
                     <div className="relative group text-left">
                       <Field
                         name="password"
                         type={showPassword ? "text" : "password"}
                         placeholder="Min. 6 characters"
                         className={`w-full pr-12 pl-6 py-4 bg-slate-50 border ${touched.password && errors.password ? "border-rose-300 ring-rose-50" : "border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5"} rounded-[1.5rem] text-[15px] font-bold text-slate-700 outline-none transition-all placeholder:text-slate-300`}
                       />
                       <button
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-slate-300 hover:text-slate-600 transition-colors"
                       >
                         {showPassword ? <Eye size={18} strokeWidth={2.5} /> : <EyeOff size={18} strokeWidth={2.5} />}
                       </button>
                     </div>
                     <ErrorMessage name="password" component="div" className="text-rose-500 text-[11px] font-black uppercase tracking-wider ml-2" />
                   </div>

                   {/* Confirm Password */}
                   <div className="space-y-3">
                     <div className="flex items-center gap-2 ml-1">
                        <CheckCircle2 size={14} className="text-slate-400" />
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                           Confirm New
                        </label>
                     </div>
                     <div className="relative group">
                       <Field
                         name="confirmPassword"
                         type={showPassword ? "text" : "password"}
                         placeholder="Repeat new password"
                         className={`w-full px-6 py-4 bg-slate-50 border ${touched.confirmPassword && errors.confirmPassword ? "border-rose-300 ring-rose-50" : "border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5"} rounded-[1.5rem] text-[15px] font-bold text-slate-700 outline-none transition-all placeholder:text-slate-300`}
                       />
                     </div>
                     <ErrorMessage name="confirmPassword" component="div" className="text-rose-500 text-[11px] font-black uppercase tracking-wider ml-2" />
                   </div>
                </div>

                {/* Action */}
                <div className="pt-6 text-left">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-12 py-4 bg-slate-900 text-white rounded-[1.5rem] text-sm font-black hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? "Updating Security..." : "Update Password"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:rotate-12 transition-transform duration-700">
                  <ShieldAlert size={100} />
               </div>
               <div className="flex items-start gap-4 relative z-10">
                  <div className="p-3 bg-white text-amber-500 rounded-2xl shadow-sm border border-slate-100">
                     <ShieldAlert size={20} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-[15px] font-black text-slate-900 tracking-tight">Security Tips</h4>
                     <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                        To maintain a high level of security, we recommend changing your password every 90 days. 
                     </p>
                     <ul className="space-y-2 pt-2">
                        {["At least 8 characters", "Include numbers", "Symbols recommended"].map((tip, i) => (
                           <li key={i} className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                              <CheckCircle2 size={12} className="text-emerald-500" />
                              {tip}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>

            <div className="bg-blue-50/50 rounded-[2.5rem] p-8 border border-blue-100 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-[1.2rem] bg-white shadow-sm border border-blue-100 flex items-center justify-center text-blue-600">
                     <Lock size={20} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-blue-600/60 uppercase tracking-widest">Account Shield</p>
                     <p className="text-sm font-black text-slate-800">2FA is active</p>
                  </div>
               </div>
               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordInProfile;
