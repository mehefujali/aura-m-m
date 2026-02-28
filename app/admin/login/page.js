"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Login failed! Please check your credentials."
        );
      }

      localStorage.setItem("accessToken", data.data.token);
      router.push("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#040919] text-white flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              required
              className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#00cdf3] focus:ring-2 focus:ring-[#00cdf3]/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-2 w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#00cdf3] focus:ring-2 focus:ring-[#00cdf3]/50 focus:outline-none transition-colors"
            />
          </div>
          {error && (
            <p className="text-red-500 text-center font-semibold">{error}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-block px-10 py-4 text-lg font-semibold text-black bg-[#00cdf3] rounded-lg transition-all duration-300 ease-in-out hover:bg-white disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
