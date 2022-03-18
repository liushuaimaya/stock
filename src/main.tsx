import React from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/app";
import "./api/tencent";
import "./styles/init.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
