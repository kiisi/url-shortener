"use client";

import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary blue gradient blob */}
      <div
        className="animate-float-1 absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(57,100,254,0.4) 0%, rgba(57,100,254,0) 70%)",
        }}
      />

      {/* Secondary indigo blob */}
      <div
        className="animate-float-2 absolute bottom-10 -left-16 w-64 h-64 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0) 70%)",
        }}
      />

      {/* Small accent circle */}
      <div
        className="animate-float-3 absolute top-1/3 right-1/4 w-20 h-20 rounded-full opacity-20"
        style={{ background: "rgba(57,100,254,0.3)" }}
      />

      {/* Geometric shapes */}
      <div className="animate-spin-slow absolute top-20 left-1/4">
        <div
          className="w-12 h-12 rounded-lg rotate-45 opacity-10"
          style={{ background: "#3964FE" }}
        />
      </div>

      <div className="animate-float-2 absolute bottom-1/3 right-16">
        <div
          className="w-8 h-8 rounded-full opacity-15 border-2"
          style={{ borderColor: "#3964FE" }}
        />
      </div>
    </div>
  );
}

function BrandPanel() {
  return (
    <div className="hidden lg:flex relative w-full max-w-[480px] xl:max-w-[560px] flex-col items-center justify-center overflow-hidden rounded-r-2xl bg-gradient-to-br from-[#3964FE] via-[#2b50d9] to-[#1e3a8a] p-12">
      {/* Decorative overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float-1 absolute top-16 right-16 w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20" />
        <div className="animate-float-2 absolute bottom-24 left-12 w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20" />
        <div className="animate-float-3 absolute top-1/3 left-20 w-12 h-12 rounded-lg bg-white/5 border border-white/10" />
        <div className="animate-spin-slow absolute bottom-1/3 right-24 w-8 h-8 rounded-full border-2 border-white/20" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 text-center"
      >
        {/* Link icon illustration */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </div>

        <h2 className="mb-3 text-2xl font-bold text-white">
          Shorten. Share. Track.
        </h2>
        <p className="text-sm leading-relaxed text-white/70 max-w-[280px] mx-auto">
          Create powerful short links with analytics, custom domains, and team
          collaboration — all in one place.
        </p>

        {/* Stats row */}
        <div className="mt-10 flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10M+</div>
            <div className="text-xs text-white/50 mt-1">Links Created</div>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50K+</div>
            <div className="text-xs text-white/50 mt-1">Active Users</div>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-xs text-white/50 mt-1">Uptime</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white auth-grid-bg overflow-hidden">
      {/* Background gradient blobs */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(57,100,254,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(57,100,254,0.03) 0%, transparent 50%)",
        }}
      />

      <FloatingShapes />

      {/* Main container */}
      <div className="relative z-10 flex w-full max-w-[1040px] items-stretch gap-0 px-4 py-8 sm:px-6 lg:px-8">
        {/* Form side */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[500px]">{children}</div>
        </div>

        {/* Brand panel — desktop only */}
        <BrandPanel />
      </div>

      {/* Bottom branding */}
      {/* <div className="fixed bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-paragraph/40">
          © {new Date().getFullYear()} MiniURL. All rights reserved.
        </p>
      </div> */}
    </div>
  );
}
