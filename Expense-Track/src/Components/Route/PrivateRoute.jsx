import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Use named import

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token); // Decode the token
      console.log(decoded); // (Optional) For debugging
      return <Outlet context={{ userId: decoded.userId }} />;
    } catch (error) {
      console.error("Invalid token:", error);
      return <Navigate to="/signin" />;
    }
  }

  return <Navigate to="/signin" />;
};

export default PrivateRoute;
