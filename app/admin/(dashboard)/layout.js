"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export default function AdminDashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Session expired. Please login again.");
        const data = await res.json();
        setUser(data.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040919] flex items-center justify-center">
        <p className="text-white text-xl">Loading Admin Panel...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/portfolio", label: "Portfolio" },
    { href: "/admin/blogs", label: "Blogs" },
    { href: "/admin/messages", label: "Messages" },
    ...(user.role === "SUPER_ADMIN"
      ? [{ href: "/admin/manage-admins", label: "Manage Admins" }]
      : []),
  ];

  return (
    <AuthContext.Provider value={{ user }}>
      <div className="h-screen bg-[#040919] text-white flex overflow-hidden">
        <aside className="w-64 bg-slate-900 p-6 border-r border-cyan-400/20 flex-col flex-shrink-0 hidden md:flex">
          <div className="mb-10">
            <Link href="/">
              <img
                src="https://i.ibb.co/kshWGbCV/Artboard-5.png"
                alt="NexorZen Agency Logo"
                style={{ width: "150px", height: "auto" }}
              />
            </Link>
          </div>
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  (pathname.startsWith(item.href) && item.href !== "/admin") ||
                  pathname === item.href
                    ? "bg-[#00cdf3] text-black font-semibold"
                    : "text-gray-300 hover:bg-slate-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-auto px-4 py-2 rounded-lg text-gray-300 hover:bg-red-500/80 hover:text-white transition-colors text-left"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        </aside>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </AuthContext.Provider>
  );
}
