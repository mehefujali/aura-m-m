"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const servicesData = [
  { icon: "fa-code", title: "Web Engineering", description: "We build high-performance, accessible, and massively scalable web architectures using modern frameworks like Next.js and React." },
  { icon: "fa-bezier-curve", title: "UI/UX Strategy", description: "Our design philosophy focuses on minimalist aesthetics and intuitive user journeys that elevate brand perception and engagement." },
  { icon: "fa-server", title: "SaaS Development", description: "End-to-end engineering of cloud-native Software-as-a-Service platforms, including multi-tenancy, billing, and security." },
  { icon: "fa-mobile-screen", title: "Mobile Solutions", description: "Creating seamless cross-platform mobile experiences that deliver native-level performance on both iOS and Android." },
  { icon: "fa-cloud", title: "Cloud Infrastructure", description: "Architecting robust, automated CI/CD pipelines and cloud deployments using AWS, Docker, and Kubernetes for global scale." },
  { icon: "fa-magnifying-glass-chart", title: "Digital Growth", description: "Data-driven strategies including SEO, performance marketing, and analytics to scale your digital presence globally." },
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative p-8 md:p-10 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-xl transition-all duration-1000 ease-[0.16,1,0.3,1] hover:bg-white/[0.02] hover:border-[#e50914]/20 hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#e50914]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8 w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-[#e50914]/10 group-hover:border-[#e50914]/20 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.15)]">
          <i className={`fas ${service.icon} text-xl text-slate-400 transition-colors duration-500 group-hover:text-[#e50914]`}></i>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight group-hover:text-white transition-colors">{service.title}</h3>
        <p className="text-slate-400 font-light leading-relaxed mb-8 flex-grow text-balance">{service.description}</p>
        <div className="mt-auto">
          <Link href="/book-a-meeting" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#e50914] transition-colors duration-300">
            Learn More <i className="fas fa-arrow-right-long ml-2 transform transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Services() {
  const headerRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.5 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => { if (headerRef.current) observer.unobserve(headerRef.current); };
  }, []);

  return (
    <section className="bg-[#020202] py-24 lg:py-32 px-5 sm:px-8 relative overflow-hidden font-sans border-b border-white/[0.03]">
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-[#8B0000]/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-20 md:mb-28 transition-all duration-1000 ease-[0.16,1,0.3,1] ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="text-[11px] sm:text-[12px] font-medium text-slate-300 tracking-[0.1em] uppercase">Our Expertise</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase text-balance">
            Enterprise Solutions for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] to-white">Digital Dominance</span>
          </h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed text-balance">
            We provide a comprehensive ecosystem of services designed to scale your brand through precision engineering and human-centric design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/services" className="inline-flex items-center px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-slate-300 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-[#e50914]/50 hover:text-white">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}