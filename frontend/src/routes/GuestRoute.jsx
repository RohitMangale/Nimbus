// src/components/GuestRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = ({ redirectPath = "/dashboard" }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  // If authenticated, redirect to the protected route
  return isAuthenticated ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

export default GuestRoute;
