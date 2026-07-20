import React, { useState } from "react";
import { principleCompanies } from "../data/productsData";

const AdminAddProduct = () => {
  // 1. Setup State Hooks for all inputs
  const [companyCategory, setCompanyCategory] = useState("Fouress Engineering");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // States for UX feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 2. Handle Image Selection
  const handleImageChange = (e) => {
    // Array ka pehla element hamari actual photo file hoti hai
    setImageFile(e.target.files[0]);
  };

  // 3. The Submit Handler Engine
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 🚀 Creating the special FormData packet (No JSON here!)
      const formData = new FormData();
      formData.append("companyCategory", companyCategory);
      formData.append("category", category);
      formData.append("order", order);

      // If a file is selected, attach it to the key "image" (this must match multer's upload.single('image'))
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/add`,
        {
          method: "POST",
          // ⚠️ CRITICAL NOTE: NEVER manually set "Content-Type" to "multipart/form-data" with fetch().
          // The browser automatically sets it with the correct boundary parameters when it sees a FormData object!
          credentials: "include", // Include cookies for session management
          body: formData,
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

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        setMessage(
          "✅ Product successfully uploaded to Cloudinary & Database!",
        );
        // Reset the form fields after success
        setImageFile(null);
      } else {
        setMessage(`❌ Upload Failed: ${jsonResponse.message}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      setMessage("❌ Connection error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Admin Panel: Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Category
          </label>
          <select
            value={companyCategory}
            onChange={(e) => setCompanyCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            {principleCompanies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Display Order Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Sequence Order (e.g. 1, 2, 3...)
          </label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number (lower comes first)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g. Adhesives or Valves"
          />
        </div>

        {/* Image File Uploader */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-4 text-white font-bold rounded transition-colors ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Uploading to Cloud..." : "Publish Product"}
        </button>

        {/* Feedback Message */}
        {message && (
          <div
            className={`p-3 mt-4 rounded font-medium text-sm ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminAddProduct;
