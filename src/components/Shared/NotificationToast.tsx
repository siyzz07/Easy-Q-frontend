import toast from "react-hot-toast";
import { Bell, CheckCircle, XCircle, Info, X } from "lucide-react";

type NotificationType = "info" | "success" | "error";

const iconMap = {
  info: <Info className="text-blue-600 w-5 h-5" />,
  success: <CheckCircle className="text-green-600 w-5 h-5" />,
  error: <XCircle className="text-red-600 w-5 h-5" />,
};

const bgMap = {
  info: "bg-blue-50",
  success: "bg-green-50",
  error: "bg-red-50",
};

export const NotificationToast = (
  title: string,
  message: string,
  type: NotificationType = "info"
) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-custom-enter" : "animate-custom-leave"
      } max-w-sm w-full ${bgMap[type]} shadow-md rounded-lg pointer-events-auto flex border border-gray-200`}
    >
      {/* Main content */}
      <div className="flex-1 w-0 p-4 flex gap-3">
        {/* Icon */}
        <div className="mt-1">{iconMap[type]}</div>

        {/* Text Content */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-700">{message}</p>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => toast.dismiss(t.id)}
        className="p-3 hover:bg-gray-200 rounded-r-lg transition"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  ));
};
