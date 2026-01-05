import { type FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addServiceType } from "../../Services/ApiService/AdminApiService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { X, Layers } from "lucide-react";

const validationSchema = Yup.object({
  serviceName: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Only letters and spaces allowed")
    .trim()
    .required("Service name is required")
    .test("not-empty", "Cannot be empty or spaces", (val) => val?.trim() !== ""),
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .trim()
    .required("Description is required")
    .test("not-empty", "Cannot be empty or spaces", (val) => val?.trim() !== ""),
});

const initialValues = {
  serviceName: "",
  description: "",
};

interface IAddServicesAdmin {
  onClose: () => void;
}

const AddServicesAdmin: FC<IAddServicesAdmin> = ({ onClose }) => {
  const handleSubmit = async (values: any) => {
    try {
      const response = await addServiceType(values);
      if (response?.data?.message) {
        toast.success(response.data.message);
      }
      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log("error to add new Service type");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Layers size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground">Add New Service</h2>
            </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting, isValid }) => (
                <Form className="flex flex-col gap-5">
                {/* Service Name */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                    Service Name
                    </label>
                    <Field
                    type="text"
                    name="serviceName"
                    placeholder="e.g. Plumbing, Electrical"
                    className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground"
                    />
                    <ErrorMessage
                    name="serviceName"
                    component="div"
                    className="text-destructive text-xs font-medium pl-1"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                    Description
                    </label>
                    <Field
                    as="textarea"
                    name="description"
                    placeholder="Describe the service..."
                    className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground resize-none"
                    rows="4"
                    />
                    <ErrorMessage
                    name="description"
                    component="div"
                    className="text-destructive text-xs font-medium pl-1"
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className={`w-full py-3 rounded-xl text-primary-foreground font-bold shadow-lg transition-all active:scale-95 ${
                        isSubmitting || !isValid
                            ? "bg-muted text-muted-foreground cursor-not-allowed shadow-none"
                            : "bg-primary hover:bg-primary/90 shadow-primary/25"
                        }`}
                    >
                        {isSubmitting ? "Creating..." : "Create Service"}
                    </button>
                </div>
                </Form>
            )}
            </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddServicesAdmin;
