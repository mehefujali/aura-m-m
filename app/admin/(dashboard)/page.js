// app/admin/page.js
"use client";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Welcome to the Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-300">
            Total Portfolio Projects
          </h2>
          <p className="text-4xl font-bold text-[#00cdf3] mt-2">15</p>
        </div>
        <div className="glass-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-300">
            Total Blog Posts
          </h2>
          <p className="text-4xl font-bold text-[#00cdf3] mt-2">25</p>
        </div>
        <div className="glass-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-300">New Messages</h2>
          <p className="text-4xl font-bold text-[#00cdf3] mt-2">8</p>
        </div>
      </div>
    </div>
  );
}
