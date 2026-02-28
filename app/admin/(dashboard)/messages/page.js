"use client";

import { useEffect, useState } from "react";

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end items-center gap-4 mt-6">
      <span className="text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-slate-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-slate-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// --- Main Messages Page Component ---
export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const messagesPerPage = 15;

  useEffect(() => {
    const fetchMessages = async (page) => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/contacts?page=${page}&limit=${messagesPerPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok)
          throw new Error(
            "Failed to fetch messages. Please ensure you are logged in."
          );

        const data = await res.json();
        setMessages(data.data);
        setTotalPages(Math.ceil(data.meta.total / messagesPerPage));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages(currentPage);
  }, [currentPage]);

  if (loading)
    return <p className="text-center text-gray-400">Loading messages...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Contact Messages</h1>
      <div className="bg-slate-900/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg._id} className="border-b border-slate-800">
                    <td className="p-4 text-sm text-gray-400 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">{msg.name}</td>
                    <td className="p-4 text-cyan-400">{msg.email}</td>
                    <td className="p-4">{msg.subject}</td>
                    <td className="p-4 text-sm text-gray-300 max-w-xs">
                      {msg.message}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-500">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
