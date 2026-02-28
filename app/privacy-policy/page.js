"use client";

import React, { useEffect, useRef, useState } from "react";

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
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-cyan-400 mb-4">{title}</h2>
    <div className="text-gray-300 leading-relaxed space-y-4">{children}</div>
  </div>
);

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#040919] text-white">
      <section className="relative py-24 lg:py-32 text-center overflow-hidden border-b border-cyan-400/20">
        <div className="relative z-10 p-6">
          <AnimatedSection>
            <h1
              className="text-4xl sm:text-6xl font-bold text-white mt-4"
              style={{ textShadow: "0 0 15px rgba(0, 205, 243, 0.5)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-400 mt-4">
              Last Updated: August 18, 2025
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <LegalContent title="Introduction">
              <p>
                {`At NexorZen ("we", "us", "our"), protecting your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website (nexorzen.com). By using our services, you agree to the terms described in this policy.`}
              </p>
            </LegalContent>

            <LegalContent title="Information We Collect">
              <p>We may collect various types of information, including:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Personal Information:</strong> When you fill out our
                  contact form or book a meeting, we collect information such as
                  your name, email address, and phone number.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may collect information on how
                  you use our website, such as your IP address, browser type,
                  and the pages you visit.
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="How Your Information Is Used">
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>To provide and manage our services for you.</li>
                <li>To answer your questions and communicate with you.</li>
                <li>To improve our website and services.</li>
                <li>
                  To send you relevant marketing information, if you consent.
                </li>
              </ul>
            </LegalContent>

            <LegalContent title="Data Security">
              <p>
                We are committed to keeping your personal information secure. We
                have implemented various technical and organizational security
                measures to prevent unauthorized access or disclosure. However,
                no method of transmission over the Internet is 100% secure.
              </p>
            </LegalContent>

            <LegalContent title="Your Rights">
              <p>
                You have certain rights regarding your personal information. You
                can request a copy of your data, ask us to correct any
                inaccuracies, or request the deletion of your information.
              </p>
            </LegalContent>

            <LegalContent title="Contact Us">
              <p>
                If you have any questions about this Privacy Policy, please{" "}
                <a href="/contact" className="text-cyan-400 hover:underline">
                  contact us
                </a>
                .
              </p>
            </LegalContent>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
