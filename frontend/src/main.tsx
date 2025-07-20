import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./routes/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import Home from "./views/Home";
import User from "./layouts/User";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<User />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
