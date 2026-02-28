"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#020202] pt-32 pb-10 px-5 sm:px-8 overflow-hidden font-sans border-t border-white/[0.05]">
      {/* CSS ANIMATION STYLES for Red Smoke */}
      <style jsx>{`
        @keyframes smokeRisePrimary {
          0% { transform: translateY(100%) scale(1.2); opacity: 0; }
          20% { opacity: 0.3; }
          100% { transform: translateY(-50%) scale(1.8); opacity: 0; }
        }
        @keyframes smokeRiseSecondary {
          0% { transform: translateY(100%) translateX(-10%) scale(1); opacity: 0; }
          30% { opacity: 0.2; }
          100% { transform: translateY(-70%) translateX(10%) scale(1.5); opacity: 0; }
        }
        .animate-smoke-1 { animation: smokeRisePrimary 25s ease-out infinite; }
        .animate-smoke-2 { animation: smokeRiseSecondary 30s ease-out infinite 5s; }
      `}</style>

      {/* RISING SMOKE EFFECT LAYERS */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] overflow-hidden pointer-events-none z-0 select-none">
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-[#e50914]/10 blur-[120px] rounded-t-full mix-blend-screen"></div>
        <div className="absolute bottom-0 left-[-20%] w-[140%] h-[400px] bg-gradient-to-t from-[#8B0000]/30 via-[#e50914]/5 to-transparent blur-[80px] mix-blend-screen animate-smoke-1 opacity-0 origin-bottom"></div>
        <div className="absolute bottom-0 left-[-10%] w-[120%] h-[350px] bg-gradient-to-t from-[#e50914]/20 via-[#8B0000]/5 to-transparent blur-[70px] mix-blend-screen animate-smoke-2 opacity-0 origin-bottom"></div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#e50914]/30 to-transparent z-10"></div>

      {/* MAIN FOOTER CONTENT */}
      <div className="container mx-auto max-w-7xl relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6 group relative">
              <div className="absolute -inset-4 bg-[#e50914]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h2 className="text-2xl font-black text-white tracking-widest relative z-10 group-hover:text-[#e50914] transition-colors duration-500">AURA MEDIA.</h2>
            </Link>
            <p className="text-slate-400 text-sm font-light leading-relaxed text-balance pr-4">
              Engineering powerful digital legacies and intelligent software solutions for businesses ready to conquer the world stage.
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white text-xs font-bold mb-6 tracking-widest uppercase opacity-80">Quick Links</h4>
            <ul className="space-y-4">
              {["About Us", "Services", "Portfolio", "Blogs"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-sm font-medium text-slate-400 hover:text-[#e50914] transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-[1px] bg-[#e50914] mr-0 transition-all duration-300 ease-out group-hover:w-3 group-hover:mr-2 shadow-[0_0_8px_rgba(229,9,20,0.5)]"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold mb-6 tracking-widest uppercase opacity-80">Legal</h4>
            <ul className="space-y-4">
              {[ { name: "Privacy Policy", path: "/privacy-policy" }, { name: "Terms of Service", path: "/terms-of-service" }, { name: "Cancellation & Refund", path: "/cancellation-and-refund" }, { name: "Shipping & Delivery", path: "/shipping-and-delivery" } ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-sm font-medium text-slate-400 hover:text-[#e50914] transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-[1px] bg-[#e50914] mr-0 transition-all duration-300 ease-out group-hover:w-3 group-hover:mr-2 shadow-[0_0_8px_rgba(229,9,20,0.5)]"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold mb-6 tracking-widest uppercase opacity-80">Connect With Us</h4>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white border border-white/10 rounded-full bg-white/5 backdrop-blur-md transition-all duration-500 hover:bg-[#e50914] hover:border-[#e50914] hover:text-white hover:shadow-[0_0_20px_rgba(229,9,20,0.3)] mb-6 w-max">
              Contact Us
            </Link>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-[#e50914] hover:border-[#e50914] hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(229,9,20,0.4)]">
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-[#e50914] hover:border-[#e50914] hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(229,9,20,0.4)]">
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <p className="text-slate-500 text-xs sm:text-sm font-medium tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Aura Media. All Rights Reserved.
          </p>
          <p className="text-slate-500 text-xs sm:text-sm font-medium tracking-wide flex items-center gap-1.5 uppercase">
            Engineered by
            <a href="https://mehefujali.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#e50914] transition-colors relative group font-bold">
               &nbsp;Mehefuj Ali
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}