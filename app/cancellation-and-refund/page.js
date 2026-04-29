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

export default function CancellationRefundPage() {
  return (
    <main className="bg-[#020202] text-white min-h-screen selection:bg-[#e50914]/30">
      {/* Header Section */}
      <section className="relative py-32 lg:py-44 text-center overflow-hidden border-b border-white/[0.05]">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#e50914]/10 rounded-full blur-[200px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-5 relative z-10">
          <AnimatedSection>
            <span className="text-[#e50914] text-xs font-black tracking-[0.3em] uppercase mb-6 block">Service Protocols</span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
              Cancellation & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Refund</span>
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
                <LegalContent title="Project Cancellation">
                <p>
                    Aura Media Marketing operates on high-precision engineering timelines. Cancellations must be initiated through a formal project decommissioning request. If a project is cancelled after technical architecture has commenced but before full deployment, a decommissioning fee proportional to the allocated engineering resources will be applied.
                </p>
                </LegalContent>

                <LegalContent title="Refund Eligibility">
                <p>
                    Refunds are processed based on the specific service milestone achieved. Professional service fees for initiated architectural phases are generally non-refundable due to the high-level labor and intellectual property already deployed. Technical credit may be issued for future project iterations at the discretion of Aura Media leadership.
                </p>
                </LegalContent>

                <LegalContent title="Software Licenses">
                <p>
                    Fees for proprietary software licenses or third-party API integrations deployed during project execution are strictly non-refundable once the activation key has been generated or the integration has been finalized.
                </p>
                </LegalContent>

                <LegalContent title="Processing Timeline">
                <p>
                    Approved refund requests undergo a rigorous financial audit. Upon verification, the refund vector will be initialized within 10-15 business days. Funds will be returned via the original payment protocol used during project initiation.
                </p>
                </LegalContent>

                <LegalContent title="Dispute Resolution">
                <p>
                    In the event of a service disagreement, we prioritize technical mediation. We encourage clients to interface directly with their Project Lead before escalating to a formal dispute to ensure a streamlined resolution.
                </p>
                </LegalContent>

                <LegalContent title="Formal Requests">
                <p>
                    To initialize a cancellation or refund inquiry, please interface with our financial department via the{" "}
                    <Link href="/contact" className="text-[#e50914] font-bold hover:text-white transition-colors duration-300 underline underline-offset-8">
                    Support Node
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
