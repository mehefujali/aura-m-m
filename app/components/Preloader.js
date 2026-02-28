// /components/Preloader.js
"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const preloaderElement = document.getElementById('preloader');
    
    // GSAP Timeline for animations
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    const loadingCounter = { val: 0 };
    
    // Animation sequence
    tl.to(loadingCounter, {
        val: 100,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => {
            const percentageElement = document.getElementById('loading-percentage-display');
            if(percentageElement) {
                percentageElement.textContent = `${Math.round(loadingCounter.val)}%`;
            }
        }
    })
    .fromTo('#preloader-logo', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.75)' }, 0)
    .to('#loading-percentage-display', { opacity: 1, duration: 1 }, 0)
    .fromTo('.preloader-text', { opacity: 0, y: '100%' }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 0.5)
    .to(['.preloader-text', '#preloader-logo', '#loading-percentage-display'], { 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power2.in',
        stagger: -0.2
     }, '+=0.5')
    .to(preloaderElement, {
        y: '-100%',
        duration: 1,
        ease: 'power3.inOut',
        onComplete: () => {
             if(preloaderElement) preloaderElement.style.display = 'none';
        }
    }, "-=0.5");
  }, [onComplete]);

  return (
    <div id="preloader" className="fixed top-0 left-0 w-full h-screen bg-[var(--deep-space)] z-[99999] flex justify-center items-center flex-col text-[var(--off-white-glow)] overflow-hidden">
      <Image 
        id="preloader-logo" 
        src="/logo.png" // /public/logo.png file must exist
        alt="DevsafeX Logo" 
        width={80} 
        height={80}
        priority={true} // Helps with loading performance
        className="opacity-0 transform scale-80"
      />
      <div className="preloader-text-wrapper mt-4">
        <div className="preloader-text font-orbitron text-lg tracking-[0.2em] uppercase opacity-0 transform translate-y-full">
          Booting DevsafeX OS...
        </div>
      </div>
      <div id="loading-percentage-display" className="font-orbitron absolute bottom-[10%] text-2xl opacity-0">
        0%
      </div>
    </div>
  );
};

export default Preloader;
