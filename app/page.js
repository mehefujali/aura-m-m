"use client";

import Head from "next/head";
import Hero from "./components/Hero";
import AboutEngine from "./components/AboutEngine";
import Services from "./components/Services";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import GoogleReviews from "./components/GoogleReviews";
import DigitalInsights from "./components/DigitalInsights";
import BookMeeting from "./components/BookMeeting";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Head>
        <title>Aura Media Marketing | Origin & Evolution</title>
        <meta
          name="description"
          content="We architect digital ecosystems for global leaders. Origin & Evolution of Aura Media Marketing."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-[#020202]">
        <Hero />
        <AboutEngine />
        <Services />
        <Process />
        {/* <DigitalInsights /> */}
        {/* <GoogleReviews /> */}
        {/* <Testimonials /> */}
        <BookMeeting />
        <Contact />
      </main>
    </>
  );
}