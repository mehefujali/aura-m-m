"use client";

import Head from "next/head";
import Hero from "./components/Hero";
import AboutEngine from "./components/AboutEngine";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Head>
        <title>Aura Media Marketing | Digital Strategy & Branding</title>
        <meta
          name="description"
          content="Welcome to Aura Media Marketing, where strong strategies meet honest results."
        />
        <meta
          name="keywords"
          content="Aura Media Marketing, digital marketing, SEO, branding, web development"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Aura Media Marketing" />
        <meta
          property="og:description"
          content="We believe in growing your brand the right way, with respect, creativity, and results that last."
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aura Media Marketing" />
        <meta
          name="twitter:description"
          content="We believe in growing your brand the right way, with respect, creativity, and results that last."
        />
      </Head>

      <main className="bg-black">
        <Hero />
        <AboutEngine />
        <Services />
      </main>
    </>
  );
}