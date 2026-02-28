"use client";

import React, { useEffect, useState, useRef } from 'react';

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
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    if (error || (!loading && data.reviews.length === 0)) return null;

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden bg-[#02040a] border-t border-white/5">
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

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-cyan-900/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

            <div className="container mx-auto px-5 sm:px-8 relative z-10 mb-16 max-w-7xl">
                <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 transition-all duration-1000 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl mb-6">
                            <i className="fab fa-google text-xs text-white"></i>
                            <span className="text-[11px] sm:text-[12px] font-medium text-slate-300 tracking-[0.1em] uppercase">
                                Verified Client Reviews
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
                            Trusted by global <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-500">industry leaders.</span>
                        </h2>
                    </div>

                    {!loading && (
                        <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 px-6 py-4 rounded-2xl backdrop-blur-xl">
                            <p className="text-4xl font-semibold text-white">{data.rating.toFixed(1)}</p>
                            <div className="flex flex-col gap-1">
                                <StarRating rating={Math.round(data.rating)} />
                                <p className="text-xs text-slate-400 font-medium">Based on {data.totalRatings} reviews</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={`relative w-full overflow-hidden transition-all duration-1000 delay-200 ease-[0.16,1,0.3,1] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#02040a] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#02040a] to-transparent z-20 pointer-events-none"></div>

                <div className="review-track gap-6 px-6">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="w-[350px] md:w-[420px] h-[220px] rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse shrink-0"></div>
                        ))
                    ) : (
                        [...data.reviews, ...data.reviews].map((review, idx) => (
                            <div
                                key={`${review.time}-${idx}`}
                                className="w-[350px] md:w-[420px] shrink-0 p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] hover:border-cyan-500/30 flex flex-col justify-between group cursor-default"
                            >
                                <div>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            {review.profile_photo_url ? (
                                                <img src={review.profile_photo_url} alt={review.author_name} className="w-10 h-10 rounded-full" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-semibold">
                                                    {review.author_name.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-medium text-white">{review.author_name}</p>
                                                <p className="text-[10px] text-slate-500 mt-0.5">{review.relative_time_description}</p>
                                            </div>
                                        </div>
                                        <i className="fab fa-google text-slate-600 opacity-50 text-xl group-hover:text-cyan-400 group-hover:opacity-100 transition-colors duration-300"></i>
                                    </div>
                                    <StarRating rating={review.rating} />
                                </div>

                                <p className="mt-6 text-sm text-slate-400 font-light leading-relaxed line-clamp-4 text-balance">
                                    {review.text}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}