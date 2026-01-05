import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer,Slide, Bounce } from "react-toastify";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import Store from "./Redux/Store.ts";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentStripe } from "./config/StripeConfig.ts";



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
      <Elements stripe={PaymentStripe}>

      <App />
      </Elements>
    </Provider>

    {/* <ToastContainer
      position="top-center"
      autoClose={2500}
      closeOnClick
      pauseOnHover={false}
      draggable={false}
      theme="light"
      transition={Bounce}
      limit={3}
    /> */}

    <ToastContainer
  position="bottom-right"
  autoClose={2000}
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

{/* <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover={false}
  draggable={false}
  theme="light"
  transition={Slide}
  limit={3}
/> */}
  </StrictMode>
);
