import React from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  // Check if admin is logged in
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn") === "true";

  // Agar authenticated hai, toh uske andar ke components (Outlet) dikhao
  // Warna, dhakka maar ke wapas login page par bhej do (Navigate)
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;