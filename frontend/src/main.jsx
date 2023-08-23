import React from "react";
import ReactDOM from "react-dom/client";
import { WorkoutsContextProver } from "./context/WorkoutsContext";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProver>
        <App />
      </WorkoutsContextProver>
    </AuthContextProvider>
  </React.StrictMode>
);
