import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer, Bounce } from "react-toastify";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import Store from "./Redux/Store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>

 <ToastContainer
  position="bottom-center"
  autoClose={2500}
  closeOnClick
  pauseOnHover={false}
  draggable={false}
  theme="colored"
  transition={Bounce}
  limit={3}
/>
  </StrictMode>
);
