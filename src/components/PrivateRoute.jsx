import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // ⚠️ Show warning toast
    toast.warn("⚠️ Please log in to access chat");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

