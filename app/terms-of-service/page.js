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

export default function TermsOfServicePage() {
  return (
    <main className="bg-[#040919] text-white">
      <section className="relative py-24 lg:py-32 text-center overflow-hidden border-b border-cyan-400/20">
        <div className="relative z-10 p-6">
          <AnimatedSection>
            <h1
              className="text-4xl sm:text-6xl font-bold text-white mt-4"
              style={{ textShadow: "0 0 15px rgba(0, 205, 243, 0.5)" }}
            >
              Terms of Service
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
            <LegalContent title="Agreement to Terms">
              <p>
                {`Thank you for using the NexorZen website ("Site"). By accessing
                or using this Site, you agree to be bound by these Terms of
                Service ("Terms"). If you do not agree with these Terms, please
                do not use our Site.`}
              </p>
            </LegalContent>

            <LegalContent title="Use of Our Website">
              <p>
                {` You are permitted to use our Site for lawful purposes only. You
                may not engage in any activity that could harm our Site or
                interfere with others' use of it. Spamming, hacking, or any form
                of illegal activity is strictly prohibited.`}
              </p>
            </LegalContent>

            <LegalContent title="Intellectual Property">
              <p>
                All content on this Site, such as text, graphics, logos, and
                images, is the property of NexorZen and is protected by
                copyright law. You may not use, reproduce, or distribute any
                part of this Site for commercial purposes without our written
                permission.
              </p>
            </LegalContent>

            <LegalContent title="Limitation of Liability">
              <p>
                While we strive to provide accurate and up-to-date information,
                we do not guarantee the accuracy or completeness of any
                information. NexorZen will not be liable for any direct or
                indirect damages resulting from your use of our Site.
              </p>
            </LegalContent>

            <LegalContent title="Changes to Terms">
              <p>
                {` We reserve the right to modify these Terms at any time. If
                changes are made, we will update the "Last Updated" date on this
                page. It is your responsibility to review this page
                periodically.`}
              </p>
            </LegalContent>

            <LegalContent title="Contact Us">
              <p>
                If you have any questions about these Terms, please{" "}
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
