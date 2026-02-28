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
      title: "Post Not Found | NexorZen",
      description: "The requested article could not be found.",
    };
  }

  // Generating description from content for SEO
  const plainTextContent = post.content.replace(/[^a-zA-Z0-9 ]/g, " ");
  const excerpt = plainTextContent.substring(0, 160).trim() + "...";

  const keywords = [
    post.category,
    "Website Development Agency",
    "Enterprise Software",
    "Tech Journal",
    post.author,
    "NexorZen",
    ...(post.tags || []),
  ];

  const imageUrl = post.coverImage
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${post.coverImage}`
    : "https://www.nexorzen.com/og-image.png";

  const postUrl = `https://www.nexorzen.com/blogs/${slug}`;

  return {
    title: `${post.title} | NexorZen Insights`,
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
      siteName: "NexorZen",
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

  const postUrl = `https://www.nexorzen.com/blogs/${slug}`;
  const imageUrl = post.coverImage
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${post.coverImage}`
    : "https://www.nexorzen.com/og-image.png";

  const readingTime = calculateReadingTime(post.content);

  // --- Advanced JSON-LD Schema (Article + Breadcrumb) ---
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
          "@id": "https://www.nexorzen.com/#organization",
          name: "NexorZen",
          logo: {
            "@type": "ImageObject",
            url: "https://i.ibb.co/kshWGbCV/Artboard-5.png",
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
            item: "https://www.nexorzen.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: "https://www.nexorzen.com/blogs",
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
      <main className="bg-[#02040a] text-white font-sans selection:bg-[#00cdf3]/30 min-h-screen">

        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#00cdf3_0%,transparent_50%)] opacity-[0.05] pointer-events-none"></div>

          <div className="container mx-auto px-5 sm:px-8 max-w-5xl relative z-10 text-center">
            <div className="mb-6 flex justify-center">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00cdf3]/30 bg-[#00cdf3]/10 backdrop-blur-xl text-[10px] sm:text-xs font-bold text-[#00cdf3] tracking-[0.2em] uppercase transition-colors hover:bg-[#00cdf3]/20"
              >
                <i className="fas fa-arrow-left"></i> Back to All Blogs
              </Link>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8 text-balance drop-shadow-[0_0_15px_rgba(0,205,243,0.15)]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white border border-white/10">
                  {post.author.charAt(0)}
                </div>
                <span>Author: <span className="text-white">{post.author}</span></span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>
              <div className="flex items-center gap-2">
                <i className="far fa-calendar-alt text-[#00cdf3]"></i>
                <span>Published: {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>
              <div className="flex items-center gap-2">
                <i className="far fa-clock text-[#00cdf3]"></i>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Content Setup (Grid Layout) --- */}
        <section className="py-16 md:py-24 px-5 sm:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

              {/* --- Main Article Body --- */}
              <div className="w-full lg:w-2/3">
                {post.coverImage && (
                  <div className="w-full relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl shadow-black/50 group">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 text-xs font-bold text-black bg-[#00cdf3] rounded-full uppercase tracking-wider shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                )}

                <article className="prose prose-invert prose-lg md:prose-xl max-w-none text-slate-300
                  prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight
                  prose-a:text-[#00cdf3] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-blockquote:border-l-[#00cdf3] prose-blockquote:bg-white/[0.02] prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-200
                  prose-pre:bg-[#050914] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-xl
                  prose-img:rounded-3xl prose-img:border prose-img:border-white/5
                  prose-li:marker:text-[#00cdf3]"
                >
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {post.content}
                  </ReactMarkdown>
                </article>

                {/* Tags Section */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-white/10 flex items-center flex-wrap gap-3">
                    <span className="text-sm font-bold text-white uppercase tracking-wider mr-2">Tags:</span>
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-300 bg-white/[0.03] border border-white/10 rounded-full">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* --- Sticky Sidebar --- */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-8">

                {/* Author Info Card */}
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Author Profile</div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00cdf3] to-indigo-500 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{post.author}</h3>
                      <p className="text-sm text-[#00cdf3]">Engineering Team</p>
                    </div>
                  </div>
                  <p className="text-slate-400 font-light text-sm leading-relaxed">
                    A member of NexorZen&apos;s elite architecture team, specializing in complex software and scalable digital infrastructure.
                  </p>
                </div>

                {/* Share Article Card */}
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Share This Article</div>
                  <div className="flex gap-4">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 transition-all hover:bg-[#00cdf3] hover:text-black hover:border-[#00cdf3] hover:-translate-y-1"
                    >
                      <i className="fab fa-twitter text-lg"></i>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 transition-all hover:bg-[#00cdf3] hover:text-black hover:border-[#00cdf3] hover:-translate-y-1"
                    >
                      <i className="fab fa-linkedin-in text-lg"></i>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 transition-all hover:bg-[#00cdf3] hover:text-black hover:border-[#00cdf3] hover:-translate-y-1"
                    >
                      <i className="fab fa-facebook-f text-lg"></i>
                    </a>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="p-8 rounded-3xl bg-gradient-to-b from-[#00cdf3]/10 to-transparent border border-[#00cdf3]/20 backdrop-blur-xl text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">Need Enterprise Digital Solutions?</h3>
                  <p className="text-slate-400 text-sm mb-6">Consult with our engineering experts today.</p>
                  <Link href="/book-a-meeting" className="inline-block w-full py-3.5 text-sm font-bold text-black bg-[#00cdf3] rounded-full hover:bg-white transition-colors">
                    Book a Consultation
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