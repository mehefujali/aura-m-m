"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../layout";

// --- Modal Component ---
const Modal = ({ children, onClose }) => (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
    onClick={onClose}
  >
    <div
      className="glass-card w-full max-w-2xl p-8 rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

// --- Admin Form Component ---
const AdminForm = ({ onBack, onAdminCreated, adminToEdit }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: adminToEdit?.name || "",
    email: adminToEdit?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("accessToken");
    const url = adminToEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/users/${adminToEdit._id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/users/create-admin`;
    const method = adminToEdit ? "PATCH" : "POST";

    const dataToSend = { ...formData };
    if (adminToEdit && !dataToSend.password) {
      delete dataToSend.password;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Operation failed");

      setSuccess(`Admin ${adminToEdit ? "updated" : "created"} successfully!`);
      setTimeout(() => {
        onAdminCreated();
        onBack();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {adminToEdit ? "Edit Admin" : "Create New Admin"}
        </h2>
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          &larr; Back to List
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-gray-400">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#00cdf3]"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-400"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#00cdf3]"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-400"
          >
            New Password ({adminToEdit ? "Optional" : "Required"})
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required={!adminToEdit}
            className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#00cdf3]"
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-10 py-4 text-lg font-semibold text-black bg-[#00cdf3] rounded-lg hover:bg-white disabled:bg-gray-600"
          >
            {loading
              ? "Saving..."
              : adminToEdit
              ? "Update Admin"
              : "Create Admin"}
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Main Page Component ---
export default function ManageAdminsPage() {
  const { user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminToEdit, setAdminToEdit] = useState(null);

  const fetchAdmins = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/admins`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch admins");
      const data = await res.json();
      setAdmins(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "SUPER_ADMIN") {
      fetchAdmins();
    }
  }, [user]);

  const handleOpenModal = (admin = null) => {
    setAdminToEdit(admin);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAdminToEdit(null);
  };

  const handleDelete = async (adminToDelete) => {
    if (
      window.confirm(
        `Are you sure you want to delete admin "${adminToDelete.name}"?`
      )
    ) {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${adminToDelete._id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to delete admin");
        fetchAdmins();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (!user) return null;
  if (user.role !== "SUPER_ADMIN") {
    return (
      <p className="text-red-500">You are not authorized to view this page.</p>
    );
  }

  if (loading) return <p>Loading admins...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Admins</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#00cdf3] text-black font-semibold px-4 py-2 rounded-lg hover:bg-white"
        >
          Create New Admin
        </button>
      </div>

      <div className="bg-slate-900/50 rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-b border-slate-800">
                <td className="p-4">{admin.name}</td>
                <td className="p-4 text-cyan-400">{admin.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      admin.role === "SUPER_ADMIN"
                        ? "bg-green-500/30 text-green-300"
                        : "bg-cyan-500/30 text-cyan-300"
                    }`}
                  >
                    {admin.role}
                  </span>
                </td>
                <td className="p-4 text-center space-x-4">
                  {admin.role !== "SUPER_ADMIN" && (
                    <>
                      <button
                        onClick={() => handleOpenModal(admin)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(admin)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <AdminForm
            onBack={handleCloseModal}
            onAdminCreated={fetchAdmins}
            adminToEdit={adminToEdit}
          />
        </Modal>
      )}
    </div>
  );
}
