"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Smooth Animation Wrapper
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || apiUrl;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${apiUrl}/portfolios`);
        if (!res.ok) throw new Error("API Offline");
        const data = await res.json();
        setProjects(data.data || []);
      } catch (err) { 
        // Suppress console error to avoid technical UX friction; use mock fallback instead.
        console.warn("Portfolio API unavailable. Activating localized exhibition vault."); 
      } finally { setLoading(false); }
    };
    if (apiUrl) fetchProjects(); else setLoading(false);
  }, [apiUrl]);

  const mockProjects = [
    { title: "Unifynt", client: "Unifynt Team",  imageUrls: "/unifynt-home.png" , url:"https://unifynt.com"},
    { title: "WFS", client: "WFS Team",  imageUrls: "/wfs.png" , url:"https://weddingfotostation.com/"},
    { title: "Eagle Steel Furniture", client: "ESF Team",  imageUrls: "/eagle.png" , url:"https://eaglesteelfurniture.com/"},
    
    
  ];
  const mockProjectsGraphic = [
    { title: "SUZUKI BIKE", client: "SUZUKI",  imageUrls: "/bike-posters.png" , url:"/bike-posters.png"},
    { title: "Realstate", client: "Realstate",  imageUrls: "/realstate.png" , url:"/realstate.png"},
    { title: "Brand Identity", client: "",  imageUrls: "/brand-identity.jpg" , url:"/brand-identity.jpg"},
    
    
  ];

  return (
    <main className="bg-[#020202] text-white min-h-screen font-sans selection:bg-[#e50914] selection:text-white">
      {/* Cinematic Header with Top CTA */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#e50914]/10 rounded-full blur-[200px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/[0.05] pb-20">
          <FadeIn className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#e50914]"></div>
              <span className="text-xs font-bold tracking-[0.3em] text-[#e50914] uppercase">Selected Works</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] uppercase text-white mb-10 text-balance">
              Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Signatures.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-400 max-w-2xl text-balance">
              An exhibition of our finest digital architectures. We don&apos;t just build websites; we engineer <strong className="text-white">industry dominance.</strong>
            </p>
          </FadeIn>
          
          <FadeIn delay={300}>
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 text-xs font-black uppercase tracking-[0.3em] text-[#020202] bg-white rounded-full transition-all duration-500 hover:bg-[#e50914] hover:text-white hover:shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              Start Project
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Grid Showcase - 3 Columns (Matching Storyboard Page 4) */}
      
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-40">
        <h1 className=" text-2xl md:text-5xl my-6 text-[#E50914] font-semibold">Website development</h1>
        {loading ? (
          <div className="text-center text-slate-500 py-40 text-xl tracking-widest uppercase animate-pulse">Initializing Vault...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {(projects?.length > 0 ? projects : mockProjects).map((project, index) => (
              <FadeIn key={index} delay={(index % 3) * 150} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-white/[0.01] border border-white/5 p-3 backdrop-blur-3xl transition-all duration-700 hover:border-[#e50914]/30">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] mb-8 bg-white/5">
                    <Image 
                      width={800} height={600} 
                      src={project.imageUrls} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale contrast-125 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60"></div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">{project.client || "Consultancy"}</span>
                      <span className="text-[10px] font-bold text-[#e50914] uppercase">0{index + 1}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-4 transition-colors group-hover:text-[#e50914]">{project.title}</h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-2 text-balance mb-6">{project.description}</p>
                    
                    <a href={project.url} target="blank" className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Case Study</span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#e50914] group-hover:border-[#e50914] transition-all duration-500">
                        <i className="fas fa-arrow-right -rotate-45 text-xs text-slate-400 group-hover:text-white group-hover:rotate-0 transition-all duration-500"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-40">
        <h1 className=" text-2xl md:text-5xl my-6 text-[#E50914] font-semibold">Graphic Design</h1>
        {loading ? (
          <div className="text-center text-slate-500 py-40 text-xl tracking-widest uppercase animate-pulse">Initializing Vault...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {(projects?.length > 0 ? projects : mockProjectsGraphic).map((project, index) => (
              <FadeIn key={index} delay={(index % 3) * 150} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-white/[0.01] border border-white/5 p-3 backdrop-blur-3xl transition-all duration-700 hover:border-[#e50914]/30">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] mb-8 bg-white/5">
                    <Image 
                      width={800} height={600} 
                      src={project.imageUrls} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale contrast-125 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60"></div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">{project.client || "Consultancy"}</span>
                      <span className="text-[10px] font-bold text-[#e50914] uppercase">0{index + 1}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-4 transition-colors group-hover:text-[#e50914]">{project.title}</h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-2 text-balance mb-6">{project.description}</p>
                    
                    <a href={project.url} target="blank" className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Case Study</span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#e50914] group-hover:border-[#e50914] transition-all duration-500">
                        <i className="fas fa-arrow-right -rotate-45 text-xs text-slate-400 group-hover:text-white group-hover:rotate-0 transition-all duration-500"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
      
    </main>
  );
}