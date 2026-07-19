import React, { useState, useEffect } from "react";
import { principleCompanies } from "../data/productsData";
import { Helmet } from "react-helmet-async";

const getOptimizedUrl = (url) => {
  if (!url) return "https://placehold.co/600x400?text=No+Image";
  // Agar URL Cloudinary ka hai, toh transformation add kar do
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", "/upload/w_400,c_scale,f_auto,q_auto/");
  }
  return url;
};

const Products = () => {
  // 🎛️ State Pools for Products List, Loading states, and Active Filters
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("MYK Laticrete");

  const companiesList = principleCompanies;

  // 1. Cache state
const [cache, setCache] = useState({});

// 2. Optimized Fetcher
const fetchInventoryData = async (company, signal) => {
    // Agar cache mein data hai, toh server request mat bhejo
    if (cache[company]) {
        setProducts(cache[company]);
        setLoading(false);
        return;
    }

    setLoading(true);
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/products/all?companyName=${encodeURIComponent(company)}`,
            { signal } // Request cancel karne ke liye
        );
        const jsonPayload = await response.json();
        
        if (jsonPayload.success) {
            setCache(prev => ({ ...prev, [company]: jsonPayload.data })); // Cache save karo
            setProducts(jsonPayload.data);
        }
    } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
    } finally {
        setLoading(false);
    }
};

// 3. Effect hook with Cleanup
useEffect(() => {
    const controller = new AbortController(); // Browser ka stop button
    fetchInventoryData(activeCategory, controller.signal);
    return () => controller.abort(); // Unmount/Change hone par request kill karo
}, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <Helmet>
        <title>Industrial Chemicals & Polymers | Sarawagi Enterprises</title>
        <meta
          name="description"
          content="Browse our wide range of premium industrial chemicals, masterbatches, and polymers. We are the authorized wholesale suppliers in Jamshedpur."
        />
        <meta
          name="keywords"
          content="Industrial chemicals, polymers, masterbatches, wholesale supplier, Sarawagi Enterprises products, Jamshedpur"
        />
      </Helmet>

      {/* 📁 Left Sidebar Brand Nav Navigation Panel */}
      <div className="w-full md:w-1/4 flex flex-col gap-2">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Our Principals</h3>
        {companiesList.map((company) => (
          <button
            key={company}
            onClick={() => setActiveCategory(company)}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
              activeCategory === company
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {company}
          </button>
        ))}
      </div>

      {/* 🖼️ Right Side Products Display Layout Canvas */}
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          {activeCategory} - Product Range
        </h2>

        {/* 🩺 Diagnostics Loading Handler Frames */}
        {loading && (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-48 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-gray-500 font-medium">
              Querying Database Cluster...
            </p>
          </div>
        )}

        {/* ❌ Error State UI Feedback Banner */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
            ⚠ Connection Lag Error: {error}. Check if backend local port
            listener is active!
          </div>
        )}

        {/* 🧱 Grid Layout Loop Generation */}
        {!loading &&
          !error &&
          (products.length === 0 ? (
            <p className="text-gray-500 italic py-12 text-center">
              No products found in database for this brand branch yet. Use Admin
              Form/Thunder client to inject data!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* 🟢 THE BOX-LESS FLOATING IMAGE CONTAINER */}
                  <div className="h-56 w-full p-4 flex items-center justify-center bg-white">
                    <img
                      src={getOptimizedUrl(item.image)}
                      alt={item.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {/* 📝 THE PRODUCT TEXT (Title & Specs) */}
                  <div className="p-4 border-t border-gray-100 mt-auto bg-gray-50">
                    <h4 className="font-bold text-lg text-gray-800 mb-2 truncate">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
