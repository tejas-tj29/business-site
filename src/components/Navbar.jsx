import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { principleCompanies } from "../data/productsData";

export default function Navbar() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Yeh animation ke sath upar le jayega
    });
  };

  // 📱 Mobile menu side drawer control state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🖥️ Desktop menu hover active states ('products', 'about', or null)
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 📱 Mobile sub-menu toggle trackers
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  const navRef = useRef(null);

  // Automatically close everything if user leaves browser focus or clicks elsewhere
  useEffect(() => {
    function handleOutsideClick(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setMobileSubmenu(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs" ref={navRef}>
      {/* Top Banner (Hidden on Mobile, Visible on Desktop) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex space-x-6">
            <a
              href="tel:+917209385285"
              className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-150 group"
            >
              <span className="text-blue-400 font-medium group-hover:underline">
                📞 Call Us:
              </span>
              +91 7209385285
            </a>
            <a
              href="mailto:sarawgi@hotmail.com?subject=Industrial%20Equipment%20Inquiry"
              className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-150 group"
            >
              <span className="text-blue-400 font-medium group-hover:underline">
                ✉️ Email:
              </span>
              sarawgi@hotmail.com
            </a>
          </div>
          <div className="flex space-x-4">
            <span>📍 Location: Jharkhand, India</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Body */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Brand Segment Links to Home */}
            <Link
              to="/"
              onClick={closeAllMenus}
              className="flex items-center gap-3 no-underline outline-none"
            >
              <img
                src="/Hero/logo.png"
                alt="SE"
                className="h-12 w-auto block object-contain mix-blend-multiply"
              />
              <span className="text-lg sm:text-xl font-bold text-blue-600 tracking-tight uppercase">
                Sarawagi Enterprises
              </span>
            </Link>

            {/* 🖥️ DESKTOP NAVIGATION MENU (Hover Activated) */}
            <div className="hidden md:flex space-x-6 font-semibold text-sm text-slate-600 items-center">
              {/* Home */}
              <Link
                to="/"
                onClick={() => {
                  closeAllMenus();
                  handleScrollToTop();
                }}
                className="hover:text-blue-600 transition-colors duration-150"
              >
                Home
              </Link>

              {/* About Us Hover Wrapper Container */}
              <div
                className="relative py-4"
                onMouseEnter={() => setActiveDropdown("about")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  aria-expanded={activeDropdown === "about"}
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-150 focus:outline-none cursor-pointer font-semibold"
                >
                  About Us
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "about" ? "rotate-180 text-blue-600" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === "about" && (
                  <div className="absolute left-0 mt-1 w-48 rounded-xl bg-white shadow-xl ring-1 ring-black/5 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {/* Link 1: Profile */}
                    <Link
                      to="/profile"
                      onClick={closeAllMenus}
                      className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg mx-1 transition-colors"
                    >
                      Profile
                    </Link>

                    {/* Link 2: Clients (Profile ke theek neeche aayega) */}
                    <Link
                      to="/clients"
                      onClick={closeAllMenus}
                      className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg mx-1 transition-colors"
                    >
                      Clients
                    </Link>
                  </div>
                )}
              </div>
              {/* Products Hover Wrapper Container */}
              <div
                className="relative py-4"
                onMouseEnter={() => setActiveDropdown("products")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  aria-expanded={activeDropdown === "products"}
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-150 focus:outline-none cursor-pointer font-semibold"
                >
                  Products
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180 text-blue-600" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === "products" && (
                  <div className="absolute left-0 mt-1 w-48 rounded-xl bg-white shadow-xl ring-1 ring-black/5 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {principleCompanies.map((company) => (
                      <Link
                        key={company}
                        to={`/products/${encodeURIComponent(company)}`}
                        onClick={closeAllMenus}
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg mx-1 transition-colors"
                      >
                        {company}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Link */}
              <Link
                to="/contact"
                onClick={closeAllMenus}
                className="hover:text-blue-600 transition-colors duration-150"
              >
                Contact
              </Link>
            </div>

            {/* Action Segment Box */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/contact"
                onClick={closeAllMenus}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/10"
              >
                Request Quote
              </Link>

              {/* 📱 MOBILE HAMBURGER BUTTON */}
              <button
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-lg hover:bg-slate-100/80 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <svg
                    className="h-5 sm:h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 sm:h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 📱 MOBILE DROPDOWN LAYOUT DRAWER (Stays click-triggered) */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-sm transition-all duration-200">
            <div className="px-4 pt-2 pb-4 space-y-1 font-semibold text-sm text-slate-600">
              {/* 📱 NEW: Mobile Contact Drawer Items */}
              <div className="mb-4 pb-4 border-b border-gray-100 space-y-2">
                <a
                  href="tel:+919431133184"
                  className="flex items-center gap-2 text-blue-600"
                >
                  📞 Call: +91 9431133184
                </a>
                <a
                  href="mailto:sarawgi@hotmail.com"
                  className="flex items-center gap-2 text-blue-600"
                >
                  ✉️ Email: sarawgi@hotmail.com
                </a>
              </div>
              <Link
                to="/"
                onClick={closeAllMenus}
                className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <div>
                <button
                  onClick={() =>
                    setMobileSubmenu(mobileSubmenu === "about" ? null : "about")
                  }
                  className="w-full flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors text-left font-semibold"
                >
                  <span>About Us</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileSubmenu === "about" ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {mobileSubmenu === "about" && (
                  <div className="pl-6 bg-slate-50/50 rounded-lg mt-1 space-y-1 py-1">
                    {/* Link 1: Profile */}
                    <Link
                      to="/profile"
                      onClick={closeAllMenus}
                      className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg mx-1 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/clients"
                      onClick={closeAllMenus}
                      className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg mx-1 transition-colors"
                    >
                      Clients
                    </Link>
                  </div>
                )}
              </div>

               <Link
                to="/products"
                onClick={closeAllMenus}
                className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Products
              </Link>

              <Link
                to="/contact"
                onClick={closeAllMenus}
                className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
