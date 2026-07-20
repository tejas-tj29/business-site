import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { principleCompanies } from "../data/productsData";
import { Helmet } from "react-helmet-async";

const getOptimizedUrl = (url) => {
  if (!url) return "https://placehold.co/600x400?text=No+Image";
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", "/upload/w_400,c_scale,f_auto,q_auto/");
  }
  return url;
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const brandFromUrl = searchParams.get("brand");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("MYK Laticrete");
  const [cache, setCache] = useState({});

  const companiesList = principleCompanies;

  const groupedProducts = products.reduce((acc, product) => {
    const cat = product?.category || "General Products";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  // 1. Sync URL brand with active category state
  useEffect(() => {
    if (brandFromUrl) {
      setActiveCategory(brandFromUrl);
    }
  }, [brandFromUrl]);

  const fetchInventoryData = async (company, signal) => {
    if (cache[company]) {
      setProducts(cache[company]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/all?companyName=${encodeURIComponent(company)}`,
        { signal },
      );
      const jsonPayload = await response.json();

      if (jsonPayload.success) {
        setCache((prev) => ({ ...prev, [company]: jsonPayload.data }));
        setProducts(jsonPayload.data);
      } else {
        throw new Error(jsonPayload.message || "Failed to fetch products");
      }
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchInventoryData(activeCategory, controller.signal);
    return () => controller.abort();
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <Helmet>
        <title>Industrial Chemicals & Polymers | Sarawagi Enterprises</title>
        <meta
          name="description"
          content="Browse our wide range of premium industrial chemicals, masterbatches, and polymers. We are authorized wholesale suppliers."
        />
      </Helmet>

      {/* Left Sidebar Brand Navigation */}
      <div className="w-full md:w-1/4 flex flex-col gap-2">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Our Principals</h3>
        {companiesList.map((company) => (
          <button
            key={company}
            onClick={() => {
              setActiveCategory(company);
              window.history.pushState(
                {},
                "",
                `/products?brand=${encodeURIComponent(company)}`,
              );
            }}
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

        {/* 🩺 Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-gray-500 font-medium">
              Querying Database Cluster...
            </p>
          </div>
        )}

        {/* ❌ Error Banner */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
            ⚠ Connection Error: {error}
          </div>
        )}

        {/* 🧱 Clean Borderless Image Grid Layout */}
        {!loading &&
          !error &&
          (products.length === 0 ? (
            <p className="text-gray-500 italic py-12 text-center">
              No products found in database for this brand branch yet.
            </p>
          ) : (
            Object.entries(groupedProducts).map(([categoryName, items]) => {
              const hasValidCategoryName =
                categoryName &&
                categoryName.trim() !== "" &&
                categoryName !== "General Products";

                return(
              <section key={categoryName || "uncategorized"}>
                {/* Category Heading */}
                {hasValidCategoryName && (
                  <h3 className="text-xl font-bold text-gray-800 pl-3 pb-5 capitalize">
                    {categoryName}
                  </h3>
                )}

                <div className="flex flex-wrap gap-6 justify-start items-start">
                  {items.map(
                    (item) =>
                      item.image && (
                        <div
                          key={item._id}
                          className="flex flex-col items-center bg-transparent max-w-65 w-full"
                        >
                          {item.image && (
                            <div className="w-full h-68 p-2 pb-10 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50/50">
                              <img
                                src={getOptimizedUrl(item.image)}
                                alt="Product"
                                className="max-h-full max-w-full object-contain mix-blend-multiply"
                              />
                            </div>
                          )}
                        </div>
                      ),
                  )}
                </div>
              </section>
                );
            })
          ))}
      </div>
    </div>
  );
};

export default Products;
