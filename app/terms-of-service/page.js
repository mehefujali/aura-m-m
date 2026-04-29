"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const AnimatedSection = ({ children, className = "" }) => {
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
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

const LegalContent = ({ title, children }) => (
  <div className="mb-12 group">
    <div className="flex items-center gap-4 mb-6">
        <div className="w-1.5 h-8 bg-[#e50914] rounded-full shadow-[0_0_15px_rgba(229,9,20,0.5)]"></div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-[#e50914] transition-colors duration-300">{title}</h2>
    </div>
    <div className="text-slate-400 leading-relaxed space-y-4 font-light text-lg pl-6 border-l border-white/5 group-hover:border-[#e50914]/20 transition-colors duration-500">
        {children}
    </div>
  </div>
);

export default function TermsOfServicePage() {
  return (
    <main className="bg-[#020202] text-white min-h-screen selection:bg-[#e50914]/30">
      {/* Header Section */}
      <section className="relative py-32 lg:py-44 text-center overflow-hidden border-b border-white/[0.05]">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#e50914]/10 rounded-full blur-[200px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-5 relative z-10">
          <AnimatedSection>
            <span className="text-[#e50914] text-xs font-black tracking-[0.3em] uppercase mb-6 block">Legal Framework</span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Service</span>
            </h1>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-xs font-bold text-slate-400 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse"></span>
              Last Updated: April 30, 2026
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 lg:py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <AnimatedSection>
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl shadow-2xl">
                <LegalContent title="Agreement to Terms">
                <p>
                    {`By interfacing with the Aura Media Marketing digital platform ("Site") or utilizing our engineering services, you acknowledge and agree to be bound by this comprehensive Legal Framework ("Terms"). These Terms govern the functional relationship between you and Aura Media Marketing. If you do not consent to these protocols, access to our systems is prohibited.`}
                </p>
                </LegalContent>

                <LegalContent title="System Utilization">
                <p>
                    {`Utilization of our Site and infrastructure is permitted strictly for legitimate commercial and professional purposes. You are prohibited from executing any operations that could degrade system performance, compromise data integrity, or interfere with other users' access. Unauthorized network penetration, spamming, or any form of digital hostility is strictly forbidden.`}
                </p>
                </LegalContent>

                <LegalContent title="Intellectual Property">
                <p>
                    All proprietary content, including architectural designs, source code, visual assets, and marketing algorithms, is the exclusive intellectual property of Aura Media Marketing. Any reproduction, distribution, or commercial exploitation of these assets without explicit high-level authorization is a violation of international copyright protocols.
                </p>
                </LegalContent>

                <LegalContent title="Liability Limitation">
                <p>
                    Aura Media Marketing strives for absolute system precision and uptime. However, we do not warrant that our digital assets are impervious to error or interruption. Aura Media Marketing shall not be held liable for any indirect, incidental, or consequential system failures or data losses resulting from your interaction with our platform.
                </p>
                </LegalContent>

                <LegalContent title="Framework Updates">
                <p>
                    {`We reserve the right to iterate and update this Legal Framework at our discretion. Significant modifications will be reflected in the "Last Updated" metadata. Continuous interaction with our systems post-update constitutes acceptance of the revised protocols.`}
                </p>
                </LegalContent>

                <LegalContent title="Legal Inquiries">
                <p>
                    For formal inquiries regarding these Terms or to report system vulnerabilities, please interface with our legal department via our{" "}
                    <Link href="/contact" className="text-[#e50914] font-bold hover:text-white transition-colors duration-300 underline underline-offset-8">
                    Contact Node
                    </Link>
                    .
                </p>
                </LegalContent>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
