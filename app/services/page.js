"use client";

import React, { useState } from "react";
import Link from "next/link";


const servicesList = [
  { 
    id: "01", 
    title: "Web Engineering", 
    desc: "We build high-performance, accessible, and massively scalable web architectures using modern frameworks like Next.js and React.", 
    icon: "fa-code" 
  },
  { 
    id: "02", 
    title: "UI/UX Strategy", 
    desc: "Our design philosophy focuses on minimalist aesthetics and intuitive user journeys that elevate brand perception and engagement.", 
    icon: "fa-bezier-curve" 
  },
  { 
    id: "03", 
    title: "SaaS Development", 
    desc: "End-to-end engineering of cloud-native Software-as-a-Service platforms, including multi-tenancy, billing, and security.", 
    icon: "fa-server" 
  },
  { 
    id: "04", 
    title: "Mobile Solutions", 
    desc: "Creating seamless cross-platform mobile experiences that deliver native-level performance on both iOS and Android.", 
    icon: "fa-mobile-screen" 
  },
  { 
    id: "05", 
    title: "Cloud Infrastructure", 
    desc: "Architecting robust, automated CI/CD pipelines and cloud deployments using AWS, Docker, and Kubernetes for global scale.", 
    icon: "fa-cloud" 
  },
  { 
    id: "06", 
    title: "Digital Growth", 
    desc: "Data-driven strategies including SEO, performance marketing, and analytics to scale your digital presence globally.", 
    icon: "fa-magnifying-glass-chart" 
  },
];

export default function ServicesPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <main className="bg-[#020202] text-white min-h-screen font-sans overflow-hidden">
      
      {/* --- Cinematic Hero Section --- */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.05]">
        {/* Background Ambient Red Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#e50914]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
        
        <div className="text-center max-w-4xl mx-auto relative z-10 transition-all duration-1000 ease-[0.16,1,0.3,1] animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 bg-[#e50914] rounded-full animate-pulse shadow-[0_0_10px_#e50914]"></span>
            <span className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">Our Capabilities</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-[0.9] uppercase text-white mb-8 text-balance">
            Enterprise <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] to-[#8B0000]">Solutions.</span>
          </h1>
          <p className="text-lg md:text-2xl font-light text-slate-400 text-balance leading-relaxed">
            We provide a comprehensive ecosystem of services designed to scale your brand through precision engineering and human-centric design.
          </p>
        </div>
      </section>

      {/* --- Editorial Style Services List --- */}
      <section className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col">
          {servicesList.map((service, index) => (
            <div 
              key={service.id}
              className="group relative border-b border-white/[0.05] py-12 md:py-16 cursor-pointer transition-colors duration-500 hover:border-[#e50914]/50"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Subtle Red Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-r from-[#e50914]/0 via-[#e50914]/5 to-transparent transition-opacity duration-500 pointer-events-none ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}></div>

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                
                {/* Left Side: Number & Title */}
                <div className="flex items-center gap-8 md:w-3/5">
                  <span className="text-2xl md:text-4xl font-black text-white/10 group-hover:text-[#e50914] transition-colors duration-500 w-12">
                    {service.id}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white group-hover:translate-x-4 transition-transform duration-500">
                    {service.title}
                  </h2>
                </div>
                
                {/* Right Side: Description & Icon */}
                <div className="md:w-2/5 flex flex-col items-start md:items-end text-left md:text-right">
                  <p className="text-slate-400 font-light leading-relaxed group-hover:text-slate-200 transition-colors duration-300 text-balance">
                    {service.desc}
                  </p>
                  
                  {/* Floating Icon effect on hover */}
                  <div className="mt-6 w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-[#e50914]/10 group-hover:border-[#e50914]/30 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_20px_rgba(229,9,20,0.15)]">
                    <i className={`fas ${service.icon} text-2xl text-white/20 group-hover:text-[#e50914] transition-colors duration-500`}></i>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* --- Premium CTA Section --- */}
        <div className="mt-32 text-center pb-20">
           <Link 
            href="/book-a-meeting" 
            className="inline-flex items-center justify-center px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-[#020202] bg-white transition-all duration-500 hover:bg-[#e50914] hover:text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(229,9,20,0.5)]"
           >
              Initiate a Project
           </Link>
        </div>
      </section>

      {/* Inline Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) filter(blur(4px)); }
          to { opacity: 1; transform: translateY(0) filter(blur(0)); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </main>
  );
}