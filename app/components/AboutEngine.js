"use client";

import React, { useEffect, useRef, useState } from "react";

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-[0.16,1,0.3,1] ${className} ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[4px] translate-y-12'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const AboutEngine = () => {
    return (
        <section className="relative w-full py-24 lg:py-32 bg-[#020202] border-b border-white/[0.03] overflow-hidden font-sans">
            
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#8B0000]/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center mb-24">
                    
                    <div className="lg:col-span-6">
                        <AnimatedSection delay={100}>
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl mb-8 shadow-[0_0_15px_rgba(229,9,20,0.05)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] shadow-[0_0_10px_#e50914]"></span>
                                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 tracking-[0.25em] uppercase">
                                    Corporate Identity
                                </span>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={200}>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-8 text-balance">
                                WE ARE YOUR <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                                    GROWTH ENGINE.
                                </span>
                            </h2>
                        </AnimatedSection>

                        <AnimatedSection delay={300}>
                            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed text-balance max-w-2xl">
                                Not just another agency. We are an elite team of digital architects and marketing strategists. With a focus on <strong className="font-semibold text-white">brutal execution</strong> and data-driven scaling, we become a true extension of your enterprise.
                            </p>
                        </AnimatedSection>
                    </div>

                    {/* --- Landscape Video Card --- */}
                    <div className="lg:col-span-6 relative">
                        <AnimatedSection delay={400} className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-2xl group shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#e50914]/30 to-transparent opacity-60 z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-30"></div>
                            
                            {/* proper video tag that plays inline and prevents downloading */}
                            <video 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-full object-cover grayscale contrast-125 brightness-75 transition-all duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105 group-hover:grayscale-0"
                            >
                                {/* Replace with your actual video URL */}
                                <source src="https://cdn.pixabay.com/video/2020/05/25/40131-424911048_large.mp4" type="video/mp4" />
                            </video>

                            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end pointer-events-none">
                                <div className="px-5 py-3 bg-[#020202]/80 backdrop-blur-md border border-white/10 rounded-xl">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-semibold mb-1">System Status</p>
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-2 h-2 rounded-full bg-[#e50914] shadow-[0_0_10px_#e50914] animate-pulse"></span>
                                        <p className="text-xs text-white font-medium tracking-wide">Fully Operational</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 pt-12 border-t border-white/[0.05]">
                    {[
                        { value: "150+", label: "Global Clients" },
                        { value: "98%", label: "Success Rate" },
                        { value: "12+", label: "Industry Awards" },
                        { value: "5Y", label: "Market Dominance" },
                    ].map((stat, idx) => (
                        <AnimatedSection key={idx} delay={400 + (idx * 100)}>
                            <div className="p-8 rounded-3xl bg-white/[0.01] border border-white/[0.05] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.03] hover:border-white/10 hover:-translate-y-2 group">
                                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 group-hover:scale-105 transition-transform origin-left">
                                    {stat.value.replace(/[^0-9]/g, '')}
                                    <span className="text-[#e50914]">{stat.value.replace(/[0-9]/g, '')}</span>
                                </h3>
                                <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-[0.2em] font-bold group-hover:text-slate-400 transition-colors">{stat.label}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutEngine;