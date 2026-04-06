// /components/Contact.js
"use client";

import React, { useEffect, useRef, useState } from "react";

const Contact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    // Section-er jonno reveal animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Sending...");
    // Mock API call
    setTimeout(() => {
      setFormStatus("Message sent successfully!");
      setTimeout(() => setFormStatus(""), 5000); // 5 sec por message chole jabe
    }, 1500);
  };

  // Animation style function
  const animateStyle = (index) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(50px)",
    transition: "opacity 1s ease-out, transform 1s ease-out",
    transitionDelay: `${index * 150}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#020202] py-24 lg:py-32 px-5 sm:px-8 relative overflow-hidden font-sans border-t border-white/[0.03]"
    >
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="max-w-5xl mx-auto p-10 md:p-16 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-2xl shadow-2xl">
          <div className="text-center mb-16">
            <h2
              className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6"
              style={animateStyle(0)}
            >
             {` Initiate your `}
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                Legacy.
             </span>
            </h2>
            <p
              className="text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed"
              style={animateStyle(1)}
            >
              Have an enterprise vision or an architectural challenge? Reach out to our elite team of digital strategists today.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div style={animateStyle(2)}>
                  <label htmlFor="name" className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/10 text-white placeholder-slate-600 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] focus:outline-none transition-all duration-500"
                  />
                </div>
                <div style={animateStyle(3)}>
                  <label htmlFor="email" className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/10 text-white placeholder-slate-600 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] focus:outline-none transition-all duration-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div style={animateStyle(4)}>
                  <label htmlFor="service" className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Select Service</label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-[#050505] border border-white/10 text-white focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] focus:outline-none transition-all duration-500 appearance-none"
                  >
                    <option value="" disabled selected>Select a Service</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Design Studio">Design Studio</option>
                    <option value="Combination">Combination</option>
                  </select>
                </div>
                <div style={animateStyle(5)}>
                  <label htmlFor="budget" className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Project Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-[#050505] border border-white/10 text-white focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] focus:outline-none transition-all duration-500 appearance-none"
                  >
                    <option value="" disabled selected>Select Budget Range</option>
                    <option value="$0-$500">$0 - $500</option>
                    <option value="$500-$2k">$500 - $2k</option>
                    <option value="$2k+">$2k +</option>
                  </select>
                </div>
              </div>

              <div style={animateStyle(6)}>
                <label htmlFor="message" className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Message Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  placeholder="Tell us about your project"
                  className="w-full px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/10 text-white placeholder-slate-600 resize-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] focus:outline-none transition-all duration-500"
                ></textarea>
              </div>

              <div style={animateStyle(7)}>
                <button
                  type="submit"
                  className="w-full px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white bg-[#e50914] rounded-2xl transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(229,9,20,0.5)] flex items-center justify-center gap-3"
                >
                  Send Inquiry <i className="fas fa-paper-plane text-xs"></i>
                </button>
                {formStatus && (
                  <p className="text-center mt-6 text-[#e50914] font-bold uppercase tracking-widest text-xs animate-pulse">
                    {formStatus}
                  </p>
                )}
              </div>
            </form>

            {/* Direct Contact Info */}
            <div className="lg:col-span-1 border-l border-white/5 mx-auto hidden lg:block h-full"></div>
            
            <div className="lg:col-span-4 space-y-12">
              <div className="group" style={animateStyle(8)}>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Direct Channel</p>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-[#e50914]/10 group-hover:border-[#e50914]/20 group-hover:shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                    <i className="fas fa-envelope text-lg text-slate-400 group-hover:text-[#e50914] transition-colors"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold tracking-tight">Email Correspondence</h4>
                    <a href="mailto:saiffbhaiii@gmail.com" className="text-slate-400 hover:text-[#e50914] transition-colors text-sm font-light">saiffbhaiii@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="group" style={animateStyle(9)}>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Operational Status</p>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-[#e50914]/10 group-hover:border-[#e50914]/20 group-hover:shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                    <i className="fab fa-whatsapp text-lg text-slate-400 group-hover:text-[#e50914] transition-colors"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold tracking-tight">Immediate Inquiry</h4>
                    <a href="https://wa.me/8801815782432" className="text-slate-400 hover:text-[#e50914] transition-colors text-sm font-light">+880 181 578 2432</a>
                  </div>
                </div>
              </div>

              <div className="group" style={animateStyle(10)}>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Headquarters</p>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-[#e50914]/10 group-hover:border-[#e50914]/20 group-hover:shadow-[0_0_15_px_rgba(229,9,20,0.2)]">
                    <i className="fas fa-map-marker-alt text-lg text-slate-400 group-hover:text-[#e50914] transition-colors"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold tracking-tight">Global Operations</h4>
                    <p className="text-slate-400 text-sm font-light">Available Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
