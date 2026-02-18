import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import Store from "./Redux/Store.ts";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster
      position="top-right"
      gutter={12}
      toastOptions={{
        style: {
          borderRadius: "10px",
          background: "#fff",
          padding: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
        duration: 4000,
      }}
    />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      //  transition={Slide}
      theme="light"
    />
    <Provider store={Store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </>
);
