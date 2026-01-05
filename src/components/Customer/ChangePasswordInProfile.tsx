import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Lock, ShieldCheck, Loader2, KeyRound, AlertCircle } from "lucide-react";
import { changePassword } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const ChangePasswordInProfile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      const response = await changePassword(values);
      if (response?.data?.message) {
        toast.success(response.data.message);
        resetForm();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to update password");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-0 divide-y divide-border transition-all">
      {/* Header Section */}
      <div className="p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-card shrink-0">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-foreground tracking-tight">Account Security</h2>
          <p className="text-muted-foreground text-sm font-medium">Update your password to keep your account secure and protected.</p>
        </div>
        <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <KeyRound size={24} />
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8 sm:p-10 bg-muted/20 min-h-[400px]">
        <div className="max-w-2xl bg-card rounded-2xl border border-border shadow-sm overflow-hidden mx-auto">
          <Formik
            initialValues={{
              currentPassword: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="divide-y divide-border">
                <div className="p-8 space-y-6">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Current Password</label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:bg-card focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-foreground"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    </div>
                    <ErrorMessage name="currentPassword" component="div" className="text-destructive text-[10px] font-bold uppercase tracking-tight pl-2" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* New Password */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">New Password</label>
                      <div className="relative">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="••••••••"
                          className="w-full pl-11 pr-12 py-3 bg-muted/50 border border-border rounded-xl focus:bg-card focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-foreground"
                        />
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <ErrorMessage name="password" component="div" className="text-destructive text-[10px] font-bold uppercase tracking-tight pl-2" />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Confirm Identity</label>
                      <div className="relative">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:bg-card focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-foreground"
                        />
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      </div>
                      <ErrorMessage name="confirmPassword" component="div" className="text-destructive text-[10px] font-bold uppercase tracking-tight pl-2" />
                    </div>
                  </div>
                </div>

                {/* Footer and Submit */}
                <div className="p-8 bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <AlertCircle size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Security Requirement</h4>
                      <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">Must be 8+ chars with mixed case and numbers.</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-black rounded-xl hover:bg-primary/90 shadow-xl shadow-primary/10 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 disabled:bg-muted"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Updating...
                      </>
                    ) : (
                      <>
                        <KeyRound size={18} />
                        Update Password
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Verification Badge */}
      <div className="p-8 sm:p-10 bg-card flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <ShieldCheck size={16} />
        </div>
        <p className="text-xs font-bold text-muted-foreground">Enhanced security measures are active for your credential management.</p>
      </div>
    </div>
  );
};

export default ChangePasswordInProfile;
