import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer, Bounce } from "react-toastify";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import Store from "./Redux/Store.ts";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
    <Provider store={Store}>
      <App />
    </Provider>

    <ToastContainer
      position="top-center"
      autoClose={2500}
      closeOnClick
      pauseOnHover={false}
      draggable={false}
      theme="light"
      transition={Bounce}
      limit={3}
    />
  </StrictMode>
);
