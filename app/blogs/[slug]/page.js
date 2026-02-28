import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

// --- Data Fetch Function ---
async function getPost(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
      { next: { revalidate: 3600 } } // Revalidate cache every hour
    );
    if (!res.ok) return null;
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

// --- Reading Time Calculation Logic ---
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
};

// --- Enterprise-Level Dynamic SEO Metadata Generation ---
export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Aura Media",
      description: "The requested article could not be found.",
    };
  }

  const plainTextContent = post.content.replace(/[^a-zA-Z0-9 ]/g, " ");
  const excerpt = plainTextContent.substring(0, 160).trim() + "...";

  const keywords = [
    post.category,
    "Website Development Agency",
    "Enterprise Software",
    "Tech Journal",
    post.author,
    "Aura Media Marketing",
    ...(post.tags || []),
  ];

  const imageUrl = post.coverImage
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${post.coverImage}`
    : "https://www.auramediamarketing.com/og-image.png";

  const postUrl = `https://www.auramediamarketing.com/blogs/${slug}`;

  return {
    title: `${post.title} | Aura Media Journal`,
    description: excerpt,
    keywords: keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: excerpt,
      url: postUrl,
      siteName: "Aura Media Marketing",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt || post.createdAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: excerpt,
      images: [imageUrl],
    },
  };
}

// --- Main Server Component ---
export default async function BlogDetailsPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://www.auramediamarketing.com/blogs/${slug}`;
  const imageUrl = post.coverImage
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${post.coverImage}`
    : "https://www.auramediamarketing.com/og-image.png";

  const readingTime = calculateReadingTime(post.content);

  // --- Advanced JSON-LD Schema ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}/#article`,
        headline: post.title,
        image: imageUrl,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://www.auramediamarketing.com/#organization",
          name: "Aura Media Marketing",
          logo: {
            "@type": "ImageObject",
            url: "https://www.auramediamarketing.com/logo.png",
          },
        },
        datePublished: post.createdAt,
        dateModified: post.updatedAt || post.createdAt,
        description: post.content.substring(0, 160).replace(/\s+/g, " ").trim(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.auramediamarketing.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: "https://www.auramediamarketing.com/blogs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[#020202] text-white font-sans selection:bg-[#e50914]/30 min-h-screen">

        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden border-b border-white/[0.05]">
          {/* Subtle Red Ambient Glow */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#e50914]/10 rounded-full blur-[200px] pointer-events-none"></div>

          <div className="container mx-auto px-5 sm:px-8 max-w-5xl relative z-10 text-center">
            <div className="mb-10 flex justify-center">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[10px] sm:text-xs font-bold text-slate-300 tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#e50914]/10 hover:border-[#e50914]/50 hover:text-white"
              >
                <i className="fas fa-arrow-left"></i> Back to Journal
              </Link>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-8 text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                  {post.author.charAt(0)}
                </div>
                <span>By <span className="text-white">{post.author}</span></span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#e50914]"></div>
              <div className="flex items-center gap-2">
                <i className="far fa-calendar-alt text-[#e50914]"></i>
                <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#e50914]"></div>
              <div className="flex items-center gap-2">
                <i className="far fa-clock text-[#e50914]"></i>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Content Setup (Grid Layout) --- */}
        <section className="py-16 md:py-24 px-5 sm:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

              {/* --- Main Article Body --- */}
              <div className="w-full lg:w-2/3">
                {post.coverImage && (
                  <div className="w-full relative h-[350px] md:h-[500px] rounded-[2rem] overflow-hidden mb-16 border border-white/5 bg-white/[0.02] group">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 ease-[0.16,1,0.3,1]"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 text-[10px] font-bold text-white bg-[#020202]/80 backdrop-blur-md border border-white/10 rounded-full uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Refined Prose Typography */}
                <article className="prose prose-invert prose-lg md:prose-xl max-w-none text-slate-300 font-light leading-relaxed
                  prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight prose-headings:mb-6 prose-headings:mt-12
                  prose-a:text-[#e50914] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-blockquote:border-l-[#e50914] prose-blockquote:bg-white/[0.02] prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-200 prose-blockquote:border-l-4
                  prose-pre:bg-[#050505] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-2xl prose-pre:text-sm
                  prose-img:rounded-2xl prose-img:border prose-img:border-white/5
                  prose-li:marker:text-[#e50914]"
                >
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {post.content}
                  </ReactMarkdown>
                </article>

                {/* Tags Section */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-16 pt-8 border-t border-white/5 flex items-center flex-wrap gap-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mr-3">Tags:</span>
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-4 py-1.5 text-[11px] font-semibold text-slate-300 bg-white/[0.02] border border-white/10 rounded-full hover:border-[#e50914]/50 hover:text-white transition-colors cursor-pointer">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* --- Sticky Sidebar --- */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-8">

                {/* Author Info Card */}
                <div className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 backdrop-blur-xl hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Author Profile</div>
                  <div className="flex items-center gap-5 mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e50914] to-[#8B0000] flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_20px_rgba(229,9,20,0.3)]">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white tracking-tight">{post.author}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#e50914] mt-1">Lead Architect</p>
                    </div>
                  </div>
                  <p className="text-slate-400 font-light text-sm leading-relaxed">
                    A member of Aura Media&apos;s elite architecture team, specializing in complex enterprise software and scalable digital infrastructure.
                  </p>
                </div>

                {/* Share Article Card */}
                <div className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 backdrop-blur-xl hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Share This Article</div>
                  <div className="flex gap-4">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-[#e50914] hover:text-white hover:border-[#e50914] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(229,9,20,0.3)]"
                    >
                      <i className="fab fa-twitter text-lg"></i>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-[#e50914] hover:text-white hover:border-[#e50914] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(229,9,20,0.3)]"
                    >
                      <i className="fab fa-linkedin-in text-lg"></i>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 hover:bg-[#e50914] hover:text-white hover:border-[#e50914] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(229,9,20,0.3)]"
                    >
                      <i className="fab fa-facebook-f text-lg"></i>
                    </a>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="p-8 rounded-[2rem] bg-gradient-to-b from-[#e50914]/10 to-transparent border border-[#e50914]/20 backdrop-blur-xl text-center group">
                  <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Need Enterprise Digital Solutions?</h3>
                  <p className="text-slate-400 text-sm font-light mb-8 leading-relaxed">Consult with our engineering experts today and scale your infrastructure.</p>
                  <Link href="/book-a-meeting" className="inline-block w-full py-4 text-[11px] uppercase tracking-[0.2em] font-bold text-white bg-[#e50914] rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(229,9,20,0.2)] group-hover:shadow-[0_10px_30px_rgba(229,9,20,0.4)]">
                    Initiate Project
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// --- Generating paths for Static Generation (SSG) ---
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
    const result = await res.json();
    const posts = result.data || [];
    return posts.map((post) => ({
      slug: post._id,
    }));
  } catch (error) {
    console.error("Could not fetch posts for static generation:", error);
    return [];
  }
}