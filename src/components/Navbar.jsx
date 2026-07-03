// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router'; 

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="tel:+919431133184" 
              className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-150 group">
              <span className="text-blue-400 font-medium group-hover:underline">📞 Call Us:</span> 
               +91 9431133184
            </a>
            <a href="mailto:sarawagienterprises@gmail.com?subject=Industrial%20Equipment%20Inquiry" 
              className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-150 group">
              <span className="text-blue-400 font-medium group-hover:underline">✉️ Email:</span> 
              sarawagienterprises@gmail.com 
            </a>
          </div>
          <div className="flex space-x-4">
            <span>📍 Location: Jharkhand, India</span>
          </div>
        </div>
      </div>
      
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo Brand Segment Links to Home */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/Hero/logo.png" alt="SE" 
                className="h-12 w-12 object-cover rounded-full border border-slate-100 shadow-xs"/>
              <span className="text-base sm:text-lg font-bold text-blue-600 tracking-tight uppercase">
                Sarawagi Enterprises
              </span>
            </Link>
            
            {/* 🟢 2. Upgraded Routing Links Menu */}
            <div className="hidden md:flex space-x-8 font-semibold text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600 transition-colors duration-150">Home</Link>
              <Link to="/products" className="hover:text-blue-600 transition-colors duration-150">Products</Link>
              <Link to="/about" className="hover:text-blue-600 transition-colors duration-150">About Us</Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors duration-150">Contact</Link>
            </div>
            
            {/* Action Quote Button Links to Contact Form Route */}
            <div className="flex items-center gap-4">
              <Link 
                to="/contact" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/10"
              >
                Request Quote
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}