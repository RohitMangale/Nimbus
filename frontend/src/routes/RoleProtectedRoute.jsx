// src/components/RoleProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleProtectedRoute = ({ allowedRoles, redirectPath = "/login" }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Not logged in: redirect to login
    return <Navigate to={redirectPath} replace />;
  }
  if (!allowedRoles.includes(user?.role)) {
    // Logged in but role is not allowed: redirect to an unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleProtectedRoute;
