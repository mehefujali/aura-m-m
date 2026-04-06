"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const insights = [
    {
        title: "Market Domination",
        category: "Strategy",
        description: "How to engineer a brand presence that commands attention and crushes competition.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "Strategic Branding",
        category: "Design",
        description: "The psychology of visual identity and building emotional resonance with your audience.",
        image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "Creative Excellence",
        category: "Production",
        description: "Bridging the gap between conceptual ideation and pixel-perfect digital execution.",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
    }
];

export default function DigitalInsights() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    return (
        <section ref={sectionRef} className="py-24 lg:py-40 bg-[#020202] relative overflow-hidden font-sans border-t border-white/[0.03]">
            <div className="container mx-auto px-5 sm:px-8 max-w-7xl relative z-10">
                
                <div className={`text-center mb-24 transition-all duration-1000 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] shadow-[0_0_10px_#e50914]"></span>
                        <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">Grow with Aura</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
                        Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.2)]">Insights.</span>
                    </h2>
                    <p className="text-lg text-slate-400 font-light max-w-xl mx-auto">
                        Intelligence for the modern industry leader. Direct transmissions from our engine room.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {insights.map((item, idx) => (
                        <div 
                            key={idx} 
                            className={`group relative transition-all duration-1000 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.01] backdrop-blur-3xl group-hover:border-[#e50914]/30 transition-all duration-700">
                                <Image 
                                    src={item.image} 
                                    alt={item.title} 
                                    fill 
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] opacity-40 group-hover:opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/20 to-transparent"></div>
                                
                                <div className="absolute bottom-10 left-10 right-10">
                                    <span className="text-[10px] font-bold text-[#e50914] uppercase tracking-widest mb-3 block">{item.category}</span>
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">{item.title}</h3>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
