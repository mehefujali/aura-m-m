"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || apiUrl;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${apiUrl}/blogs`);
        if (res.ok) {
          const data = await res.json();
          setBlogs(data.data || []);
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    if (apiUrl) fetchBlogs(); else setLoading(false);
  }, [apiUrl]);

  // Featured blog is the first one
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const standardBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <main className="bg-[#020202] text-white min-h-screen font-sans selection:bg-[#e50914]/30">
      
      {/* Refined Premium Header */}
      <section className="relative pt-44 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#e50914]/10 rounded-full blur-[180px] pointer-events-none z-0"></div>
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <span className="w-8 h-[1px] bg-[#e50914]"></span>
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#e50914] uppercase">Aura Media Journal</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-white mb-8 relative z-10 text-balance">
            Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#e50914]">Insights.</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-slate-400 max-w-2xl leading-relaxed relative z-10 text-balance">
            Thoughts, engineering breakthroughs, and architectural paradigms from our elite team of developers and strategists.
          </p>
        </AnimatedSection>
      </section>

      {/* Featured Masterpiece Article */}
      {!loading && featuredBlog && (
        <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-24">
          <AnimatedSection delay={200}>
            <Link href={`/blogs/${featuredBlog.slug}`} className="group relative block w-full rounded-3xl overflow-hidden border border-white/5 bg-white/[0.01] transition-all duration-700 hover:border-[#e50914]/30 hover:shadow-[0_10px_40px_rgba(229,9,20,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent z-10"></div>
              
              <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden">
                <Image 
                  width={1600} height={900} 
                  src={`${imageBaseUrl}${featuredBlog.coverImage}`} 
                  alt={featuredBlog.title} 
                  className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[0.16,1,0.3,1]"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="px-3 py-1.5 rounded-full border border-[#e50914]/50 bg-[#e50914]/10 text-[#e50914] text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                      Featured Report
                    </span>
                    <span className="text-[11px] font-medium text-slate-300 uppercase tracking-widest">
                      {new Date(featuredBlog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#e50914] transition-all duration-500 text-balance">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-base text-slate-300 font-light line-clamp-2 max-w-2xl leading-relaxed">
                    {featuredBlog.excerpt || "Dive deep into our latest architectural discoveries and engineering paradigms that are reshaping the digital landscape."}
                  </p>
                </div>
                
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-[#e50914] group-hover:border-[#e50914] transition-all duration-500 shadow-lg">
                    <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-lg"></i>
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        </section>
      )}

      {/* Grid for Standard Articles */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-32">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"></div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[450px] bg-white/[0.02] rounded-3xl border border-white/5 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardBlogs.map((blog, idx) => (
              <AnimatedSection key={blog._id} delay={(idx % 3) * 100}>
                <Link href={`/blogs/${blog.slug}`} className="group flex flex-col h-full bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.02] hover:border-[#e50914]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(229,9,20,0.05)]">
                  <div className="relative w-full aspect-[16/10] overflow-hidden grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 border-b border-white/5">
                    <Image 
                      width={600} height={400} 
                      src={`${imageBaseUrl}${blog.coverImage}`} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#020202]/80 backdrop-blur-md border border-white/10 rounded-full">
                       <p className="text-[9px] text-white font-bold uppercase tracking-widest">{blog.readTime || "5 Min Read"}</p>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-[10px] font-bold text-[#e50914] uppercase tracking-[0.2em] mb-3">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                    <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug tracking-tight mb-4 group-hover:text-[#e50914] transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <p className="text-slate-400 font-light text-sm leading-relaxed line-clamp-3 mb-8 flex-grow">
                      {blog.excerpt || "Explore the detailed documentation and insights on this topic provided by our engineering and design team."}
                    </p>
                    <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors">Read Article</span>
                      <i className="fas fa-arrow-right text-slate-500 group-hover:text-[#e50914] transform group-hover:translate-x-1 transition-all duration-300"></i>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>

      {/* Refined Newsletter Section */}
      <section className="relative py-24 px-6 overflow-hidden border-t border-white/5 bg-[#030303]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none"></div>
        <AnimatedSection className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-envelope-open-text text-2xl text-[#e50914]"></i>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 text-balance">
            Join the <span className="text-[#e50914]">Vanguard.</span>
          </h2>
          <p className="text-base md:text-lg font-light text-slate-400 mb-10 text-balance leading-relaxed">
            Subscribe to our intelligence briefing. Get exclusive architectural blueprints, UI/UX trends, and enterprise engineering strategies delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="w-full sm:w-2/3 px-6 py-4 bg-[#050505] border border-white/10 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] transition-all font-light"
            />
            <button type="submit" className="w-full sm:w-1/3 px-6 py-4 bg-white text-black font-bold uppercase tracking-widest text-[11px] rounded-full hover:bg-[#e50914] hover:text-white hover:shadow-[0_5px_20px_rgba(229,9,20,0.3)] transition-all duration-300">
              Subscribe
            </button>
          </form>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-6">Zero Spam. Unsubscribe at any time.</p>
        </AnimatedSection>
      </section>

    </main>
  );
}