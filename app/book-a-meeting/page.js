"use client";

import React, { useEffect, useState, useRef } from "react";
import { InlineWidget } from "react-calendly";
import Link from "next/link";

export default function BookMeetingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="bg-[#020202] text-white min-h-screen font-sans selection:bg-[#e50914] selection:text-white flex items-center relative overflow-hidden">
      
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#e50914]/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#8B0000]/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1400px] relative z-10 py-32 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 min-h-[85vh]">
          
          {/* --- Left Side: Massive Typography & Trust Signals --- */}
          <div className={`w-full lg:w-1/2 flex flex-col justify-center transition-all duration-1000 ease-[0.16,1,0.3,1] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#e50914] transition-colors mb-10 w-max group">
              <i className="fas fa-arrow-left text-sm group-hover:-translate-x-1 transition-transform"></i>
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Return to Base</span>
            </Link>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl mb-8 w-max">
              <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse shadow-[0_0_10px_#e50914]"></span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-300 tracking-[0.2em] uppercase">
                Strategic Consultation
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.95] text-white mb-8 uppercase text-balance">
              Initialize <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] to-[#8B0000]">Growth.</span>
            </h1>

            <p className="text-lg md:text-xl font-light text-slate-400 max-w-lg leading-relaxed mb-12">
              Book a highly focused 30-minute discovery session with our lead architects. We&apos;ll analyze your current infrastructure and map out a blueprint for digital dominance.
            </p>

            {/* Enterprise Trust Badges */}
            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/[0.05]">
              <div>
                <p className="text-3xl font-black text-white mb-1 tracking-tighter">100<span className="text-[#e50914]">%</span></p>
                <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Confidential</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white mb-1 tracking-tighter">0<span className="text-[#e50914]">$</span></p>
                <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Obligation</p>
              </div>
            </div>

          </div>

          {/* --- Right Side: Premium Calendly Widget Wrapper --- */}
          <div className={`w-full lg:w-1/2 relative transition-all duration-1000 delay-300 ease-[0.16,1,0.3,1] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            
            {/* Abstract Decorative Frame */}
            <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-tr from-[#e50914]/20 to-transparent rounded-[2.5rem] blur-2xl opacity-50 pointer-events-none"></div>
            
            <div className="relative w-full h-[650px] md:h-[700px] rounded-[2rem] border border-white/10 bg-[#050505]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group">
              
              {/* Premium Top Bar of the Widget */}
              <div className="h-12 border-b border-white/5 bg-white/[0.02] flex items-center px-6 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
                <p className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Secure Scheduling Node</p>
              </div>

              {/* Calendly Widget */}
              <div className="w-full h-[calc(100%-3rem)] bg-[#0A0A0A]">
                <InlineWidget 
                  url="https://calendly.com/mehefujalim/30min" 
                  styles={{ height: '100%', width: '100%' }}
                  pageSettings={{
                    backgroundColor: '0A0A0A',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: 'e50914', // Aura Media Red Theme
                    textColor: 'ffffff'
                  }}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}