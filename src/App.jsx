import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero'; // <-- 1. THIS IS YOUR NEW IMPORT LINE

export default function App() {
  const whatsappNumber = "9431133184";
  const defaultMessage = encodeURIComponent
  ("Hello Sarawagi Enterprises, I am checking out your industrial equipment catalog. Please share more details.");
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 scroll-smooth antialiased">
      {/* 1. Global Sticky Header */}
      <Navbar />

      {/* Main Sections Stack */}
      <main>
        {/* 2. WE RENDER YOUR HERO SLIDESHOW RIGHT HERE AT THE TOP */}
        <Hero /> 

        {/* Future sections like <Products />, <About />, <Contact /> will sit down here */}
      </main>
      {/* =========================================================================
          🚀 4. FLOATING WHATSAPP INTERACTIVE BUTTON (Floats on top of all layers)
          ========================================================================= */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group border border-white/20"
        aria-label="Chat on WhatsApp"
      >
        {/* Exact Official WhatsApp Vector Graphic Icon */}
        <svg 
          className="w-6 h-6 text-white fill-current" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.292 1.48 5.41 1.481 5.465 0 9.91-4.444 9.913-9.91.002-2.648-1.03-5.138-2.906-7.017C17.188 1.829 14.7 1.79 12.01 1.79c-5.474 0-9.92 4.444-9.924 9.911-.001 2.152.569 4.258 1.649 6.1l-.995 3.635 3.73-.977zm11.375-7.145c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
        
        {/* Hover Text Tooltip */}
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-slate-800">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}