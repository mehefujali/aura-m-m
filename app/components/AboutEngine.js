"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

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

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
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
                                    Brand Heritage
                                </span>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={200}>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-10 leading-[0.95]">
                                Origin & <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                                    Evolution.
                                </span>
                            </h2>
                        </AnimatedSection>

                        <AnimatedSection delay={300} className="space-y-6">
                            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed text-balance">
                                Aura Media Marketing was founded by two friends, <strong className="font-semibold text-white">Mahdi Khan</strong> and <strong className="font-semibold text-white">Saif</strong>. It began with a simple frustration: finding the right partners for growth felt impossible. We needed a cohesive team for web, design, and video, but encountered only disconnected, generic solutions. We set out to build what we couldn&apos;t find—a genuine home for top-tier creatives where brands get reliable, expert-driven results with clarity and purpose.
                            </p>
                            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed text-balance">
                                Along the way, we realized this wasn&apos;t just our struggle; many brands were facing the same confusion and wasting time trying to figure it all out alone. That&apos;s what led to Aura Media Marketing—built to bring the right creatives into one place so you don&apos;t have to search, guess, or settle. Just reliable solutions that actually work and help you move forward with clarity.
                            </p>
                        </AnimatedSection>
                    </div>

                    {/* --- Founder Profiles (Stroke Style) --- */}
                    <div className="lg:col-span-6">
                        <AnimatedSection delay={400} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Mahdi Khan */}
                            <div className="group relative p-8 rounded-[2rem] border border-white/5 bg-transparent backdrop-blur-sm transition-all duration-700 hover:border-[#e50914]/30 hover:shadow-[0_0_40px_rgba(229,9,20,0.05)]">
                                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent z-10 opacity-60"></div>
                                    <Image 
                                        src="/mahdi.png" 
                                        alt="Mahdi Khan"
                                        width={400}
                                        height={500}
                                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">Mahdi Khan</h3>
                                <p className="text-[10px] font-bold text-[#e50914] uppercase tracking-[0.2em]">Founder</p>
                            </div>

                            {/* Saif */}
                            <div className="group relative p-8 rounded-[2rem] border border-white/5 bg-transparent backdrop-blur-sm transition-all duration-700 hover:border-[#e50914]/30 hover:shadow-[0_0_40px_rgba(229,9,20,0.05)]">
                                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent z-10 opacity-60"></div>
                                    <Image 
                                        src="/saif.jpg" 
                                        alt="Saif"
                                        width={400}
                                        height={500}
                                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">Saif</h3>
                                <p className="text-[10px] font-bold text-[#e50914] uppercase tracking-[0.2em]">Co-Founder</p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 pt-12 border-t border-white/[0.05]">
                    {[
                        { value: "150+", label: "Global Clients" },
                        { value: "98%", label: "Success Rate" },
                        // { value: "12+", label: "Industry Awards" },
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