"use client";

import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Link from 'next/link';

// --- Apple-like Smooth Animation Wrapper (Copied from About Page) ---
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Hero section e load howar sathei animate hobe
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

// --- Premium Crimson Dust (Adapted from About Page's AmbientDust) ---
const CrimsonDust = () => {
    const particlesRef = useRef();

    const particles = useMemo(() => {
        const count = 400; // Ektu beshi particle hero section er jonno
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 25; // X
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // Z
            scales[i] = Math.random();
        }
        return { positions, scales };
    }, []);

    useFrame((state, delta) => {
        if (particlesRef.current) {
            // Subtle floating animation
            particlesRef.current.rotation.y += delta * 0.015;
            particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={particles.positions.length / 3} array={particles.positions} itemSize={3} />
                <bufferAttribute attach="attributes-scale" count={particles.scales.length} array={particles.scales} itemSize={1} />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                color="#e50914" // Premium Brand Red
                transparent
                opacity={0.3} // Very subtle and professional
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export default function Hero() {
    // Professional WhatsApp Link configuration
    const whatsappNumber = "918391977901";
    const message = "Hello Aura Media Marketing! We are interested in an enterprise digital project.";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#020202]">
            
            {/* --- Extreme Professional Background Layer --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Suspense fallback={null}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
                        <color attach="background" args={['#020202']} />
                        <CrimsonDust />
                    </Canvas>
                </Suspense>
                
                {/* Subtle Red Top Gradient (Copied layout from About Page) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#e50914_0%,transparent_20%)] opacity-[0.08]"></div>
                
                {/* Deep elegant vignette to blend edges */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/80 to-[#020202] z-10"></div>
                
                {/* Ambient Red Glows */}
                <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none z-10"></div>
                <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] bg-[#8B0000]/10 rounded-full blur-[120px] pointer-events-none z-10"></div>
            </div>

            {/* --- Main Content (Structure identical to About Page) --- */}
            <div className="relative z-20 px-5 sm:px-8 max-w-6xl mx-auto text-center w-full mt-10">
                
                {/* Premium Badge */}
                <AnimatedSection delay={100} className="mb-8 flex justify-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e50914] opacity-60"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#e50914]"></span>
                        </span>
                        <span className="text-[11px] sm:text-xs font-medium text-slate-300 tracking-[0.2em] uppercase">
                            Global Enterprise Agency
                        </span>
                    </div>
                </AnimatedSection>

                {/* Massive Typography */}
                <AnimatedSection delay={200}>
                    <h1 className="text-6xl sm:text-7xl md:text-[6rem] lg:text-[7rem] font-black text-white tracking-tighter leading-[1.0] text-balance mb-8">
                        AURA MEDIA <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                            MARKETING.
                        </span>
                    </h1>
                </AnimatedSection>

                {/* Refined Copy */}
                <AnimatedSection delay={300}>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed text-balance mb-12">
                        We are an elite collective of digital architects and marketing strategists. We engineer uncompromising digital ecosystems for forward-thinking enterprises.
                    </p>
                </AnimatedSection>

                {/* Action Buttons */}
                <AnimatedSection delay={400} className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md sm:max-w-none mx-auto">
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-sm font-bold text-white bg-[#e50914] rounded-full transition-all duration-500 ease-[0.16,1,0.3,1] hover:bg-white hover:text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:shadow-[0_0_30px_rgba(229,9,20,0.5)] uppercase tracking-widest"
                    >
                        Initiate Project
                    </a>

                    <Link
                        href="/portfolio"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-sm font-bold text-slate-300 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-xl transition-all duration-500 ease-[0.16,1,0.3,1] hover:bg-white/10 hover:text-white hover:border-white/30 uppercase tracking-widest"
                    >
                        Explore Architecture
                    </Link>
                </AnimatedSection>

            </div>

            {/* Bottom Meta Detail (Extra Professional Touch) */}
            <AnimatedSection delay={600} className="absolute bottom-8 left-0 w-full px-8 hidden md:flex justify-between items-center text-[10px] text-slate-500 font-medium tracking-[0.2em] uppercase z-20">
                <p>System Status: <span className="text-[#e50914]">Optimal</span></p>
                <div className="flex items-center gap-4">
                    <span>Scroll to explore</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-[#e50914] to-transparent"></div>
                </div>
            </AnimatedSection>

        </section>
    );
}