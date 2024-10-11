import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EmailProvider } from "./context/EmailContext"; // Import EmailProvider
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <EmailProvider> {/* Wrap App with EmailProvider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </EmailProvider>
);
