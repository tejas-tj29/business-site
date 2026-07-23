// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Yeh animation ke sath upar le jayega
    });
  };

  return (
    <section className="w-full font-sans select-none">
      {/* 🏢 MAIN FOOTER SECTION */}
      <div className="bg-[#1a202c] text-[#f7fafc] py-12 md:py-16 border-b border-b-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-start">
            {/* COLUMN 1: Company Profile & Core Details */}
            <div className="space-y-4">
              <Link to="/" onClick={handleScrollToTop} className="inline-block">
                <img
                  src="/Hero/logo.png"
                  alt="Sarawagi Enterprises Logo"
                  className="h-15 w-auto object-contain brightness-0 invert opacity-90"
                />
              </Link>

              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="mt-1 shrink-0">📍</span>
                  <span>
                    SARAWAGI ENTERPRISES
                    <br />
                    B-14,Begonia Apartment,
                    <br />
                    Ashiana Gardens, Sonari Town, Jamshedpur, East Singhbhum,
                    <br />
                    Jharkhand, India - 831011
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>✉️</span>
                  <a
                    href="mailto:sarawgi@hotmail.com"
                    className="text-[#f7fafc] hover:underline"
                  >
                    sarawgi@hotmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <a
                    href="tel:+919431133184"
                    className="text-[#f7fafc] hover:underline"
                  >
                    +91 7209385285
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://maps.app.goo.gl/JbzoWRbTjnsb5C2D6"
                    className="text-[#f7fafc] hover:underline font-semibold text-xs uppercase tracking-wide"
                  >
                    Map Direction
                  </a>
                </p>
              </div>
            </div>

            {/* COLUMN 2: Quick Links (Site Map Navigation Matrix) */}
            <div className="space-y-3">
              <h4 className="text-white text-sm font-bold tracking-wider uppercase">
                QUICK LINKS
              </h4>
              <hr className="border-slate-700 w-full" />
              <ul className="space-y-2.5 text-sm font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">●</span>
                  <Link
                    to="/"
                    onClick={handleScrollToTop}
                    className="text-slate-300 hover:text-white hover:underline transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">●</span>
                  <Link
                    to="/profile"
                    onClick={handleScrollToTop}
                    className="text-slate-300 hover:text-white hover:underline transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">●</span>
                  <Link
                    to="/products"
                    onClick={handleScrollToTop}
                    className="text-slate-300 hover:text-white hover:underline transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">●</span>
                  <Link
                    to="/contact"
                    onClick={handleScrollToTop}
                    className="text-slate-300 hover:text-white hover:underline transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: Broad Product Categories */}
            <div className="space-y-3">
              <h4 className="text-white text-sm font-bold tracking-wider uppercase">
                PRODUCT FAMILIES
              </h4>
              <hr className="border-slate-700 w-full" />
              <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
                <li>
                  <Link
                    to="/products"
                    className="hover:text-white hover:underline transition-colors block"
                  >
                    Industrial Control Valves
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-white hover:underline transition-colors block"
                  >
                    Industrial Water Treatment Accessories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-white hover:underline transition-colors block"
                  >
                    Waterproofing Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-white hover:underline transition-colors block"
                  >
                    Flow Automation & Actuators
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-white hover:underline transition-colors block"
                  >
                    Tile & Stone Adhesives
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 4: Authorized Distribution Brands (Idea A Core Addition) */}
            <div className="space-y-3">
              <h4 className="text-white text-sm font-bold tracking-wider uppercase">
                OUR PRINCIPLES
              </h4>
              <hr className="border-slate-700 w-full" />
              <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Fouress Engineering(I) Pvt.Ltd.
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Amiad Filteration(I) Pvt.Ltd.
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Auma India Pvt.Ltd.
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Fosroc Chemicals India Pvt.Ltd.
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  J.D Jones & Co. Pvt.Ltd.
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  MYK Laticrete India Pvt.Ltd.
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Ebro Armaturen
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 🔒 COPYRIGHT LOWER BAR */}
      <div className="bg-[#111827] text-slate-400 py-5 text-sm font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center sm:text-left text-slate-400">
            © {currentYear} SARAWAGI ENTERPRISES. All industrial rights
            reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
