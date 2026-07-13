// src/pages/Products.jsx
import React, { useState,useEffect } from "react";
import { principleCompanies, productsData } from "../data/productsData.js";

export default function Products() {

   useEffect(() => {
    document.title = "Products | Sarawagi Enterprises";
  }, []);

  const [activeCompany, setActiveCompany] = useState("MYK Laticrete");

  const currentCompanyData = productsData[activeCompany] || {};
  const currentProductsList = currentCompanyData.products || [];

  return (
    <section className="py-12 md:py-16 bg-slate-50 min-h-screen select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Main Title Header */}
        <div className="mb-10 pb-5 border-b border-slate-200">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Principal Companies & Products
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Browse through corporate inventories managed by our authorized brand partnerships.
          </p>
        </div>

        {/* B2B Split Layout Panel Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* 🗂️ LEFT COLUMN SIDEBAR: Principal Selector Navigation List */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs lg:sticky lg:top-24 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2.5 mb-2 block">
              Partner Categories
            </span>
            {principleCompanies.map((company) => {
              const isActive = activeCompany === company;
              return (
                <button
                  key={company}
                  onClick={() => setActiveCompany(company)}
                  className={`w-full text-left px-3.5 py-3 rounded-lg font-bold text-xs uppercase tracking-wide transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {company}
                </button>
              );
            })}
          </div>

          {/* 📄 RIGHT PANEL: Active Brand Inventory Context */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Active Company Status Box */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-xs">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                Active Brand Profile
              </span>
              <h2 className="text-lg font-bold text-slate-800 tracking-tight mt-2">
                {activeCompany}
              </h2>
            </div>

            {/* 🎯 THE DYNAMIC CONDITIONAL PRODUCTS GRID */}
            {currentProductsList.length > 0 ? (
              // 🟢 Applied bg-white and border radius to the whole grid container, making single individual frames vanish completely!
              <div className="bg-white rounded-2xl border border-slate-200/60 p-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 items-center justify-items-center shadow-xs">
                {currentProductsList.map((product, index) => (
                  <div
                    key={product.id ? `${product.id}-${index}` : index}
                    className="w-full flex items-center justify-center transition-transform duration-200 hover:scale-105"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={`${activeCompany} item`}
                        // 🟢 Native bounding system allows maximum scaling with full layout transparency
                        className="w-full h-auto max-h-52 object-contain block"
                        loading="eager"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      /* Fallback text frame displayed only when string path is empty "" */
                      <div className="text-[10px] text-slate-400 font-medium tracking-wide bg-slate-50 px-4 py-8 rounded-xl border border-dashed border-slate-200 text-center w-full">
                        Image Rendering Pending
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* 📁 Fallback template layout for empty object lists (Fouress, Amiad, etc.) */
              <div className="bg-white rounded-xl border border-slate-200/60 p-12 text-center text-slate-400 font-medium text-xs">
                💼 Catalog cataloging underway for {activeCompany}. Complete product inventory files updates coming soon.
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}