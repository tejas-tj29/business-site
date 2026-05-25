import React, { useState, useEffect } from 'react';
import { heroImages } from '../data/siteData'; // Imported only heroImages

export default function Hero() {
  // 1. Keep track of which image number should be visible
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Set up the automatic loop system when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        // If we reach the end of the array, loop back to 0, otherwise add 1
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5000ms = 5 seconds per slide

    // Clean up the timer if the component ever unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-slate-950 min-h-screen flex items-center overflow-hidden">
      
      {/* =========================================================================
          BACKGROUND SLIDESHOW LAYER
          ========================================================================= */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            // transition-all duration-[5000ms] keeps the zoom effect slow and smooth
            className={`absolute inset-0 transition-all duration-[5000ms] ease-in-out ${
              index === currentIndex 
                ? 'opacity-60 scale-105 pointer-events-auto' // Active image: Visible and drifting slightly forward
                : 'opacity-0 scale-100 pointer-events-none'   // Inactive image: Invisible and sitting at normal scale
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        
        {/* Dark Vignette Overlay: Prevents bright images from making your text hard to read */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
      </div>

      {/* =========================================================================
          STATIC TEXT LAYER (Text is now written directly)
          ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Authorised Distributor & Dealers
          </span>
          
          <h1 className="mt-4 text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Quality, Reliability & Trust in Industrial Trading
          </h1>
          
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Welcome to <span className="text-white font-semibold">Sarawagi Enterprises</span>. We supply industrial goods and dependable business infrastructure solutions.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#products"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-600/20 transition-all duration-200"
            >
              Explore Products
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}