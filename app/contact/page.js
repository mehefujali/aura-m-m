"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Apple-style Smooth Animation Wrapper
const AnimatedSection = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-[2px]'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", budget: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    // Placeholder for API logic
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <main className="bg-[#020202] text-white min-h-screen font-sans selection:bg-[#e50914]/30">
      
      {/* 1. Refined Minimalist Hero */}
      <section className="relative pt-44 pb-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/[0.03]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-[#e50914]/5 to-transparent pointer-events-none"></div>
        
        <AnimatedSection className="max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-10 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[#e50914] rounded-full"></span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">Secure Communication Interface</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-white mb-12 uppercase">
            Start a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Conversation.</span>
          </h1>
          
          <p className="text-lg md:text-xl font-light text-slate-400 max-w-2xl leading-relaxed">
            We architect digital ecosystems for global leaders. Reach out to initiate a strategic partnership and redefine your industry presence.
          </p>
        </AnimatedSection>
      </section>

      {/* 2. Global Connectivity Nodes (Detailed) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { label: "General Inquiries", value: "mehefujalim@gmail.com", action: "mailto:mehefujalim@gmail.com", icon: "fa-envelope" },
            { label: "Rapid Response", value: "+91 83919 77901", action: "https://wa.me/918391977901", icon: "fa-whatsapp" },
            { label: "Global HQ", value: "Durgapur, India", action: "#", icon: "fa-location-dot" }
          ].map((node, i) => (
            <AnimatedSection key={i} delay={i * 100} className="group">
              <div className="p-10 rounded-[2rem] bg-white/[0.01] border border-white/5 transition-all duration-500 hover:border-[#e50914]/30 hover:bg-white/[0.02]">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-8 group-hover:border-[#e50914]/50 transition-colors">
                  <i className={`fas ${node.icon} text-slate-500 group-hover:text-[#e50914] transition-colors`}></i>
                </div>
                <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-3">{node.label}</p>
                <a href={node.action} className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">{node.value}</a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 3. The Refined Transmission Form (Full Width Layout) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.03]">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          <div>
            <AnimatedSection>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-tight">
                Project <br /> <span className="text-[#e50914]">Parameters.</span>
              </h2>
              <div className="space-y-12">
                <p className="text-slate-400 font-light text-lg leading-relaxed">
                  Every project at Aura Media begins with a transmission of core objectives. Please provide your mission details so we can assign the correct engineering team.
                </p>
                <div className="pt-10 border-t border-white/5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Current Capacity</h4>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                      Onboarding Active
                    </div>
                    <p className="text-xs text-slate-500">Latency: 24h Response</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div>
            <AnimatedSection delay={200}>
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative">
                    <input 
                      type="text" name="name" id="name" required value={formData.name} onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#e50914] peer transition-colors font-light" placeholder=" "
                    />
                    <label htmlFor="name" className="absolute left-0 top-4 text-slate-500 text-xs transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#e50914] peer-focus:font-bold uppercase tracking-[0.2em] peer-valid:-top-6 peer-valid:text-[10px]">
                      Your Designation
                    </label>
                  </div>
                  <div className="relative">
                    <input 
                      type="email" name="email" id="email" required value={formData.email} onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#e50914] peer transition-colors font-light" placeholder=" "
                    />
                    <label htmlFor="email" className="absolute left-0 top-4 text-slate-500 text-xs transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#e50914] peer-focus:font-bold uppercase tracking-[0.2em] peer-valid:-top-6 peer-valid:text-[10px]">
                      Secure Email Address
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <select 
                    name="budget" id="budget" value={formData.budget} onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-slate-300 focus:outline-none focus:border-[#e50914] transition-colors appearance-none font-light cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#020202]">Scale of Investment</option>
                    <option value="s" className="bg-[#020202]">$2k - $5k</option>
                    <option value="m" className="bg-[#020202]">$5k - $15k</option>
                    <option value="l" className="bg-[#020202]">$15k+ (Enterprise)</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-0 top-6 text-slate-600 text-[10px] pointer-events-none"></i>
                </div>

                <div className="relative">
                  <textarea 
                    name="message" id="message" required rows="4" value={formData.message} onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#e50914] peer transition-colors resize-none font-light" placeholder=" "
                  ></textarea>
                  <label htmlFor="message" className="absolute left-0 top-4 text-slate-500 text-xs transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#e50914] peer-focus:font-bold uppercase tracking-[0.2em] peer-valid:-top-6 peer-valid:text-[10px]">
                    Mission Parameters
                  </label>
                </div>

                <button 
                  type="submit" disabled={status === "loading" || status === "success"}
                  className="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-[11px] rounded-full hover:bg-[#e50914] hover:text-white transition-all duration-500 disabled:opacity-50 hover:shadow-[0_10px_40px_rgba(229,9,20,0.3)]"
                >
                  {status === "loading" ? "Transmitting..." : status === "success" ? "Transmission Secured" : "Initialize Connection"}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4. Post-Contact Protocol (Bottom Detailed Section) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.03]">
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { title: "Strategic Discovery", desc: "A detailed 15-minute diagnostic call to evaluate your technical debt and growth goals." },
            { title: "Architecture Proposal", desc: "Our engineers present a bespoke roadmap, including tech stack, timeline, and ROI projections." },
            { title: "Secure Deployment", desc: "We initialize our private development environments and commence the build lifecycle." }
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 150}>
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-[#e50914] uppercase tracking-widest">Protocol 0{i+1}</span>
                <h4 className="text-xl font-bold tracking-tight">{item.title}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

    </main>
  );
}