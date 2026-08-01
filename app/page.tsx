"use client";

import { sourGummy } from "./fonts";
import { cn } from "../utils";
import Navbar from "./components/layouts/Navbar";
import Hero from "./components/home/Hero";
import Footer from "./components/layouts/Footer";
import Features from "./components/home/Features";
import FAQs from "./components/home/Faqs";


export default function Home() {

  return (
    <>
      <Navbar />
      <Hero />
      {/* RECENT LINKS */}
      <div className="w-full max-w-[1200px] mx-auto -pt-[80px] pb-[40px] px-6">
        <div></div>
      </div>
      <Features />
      <FAQs />
      <Footer />
    </>
  );
}
