"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => { window.removeEventListener("scroll", handleScroll); document.body.style.overflow = "auto"; };
  }, [isMenuOpen]);

  const desktopNavLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blogs", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-[0.16,1,0.3,1] ${isScrolled ? "bg-[#020202]/80 backdrop-blur-2xl border-b border-white/[0.05] py-3" : "bg-transparent py-5 md:py-6"}`}>
        <nav className="container mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          <Link href="/" className="relative z-10 flex items-center group">
            <h2 className="text-xl md:text-2xl font-black text-white tracking-widest relative z-10 group-hover:text-[#e50914] transition-colors duration-500">AURA MEDIA.</h2>
          </Link>

          <div className="hidden lg:flex items-center justify-center space-x-1 absolute left-1/2 -translate-x-1/2 bg-white/[0.02] border border-white/[0.05] px-1.5 py-1.5 rounded-full backdrop-blur-xl">
            {desktopNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href} className={`relative px-5 py-2.5 rounded-full text-[12px] uppercase tracking-wider font-bold transition-all duration-300 ease-out ${isActive ? "text-white bg-white/10" : "text-slate-400 hover:text-[#e50914] hover:bg-white/5"}`}>
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="hidden lg:block">
              <Link href="/book-a-meeting" className="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-widest font-bold text-white bg-[#e50914] rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]">
                Initiate Project
              </Link>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 backdrop-blur-md transition-all duration-300 hover:text-[#e50914] hover:border-[#e50914]">
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars-staggered"} text-sm`}></i>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#020202]/80 backdrop-blur-2xl z-[110] transition-opacity duration-500 lg:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsMenuOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#020202] border-l border-white/5 shadow-2xl z-[120] transition-transform duration-500 lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-8 flex flex-col h-full overflow-y-auto">
           <div className="flex items-center justify-between mb-10">
            <span className="text-[10px] font-bold text-[#e50914] tracking-[0.2em] uppercase">Navigation</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-[#e50914]"><i className="fas fa-times text-xl"></i></button>
          </div>
          <div className="flex flex-col space-y-4">
            {desktopNavLinks.map((link) => (
               <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold text-slate-300 hover:text-[#e50914] transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}