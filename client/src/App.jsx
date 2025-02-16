import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import EmailVerify from "./pages/EmailVerify";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
