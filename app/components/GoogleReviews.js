"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const StarRating = ({ rating }) => {
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <i
                    key={i}
                    className={`fas fa-star text-[10px] sm:text-xs ${i < rating ? 'text-yellow-400' : 'text-slate-700'}`}
                ></i>
            ))}
        </div>
    );
};

export default function GoogleReviews() {
    const [data, setData] = useState({ reviews: [], rating: 5, totalRatings: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/reviews');
                if (!response.ok) throw new Error('Failed');
                const result = await response.json();
                if (result.reviews) {
                    setData(result);
                } else {
                    throw new Error('No reviews found');
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

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

        if (sectionRef.current) observer.observe(sectionRef.current);
        const currentRef = sectionRef.current;
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    if (error || (!loading && data.reviews.length === 0)) return null;

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden bg-[#020202] border-t border-white/[0.03] font-sans">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 1rem)); }
                }
                .review-track {
                    display: flex;
                    width: max-content;
                    animation: marquee 50s linear infinite;
                }
                .review-track:hover {
                    animation-play-state: paused;
                }
            `}} />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

            <div className="container mx-auto px-5 sm:px-8 relative z-10 mb-16 max-w-7xl">
                <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 transition-all duration-1000 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="max-w-2xl text-left">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl mb-6 shadow-[0_0_15px_rgba(229,9,20,0.05)]">
                            <i className="fab fa-google text-xs text-white"></i>
                            <span className="text-[11px] sm:text-[12px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                                Verified Reputation
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
                            Digital <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.2)]">Insights.</span>
                        </h2>
                    </div>

                    {!loading && (
                        <div className="flex items-center gap-6 bg-white/[0.01] border border-white/5 px-8 py-5 rounded-[2rem] backdrop-blur-3xl shadow-xl transition-all duration-500 hover:border-[#e50914]/30 hover:bg-white/[0.02]">
                            <p className="text-5xl font-black text-white tracking-tighter">{data.rating.toFixed(1)}</p>
                            <div className="flex flex-col gap-1">
                                <StarRating rating={Math.round(data.rating)} />
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Aggregate Score</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={`relative w-full overflow-hidden transition-all duration-1000 delay-200 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none"></div>

                <div className="review-track gap-8 px-8">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="w-[350px] md:w-[450px] h-[250px] rounded-[2.5rem] bg-white/[0.01] border border-white/[0.03] animate-pulse shrink-0"></div>
                        ))
                    ) : (
                        [...data.reviews, ...data.reviews].map((review, idx) => (
                            <div
                                key={`${review.time}-${idx}`}
                                className="w-[350px] md:w-[450px] shrink-0 p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl transition-all duration-500 hover:bg-white/[0.03] hover:border-[#e50914]/20 flex flex-col justify-between group cursor-default shadow-lg"
                            >
                                <div>
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex items-center gap-5">
                                            {review.profile_photo_url ? (
                                                <Image src={review.profile_photo_url} alt={review.author_name} width={48} height={48} className="w-12 h-12 rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-lg">
                                                    {review.author_name.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-bold text-white tracking-widest uppercase">{review.author_name}</p>
                                                <p className="text-[10px] text-[#e50914] font-bold mt-1 uppercase tracking-widest opacity-80">{review.relative_time_description}</p>
                                            </div>
                                        </div>
                                        <i className="fab fa-google text-slate-700 text-xl group-hover:text-[#e50914] transition-all duration-500"></i>
                                    </div>
                                    <StarRating rating={review.rating} />
                                </div>

                                <p className="mt-8 text-sm text-slate-400 font-light leading-relaxed line-clamp-4 text-balance">
                                    {`"${review.text}"`}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}