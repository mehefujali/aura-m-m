"use client";

import React, { useEffect, useRef, useState } from 'react';

const processSteps = [
    {
        title: "Startup Discovery",
        subtitle: "The Foundation",
        description: "A deep diagnostic into your brand's potential, audience behavior, and competitive landscape to define core objectives.",
        icon: "fa-rocket",
    },
    {
        title: "SEO Strategy",
        subtitle: "Visibility Architecture",
        description: "Mapping out the digital search ecosystem including keyword roadmaps and growth-oriented content structure.",
        icon: "fa-search",
    },
    {
        title: "Social Media",
        subtitle: "Community Protocol",
        description: "Initializing social platforms with consistent branding and strategic engagement frameworks for maximum reach.",
        icon: "fa-hashtag",
    },
    {
        title: "Media Solutions",
        subtitle: "Visual Impact",
        description: "Executing high-performance design and video production with a focus on speed, scalability, and pixel-perfect precision.",
        icon: "fa-video",
    },
    {
        title: "Cool Content",
        subtitle: "Creative Execution",
        description: "Deploying targeted creative campaigns and performance marketing strategies to dominate your industry's digital space.",
    },
    {
        title: "Digital Growth",
        subtitle: "Continuous Evolution",
        description: "Real-time auditing and data-driven optimizations to ensure your brand remains ahead of global digital trends.",
        icon: "fa-chart-line",
    }
];

const ProcessStep = ({ step, index }) => {
    const stepRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
        );

        const currentRef = stepRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    const isEven = index % 2 === 0;

    return (
        <div 
            ref={stepRef}
            className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-32 transition-all duration-1000 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-20 blur-[2px]'} ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
        >
            {/* Index Display */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className={`text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter transition-all duration-700 ${isVisible ? 'text-white/10' : 'text-white/0'} select-none pointer-events-none`}>
                    0{index + 1}
                </div>
            </div>

            {/* Content Card */}
            <div className="w-full lg:w-1/2">
                <div className="p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-2xl transition-all duration-500 hover:border-[#e50914]/20 hover:bg-white/[0.02] group">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-[#e50914]/40 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.1)] transition-all duration-500">
                        <i className={`fas ${step.icon || 'fa-bolt'} text-2xl ${index % 2 === 0 ? 'text-[#e50914]' : 'text-white'} group-hover:scale-110 transition-transform`}></i>
                    </div>
                    
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] mb-4">{step.subtitle}</p>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-6 group-hover:text-[#e50914] transition-colors">{step.title}</h3>
                    <p className="text-lg text-slate-400 font-light leading-relaxed max-w-lg">
                        {step.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Process() {
    const headerRef = useRef(null);
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHeaderVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );
        const currentRef = headerRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    return (
        <section id="process" className="bg-[#020202] py-24 lg:py-40 px-5 sm:px-8 relative overflow-hidden font-sans border-t border-white/[0.03]">
            <div className="absolute top-1/4 translate-x-[-50%] left-0 w-[800px] h-[800px] bg-[#e50914]/5 rounded-full blur-[200px] pointer-events-none"></div>
            
            <div className="container mx-auto max-w-7xl relative z-10">
                <div 
                    ref={headerRef}
                    className={`text-center mb-32 transition-all duration-1000 ease-[0.16,1,0.3,1] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] shadow-[0_0_10px_#e50914]"></span>
                        <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">Phase Matrix</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
                        Growth <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                            Protocols.
                        </span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-[#e50914]/20 to-white/10 hidden lg:block"></div>
                    
                    {processSteps.map((step, index) => (
                        <ProcessStep key={index} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}