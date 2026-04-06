// /app/components/BookMeeting.js
"use client";

import React from "react";
import { InlineWidget } from "react-calendly";

const BookMeeting = () => {
  return (
    <section id="book-meeting" className="bg-[#020202] py-24 lg:py-32 px-5 sm:px-8 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2
            className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6"
          >
             {` Secure your `}
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                Discovery.
             </span>
          </h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            {` Schedule a precision discovery session. Choose a slot that aligns with your timeline, and let's architect the future of your brand.`}
          </p>
        </div>

        <div className="max-w-5xl mx-auto p-4 md:p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Calendly Inline Widget */}
          <InlineWidget
            url="https://calendly.com/saiffbhaiii/30min" // Placeholder based on email, can be updated later
            styles={{
              height: "750px",
              borderRadius: "2rem",
            }}
            pageSettings={{
              backgroundColor: "020202",
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: "e50914",
              textColor: "ffffff",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BookMeeting;
