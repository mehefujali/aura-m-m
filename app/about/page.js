"use client";

import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return (
        <div ref={ref} className={`transition-all duration-1000 ease-[0.16,1,0.3,1] ${className} ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[4px] translate-y-12'}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

const AmbientDust = () => {
    const particlesRef = useRef();
    const particles = useMemo(() => {
        const count = 300;
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
            scales[i] = Math.random();
        }
        return { positions, scales };
    }, []);

    useFrame((state, delta) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += delta * 0.02;
            particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={particles.positions.length / 3} array={particles.positions} itemSize={3} />
                <bufferAttribute attach="attributes-scale" count={particles.scales.length} array={particles.scales} itemSize={1} />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#e50914" transparent opacity={0.3} sizeAttenuation={true} blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
    );
};

export default function AboutPage() {
    const stats = [
        { label: "Engineering Hours", value: "10k+" },
        { label: "Client Satisfaction", value: "99%" },
        { label: "Global Partners", value: "15+" },
        { label: "Uptime Guaranteed", value: "99.9%" }
    ];

    const philosophies = [
        { title: "Architecture First", desc: "We design robust, scalable systems before writing a single line of code.", icon: "fa-layer-group" },
        { title: "Pixel Perfection", desc: "Every interface is meticulously crafted. We bridge the gap between design and execution.", icon: "fa-wand-magic-sparkles" },
        { title: "Security by Design", desc: "Implementing absolute security protocols natively into our applications.", icon: "fa-shield-halved" },
        { title: "Future-Proof Stacks", desc: "Deploying exclusively on modern, highly-performant frameworks that scale effortlessly.", icon: "fa-rocket" },
    ];

    return (
        <main className="bg-[#020202] text-white overflow-hidden font-sans">
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden border-b border-white/[0.03]">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Suspense fallback={null}>
                        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
                            <color attach="background" args={['#020202']} />
                            <AmbientDust />
                        </Canvas>
                    </Suspense>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#e50914_0%,transparent_20%)] opacity-[0.08]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/80 to-[#020202] z-10"></div>
                </div>

                <div className="relative z-20 px-5 sm:px-8 max-w-6xl mx-auto text-center w-full">
                    <AnimatedSection delay={100} className="mb-8 flex justify-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e50914] opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#e50914]"></span>
                            </span>
                            <span className="text-[11px] sm:text-xs font-bold text-slate-300 tracking-[0.2em] uppercase">The Aura Media Identity</span>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1.0] text-balance mb-8 uppercase">
                            Engineering the <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#e50914]">Digital Paradigm.</span>
                        </h1>
                    </AnimatedSection>
                    <AnimatedSection delay={300}>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed text-balance">
                            We are an elite collective of architects, engineers, and designers building uncompromising digital products for forward-thinking enterprises.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-12 border-y border-white/[0.03] bg-white/[0.01] relative z-20">
                <div className="container mx-auto px-5 sm:px-8 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/5">
                        {stats.map((stat, idx) => (
                            <AnimatedSection key={idx} delay={idx * 100} className="text-center px-4 first:pl-0 last:pr-0">
                                <p className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 px-5 sm:px-8 relative z-20 overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#e50914]/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none"></div>
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-5 space-y-10">
                            <AnimatedSection>
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6">Origin & Evolution</h2>
                                <div className="w-12 h-[2px] bg-[#e50914] mb-8"></div>
                                <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
                                    <p>Founded by Mehefuj Ali, Aura Media Marketing was born out of a necessity to eliminate the compromise between aesthetic brilliance and technical superiority.</p>
                                    <p>Operating globally, we engineer sophisticated web applications, scalable SaaS architectures, and immersive digital platforms that redefine industry standards.</p>
                                </div>
                            </AnimatedSection>
                        </div>
                        <AnimatedSection className="lg:col-span-7 relative" delay={200}>
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] p-2 backdrop-blur-sm shadow-[0_0_40px_rgba(229,9,20,0.1)]">
                                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" alt="Aura Media Core Infrastructure" className="w-full h-auto rounded-2xl object-cover grayscale contrast-125 brightness-90" />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </main>
    );
}