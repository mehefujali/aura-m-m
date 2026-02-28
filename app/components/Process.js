"use client";

import React, { useEffect, useRef, useState } from 'react';

const processSteps = [
    { num: "01", title: "Discovery & Analysis", description: "We start by deeply understanding your vision, goals, and target audience to lay a solid foundation for the architecture.", icon: "fa-search" },
    { num: "02", title: "Strategy & Planning", description: "A comprehensive roadmap is crafted, detailing the technology stack, system architecture, and precise project milestones.", icon: "fa-layer-group" },
    { num: "03", title: "UI/UX Design", description: "We create intuitive, hyper-modern interfaces and interactive prototypes to perfectly visualize the final digital product.", icon: "fa-pen-nib" },
    { num: "04", title: "Engineering", description: "Our elite developers bring the design to life with clean, highly efficient, and massively scalable code.", icon: "fa-code" },
    { num: "05", title: "Quality Assurance", description: "Rigorous automated and manual testing is conducted to ensure a bug-free, secure, and high-performance deployment.", icon: "fa-shield-halved" },
    { num: "06", title: "Deployment", description: "We handle the seamless project launch into production and provide ongoing support for continuous scaling.", icon: "fa-rocket" }
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

        if (stepRef.current) observer.observe(stepRef.current);
        return () => { if (stepRef.current) observer.unobserve(stepRef.current); };
    }, []);

    const isEven = index % 2 === 0;

    return (
        <div ref={stepRef} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? '' : 'md:flex-row-reverse'} mb-16 md:mb-24 last:mb-0`}>
            
            {/* Timeline Center Node */}
            <div className="absolute left-6 md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-20">
                <div className="w-12 h-12 rounded-full bg-[#020202] flex items-center justify-center">
                    <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-1000 ease-out ${isVisible ? 'bg-[#e50914] shadow-[0_0_20px_rgba(229,9,20,0.8)] scale-100' : 'bg-slate-800 scale-50'}`}></div>
                </div>
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-20' : 'md:pl-20'} transition-all duration-1000 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                <div className="group p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.04] hover:border-[#e50914]/30 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(229,9,20,0.1)]">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#e50914]/10 group-hover:border-[#e50914]/20 transition-all duration-500">
                            <i className={`fas ${step.icon} text-xl text-slate-400 group-hover:text-[#e50914] transition-colors duration-500`}></i>
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50">
                            <span className="text-xs font-mono font-semibold text-[#e50914] tracking-widest uppercase">Step {step.num}</span>
                        </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#e50914] transition-all duration-300">
                        {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed font-light text-balance">{step.description}</p>
                </div>
            </div>
            <div className="hidden md:block w-1/2"></div>
        </div>
    );
};

export default function Process() {
    const headerRef = useRef(null);
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsHeaderVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );
        if (headerRef.current) observer.observe(headerRef.current);
        return () => { if (headerRef.current) observer.unobserve(headerRef.current); };
    }, []);

    return (
        <section className="bg-[#020202] py-24 lg:py-32 px-5 sm:px-8 relative overflow-hidden font-sans border-b border-white/[0.03]">
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#e50914]/10 rounded-full blur-[150px] pointer-events-none"></div>
            
            <div className="container mx-auto max-w-6xl relative z-10">
                <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-20 md:mb-32 transition-all duration-1000 ease-[0.16,1,0.3,1] ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="mb-6 flex justify-center">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm">
                            <span className="text-[11px] sm:text-[12px] font-medium text-slate-300 tracking-[0.1em] uppercase">Our Methodology</span>
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter text-balance uppercase">
                        How We Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] to-[#8B0000]">Your Vision</span>
                    </h2>
                    <p className="text-lg text-slate-400 font-light leading-relaxed text-balance">
                        A meticulously crafted, data-driven workflow designed to transform complex challenges into elegant, scalable digital architectures.
                    </p>
                </div>

                <div className="relative w-full">
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#e50914]/30 to-transparent -translate-x-1/2"></div>
                    <div className="relative z-10">
                        {processSteps.map((step, index) => (
                            <ProcessStep key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}