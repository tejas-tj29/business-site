import React, { useState, useEffect } from "react";
import { principleCompanies } from "../data/productsData";

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("MYK Laticrete");

  // 1. Fetch Products Logic
  const fetchProducts = async (company) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products/all?companyName=${encodeURIComponent(company)}`,
      );
      const json = await response.json();
      if (json.success) {
        setProducts(json.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  const handleDelete = async (productId, productTitle) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${productTitle}"?`,
    );

    if (!isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products/remove/${productId}`,
        {
          method: "DELETE",
          credentials: "include", // Include cookies for session management
        },
      );

      if (response.status === 401) {
        alert(
          "Your session expired or your access was revoked. Please log in again.",
        );
        localStorage.removeItem("isAdminLoggedIn"); // Pass faad do
        window.location.href = "/admin/login"; // Login par phek do
        return;
      }

      const json = await response.json();

      if (json.success) {
        setProducts(products.filter((item) => item._id !== productId));
        alert("✅ Product deleted successfully!");
      } else {
        alert("❌ Failed to delete: " + json.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Network error during deletion.");
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Manage Inventory</h2>

        {/* Category Filter Dropdown for Admin */}
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold bg-gray-50 text-gray-700 outline-none cursor-pointer"
        >
          {principleCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-lg italic p-8 bg-gray-50 rounded-lg text-center border border-dashed border-gray-300">
          No products found in this category.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left bg-white">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                {/* Fixed widths to balance the layout perfectly */}
                <th className="py-4 px-6 font-semibold text-gray-700 w-32">
                  Image
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 w-auto">
                  Product Title
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 w-40 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-blue-50/50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-1 shadow-sm">
                      <img
                        src={
                          item.image ||
                          "https://placehold.co/100x100?text=No+Image"
                        }
                        alt={item.title}
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-lg font-medium text-gray-800">
                      {item.title}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(item._id, item.title)}
                      className="px-5 py-2.5 bg-white text-red-600 hover:bg-red-600 hover:text-white border border-red-200 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow active:scale-95"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminManageProducts;
