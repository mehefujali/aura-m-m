"use client";

import React from "react";

const FloatingButtons = () => {
  const phoneNumber = "+919239536545"; // Apnar original number

  // Premium professional message
  const message = "Hi Aura Media Team! I'm interested in discussing an enterprise project.";
  const encodedMessage = encodeURIComponent(message);

  const whatsappLink = `https://wa.me/919239536545?text=${encodedMessage}`;
  const callLink = `tel:${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">
      
      {/* --- WhatsApp Button --- */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-lg transition-all duration-300 hover:bg-[#25D366]/10 hover:border-[#25D366]/50 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        {/* Subtle Ping Animation to draw attention */}
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/20 opacity-75 group-hover:hidden"></span>
        
        <i className="fab fa-whatsapp text-2xl text-slate-300 group-hover:text-[#25D366] transition-colors duration-300 relative z-10"></i>
        
        {/* Hover Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#020202]/90 border border-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-md translate-x-4 group-hover:translate-x-0">
          Chat With Us
        </span>
      </a>

      {/* --- Phone Call Button --- */}
      <a 
        href={callLink} 
        className="group relative flex items-center justify-center w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-lg transition-all duration-300 hover:bg-[#e50914]/10 hover:border-[#e50914]/50 hover:scale-110"
        aria-label="Call Now"
      >
        <i className="fas fa-phone text-xl text-slate-300 group-hover:text-[#e50914] transition-colors duration-300 relative z-10"></i>
        
        {/* Hover Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#020202]/90 border border-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-md translate-x-4 group-hover:translate-x-0">
          Call Directly
        </span>
      </a>

    </div>
  );
};

export default FloatingButtons;