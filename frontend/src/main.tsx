import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
    <App />
  </BrowserRouter>
);
