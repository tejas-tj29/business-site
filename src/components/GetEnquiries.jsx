import { useEffect, useState } from "react";

const GetEnquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/inquiries`);
    const data = await res.json();
    if (data.success) setInquiries(data.data);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Status Update Logic (Dropdown change karne par)
  const handleStatusChange = async (id, newStatus) => {
    await fetch(`${import.meta.env.VITE_API_URL}/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchInquiries(); // List refresh karo
  };

  // ... existing handleStatusChange function
  const handleDelete = async (id) => {
    // 🛡️ Safety check: Delete karne se pehle confirm karo
    if (!window.confirm("Are you sure you want to delete this inquiry?"))
      return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/inquiries/${id}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (data.success) {
        fetchInquiries(); // Table ko refresh kar do
      } else {
        alert("Error deleting inquiry");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Client Inquiries Management</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Company</th>
              <th className="p-3">Message</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{inq.name}</td>
                <td className="p-3">
                  {inq.email} <br /> {inq.phone}
                </td>
                <td className="p-3">{inq.companyName}</td>
                <td className="p-3 max-w-xs">{inq.message}</td>
                <td className="p-3">
                  {/* Dropdown for Status Update */}
                  <select
                    value={inq.status}
                    onChange={(e) =>
                      handleStatusChange(inq._id, e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Archived">Archived</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(inq._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetEnquiries;