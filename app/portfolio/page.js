"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

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
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setProjects(data.data);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    if (apiUrl) fetchProjects(); else setLoading(false);
  }, [apiUrl]);

  return (
    <main className="bg-[#020202] text-white min-h-screen font-sans selection:bg-[#e50914] selection:text-white">
      {/* Cinematic Header */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#e50914]/10 rounded-full blur-[200px] pointer-events-none"></div>
        <FadeIn>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#e50914]"></div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#e50914] uppercase">Selected Works</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] uppercase text-white mb-10 text-balance">
            Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#555]">Signatures.</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-400 max-w-2xl text-balance">
            An exhibition of our finest digital architectures. We don&apos;t just build websites; we engineer <strong className="text-white">industry dominance.</strong>
          </p>
        </FadeIn>
      </section>

      {/* Asymmetrical Showcase List */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-40">
        <div className="w-full h-[1px] bg-white/[0.05] mb-20"></div>
        
        {loading ? (
          <div className="text-center text-slate-500 py-20 text-xl tracking-widest uppercase">Initializing Vault...</div>
        ) : (
          <div className="flex flex-col gap-32 md:gap-40">
            {projects.map((project, index) => {
              // Alternate layout based on index (even/odd)
              const isEven = index % 2 === 0;

              return (
                <div key={project._id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}>
                  
                  {/* Image Area - Cinematic Parallax Feel */}
                  <div className="w-full lg:w-3/5">
                    <FadeIn delay={100} className="w-full">
                      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm bg-white/[0.02] border border-white/[0.05]">
                        <Image 
                          width={1200} height={800} 
                          src={`${imageBaseUrl}${project.imageUrls[0]}`} 
                          alt={project.title} 
                          className="w-full h-full object-cover grayscale contrast-125 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:grayscale-0 group-hover:scale-110"
                        />
                        {/* Elegant overlay glow */}
                        <div className="absolute inset-0 bg-[#e50914]/0 group-hover:bg-[#e50914]/10 transition-colors duration-1000 mix-blend-overlay"></div>
                      </div>
                    </FadeIn>
                  </div>

                  {/* Content Area - Minimal Typography */}
                  <div className="w-full lg:w-2/5 flex flex-col justify-center relative">
                    <FadeIn delay={200}>
                      {/* Giant background number */}
                      <span className="absolute -top-16 -left-10 text-[10rem] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">
                        0{index + 1}
                      </span>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                           <span className="w-2 h-2 bg-[#e50914] rounded-full"></span>
                           <span className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase">{project.client || "Enterprise"}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6 group-hover:text-[#e50914] transition-colors duration-500">
                          {project.title}
                        </h2>
                        <p className="text-slate-400 font-light leading-relaxed mb-10 text-lg">
                          {project.description}
                        </p>
                        
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white group/btn">
                            <span className="relative overflow-hidden">
                              <span className="inline-block group-hover/btn:-translate-y-full transition-transform duration-300">Explore Project</span>
                              <span className="absolute top-0 left-0 text-[#e50914] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">Explore Project</span>
                            </span>
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-[#e50914] group-hover/btn:bg-[#e50914] transition-all duration-300">
                               <i className="fas fa-arrow-right -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300"></i>
                            </div>
                          </a>
                        )}
                      </div>
                    </FadeIn>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}