// /components/Testimonials.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Testimonials-er data
const testimonialsData = [
  {
    quote:
      "The AI-powered tools have completely streamlined our workflow. Tasks that used to take hours now take minutes. It's like having an extra team member.",
    name: "Marvin McKinney",
    title: "Founder",
    company: "Waverio",
    // Placeholder images are used to avoid broken links
    clientImage: "https://placehold.co/100x100/040919/00cdf3?text=MM",
  },
  {
    quote:
      "We’ve seen a huge boost in productivity since working with DevsafeX. The platform they built is not just functional, it's game-changing.",
    name: "Kathryn Murphy",
    title: "CEO",
    company: "TechNova",
    clientImage: "https://placehold.co/100x100/040919/00cdf3?text=KM",
  },
  {
    quote:
      "Seamless integration and top-notch support. Our team's efficiency has skyrocketed, and the results speak for themselves.",
    name: "Albert Flores",
    title: "CTO",
    company: "InnoSoft",
    clientImage: "https://placehold.co/100x100/040919/00cdf3?text=AF",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Autoplay functionality for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 6000); // 6 second por por slide change hobe

    return () => clearInterval(interval);
  }, []);

  // Scroll animation for the section
  useEffect(() => {
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

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-[#020202] py-24 lg:py-32 px-5 sm:px-8 relative overflow-hidden font-sans border-t border-white/[0.03]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10 text-center">
        <div
          className="max-w-3xl mx-auto mb-16 md:mb-24 transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e50914]"></span>
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">Testimonials</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.95]">
            Trusted by <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                Global Leaders.
            </span>
          </h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Explore the results of our strategic digital engineering through the lens of those who lead the markets.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto min-h-[500px]">
          {/* Testimonial Cards */}
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-[1.2s] ease-[0.16,1,0.3,1]"
              style={{
                opacity: activeIndex === index ? 1 : 0,
                zIndex: activeIndex === index ? 10 : 1,
                transform: activeIndex === index ? "scale(1) rotate(0deg)" : "scale(0.95) rotate(-1deg)",
                filter: activeIndex === index ? "blur(0)" : "blur(10px)"
              }}
            >
              <div className="p-10 md:p-16 flex items-center justify-center h-full bg-white/[0.01] border border-white/5 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl group">
                <div className="max-w-3xl text-center">
                  <div className="relative inline-block mb-10">
                    <div className="absolute inset-0 bg-[#e50914]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                      src={testimonial.clientImage}
                      alt={testimonial.name}
                      width={96}
                      height={96}
                      className="rounded-full mx-auto relative z-10 grayscale group-hover:grayscale-0 transition-all duration-700 border-2 border-white/10 p-1"
                    />
                  </div>
                  
                  <i className="fas fa-quote-left text-4xl text-[#e50914]/20 mb-8 block"></i>
                  
                  <blockquote className="text-xl md:text-3xl text-white font-light italic leading-snug tracking-tight mb-10 text-balance">
                    {`"${testimonial.quote}"`}
                  </blockquote>

                  <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-[#e50914] font-bold tracking-[0.2em] uppercase">
                    {testimonial.title} @ {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Controls */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === index ? "w-10 h-1.5 bg-[#e50914]" : "w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
