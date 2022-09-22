import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("dataToken");
  return isAuthenticated !== null ? <Outlet /> : <Navigate to="/404" />;
}

export default ProtectedRoute;
