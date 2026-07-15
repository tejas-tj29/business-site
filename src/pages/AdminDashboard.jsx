import React from "react";
import { Link,useNavigate, Outlet, useLocation } from "react-router";

import handleLogout from "../components/AdminLogout.jsx";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to highlight the active menu item
  const isActive = (path) => {
    return location.pathname.includes(path) 
      ? "bg-blue-600 text-white shadow-md" 
      : "text-gray-300 hover:bg-gray-700 hover:text-white transition-colors";
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* ⬛ Left Sidebar (Fixed) */}
      <div className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold tracking-wider">Admin Panel</h2>
          <p className="text-sm text-gray-400 mt-1">Sarawagi Enterprises</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/admin/overview" className={`block px-4 py-3 rounded-lg font-medium ${isActive('/overview')}`}>
            📊 Overview
          </Link>
          <Link to="/admin/add-product" className={`block px-4 py-3 rounded-lg font-medium ${isActive('/add-product')}`}>
            ➕ Add Product
          </Link>
          <Link to="/admin/manage-products" className={`block px-4 py-3 rounded-lg font-medium ${isActive('/manage-products')}`}>
            📦 Manage Products
          </Link>
          <Link to="/admin/inquiries" className={`block px-4 py-3 rounded-lg font-medium ${isActive('/inquiries')}`}>
            📬 Client Inquiries
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
          onClick = {() => handleLogout(navigate)}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* ⬜ Right Main Content Area (Dynamic) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm h-16 flex items-center px-8 justify-between">
          <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-medium text-gray-600">Admin</span>
          </div>
        </header>

        {/* 🚀 THE OUTLET: Yeh wo jagah hai jahan child pages (jaise form) render honge! */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          <Outlet /> 
        </main>
      </div>

    </div>
  );
};

export default AdminDashboard;