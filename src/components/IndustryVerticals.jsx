// src/components/IndustryVerticals.jsx
import React from 'react';
import { industryImages } from '../data/siteData';

export default function IndustryVerticals() {
  // 🎯 Map your clean card data properties directly onto your array indices from public/
  const industryData = [
    {
      id: 1,
      title: "Steel Industry",
      url: industryImages[0] 
    },
    {
      id: 2,
      title: "Hydro Power",
      url: industryImages[1]
    },
    {
      id: 3,
      title: "Thermal Power",
      url: industryImages[2]
    },
    {
      id: 4,
      title: "Water & Waste Treatment",
      url: industryImages[3]
    },
    {
      id: 5,
      title: "Cement Industry",
      url: industryImages[4]
    },
    {
      id: 6,
      title: "Building & Construction",
      url: industryImages[5]
    },
    {
      id: 7,
      title: "Chemical Industry",
      url: industryImages[6]
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200/40 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Industries We Serve
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 🎯 Symmetrical Card Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch justify-items-center">
          {industryData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full max-w-sm group"
            >
              {/* Media Card Top Box Frame */}
              <div className="w-full h-48 bg-slate-100 relative overflow-hidden">
                <img
                  src={item.url} 
                  alt={`${item.title} Operational Field Asset View`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Lower Informational Title Box (Descriptions Removed) */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <h3 className="text-base font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                {/* Card Footer Interaction Link */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 font-semibold text-xs cursor-pointer">
                  <span>Explore Sector Profile</span>
                  <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}