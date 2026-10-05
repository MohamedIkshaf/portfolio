"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Sparkles,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { AnimatedCounter } from "@/components/animations/animated-counter";

type HeroProps = {
  projectCount?: number;
  settings?: any;
  latestProject?: {
    title: string;
    techStack?: string[];
  } | null;
};

export function HeroSection({
  projectCount = 0,
  settings,
  latestProject,
}: HeroProps) {
  const resumeUrl = settings?.resumeUrl || "/resume.pdf";
  const roleSubtitle = settings?.heroSubtitle || "Full-Stack Software Engineer & UI Craftsman";

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden dot-pattern"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* =========================================
              LEFT COLUMN: MAIN DISPLAY BENTO CARD (8 cols)
             ========================================= */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 bento-card p-6 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden bg-white dark:bg-[#1a1a18]"
          >
            {/* Top Status Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                </span>
                <span>Open to work · Available now</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-mono text-[#888880]">
                <Globe size={12} className="text-[#5f1cfc]" />
                <span>GLOBAL // REMOTE</span>
              </div>
            </div>

            {/* Signature Stacked Giant Zimmy Typography */}
            <div className="mb-8">
              <div className="flex flex-col select-none">
                <span className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.04em] leading-[0.88] text-[#1a1a1a] dark:text-[#fbf9ef]">
                  DESIGN
                </span>
                <span className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.04em] leading-[0.88] text-stroke">
                  THAT
                </span>
                <span className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.04em] leading-[0.88] text-[#5f1cfc]">
                  SCALES<span className="text-[#ffae00]">.</span>
                </span>
              </div>
            </div>

            {/* Role Badge + Subtitle */}
            <div className="space-y-4 mb-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffae00]/15 border border-[#ffae00]/30 text-[#b37700] dark:text-[#ffae00] text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} className="text-[#ff9500]" />
                <span>{roleSubtitle}</span>
              </div>

              <p className="text-base sm:text-lg text-[#555550] dark:text-[#c5c4b8] leading-relaxed">
                Transforming ambitious concepts into lightning-fast, production-grade web applications.
                Specialized in <strong className="text-[#1a1a1a] dark:text-[#fbf9ef] font-semibold">React</strong>,{" "}
                <strong className="text-[#1a1a1a] dark:text-[#fbf9ef] font-semibold">Next.js 15</strong>,{" "}
                <strong className="text-[#1a1a1a] dark:text-[#fbf9ef] font-semibold">TypeScript</strong>, and scalable cloud architectures.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a1a1a] text-white text-sm font-semibold tracking-wide hover:bg-[#5f1cfc] transition-all duration-300 shadow-sm hover:shadow-[0_8px_24px_-4px_rgba(95,28,252,0.4)]"
              >
                <span>Explore Projects</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.12)] dark:border-[rgba(251,249,239,0.12)] text-[#1a1a1a] dark:text-[#fbf9ef] text-sm font-semibold hover:bg-white dark:hover:bg-[#2e2e28] transition-all"
                >
                  <Download size={16} className="text-[#888880]" />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Dynamic Status Footer inside Main Card */}
            <div className="pt-6 border-t border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#5f1cfc] animate-pulse" />
                <span className="text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef]">
                  {latestProject ? "Active Project:" : "Status:"}
                </span>
                <span className="text-xs text-[#555550] dark:text-[#c5c4b8]">
                  {latestProject ? latestProject.title : "Building Modern Web Applications"}
                </span>
              </div>

              {latestProject?.techStack && latestProject.techStack.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {latestProject.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-[#fbf9ef] dark:bg-[#242420] text-[10px] font-mono text-[#888880] border border-[rgba(26,26,26,0.06)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* =========================================
              RIGHT COLUMN: BENTO CARDS STACK (4 cols)
             ========================================= */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Card 1: Warm Amber Gradient Card */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[28px] p-6 sm:p-7 text-white gradient-amber shadow-[0_12px_32px_-4px_rgba(255,174,0,0.3)] relative overflow-hidden flex flex-col justify-between min-h-[200px]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase">
                  ✦ STATUS: READY
                </span>
                <Zap size={22} className="text-white opacity-90" />
              </div>

              <div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl leading-tight mb-2">
                  Building products with speed & design precision.
                </h3>
                <p className="text-xs text-white/90">
                  Ready to take on new full-stack engineering challenges and product builds.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold">
                <span>Available for projects</span>
                <ArrowUpRight size={16} />
              </div>
            </motion.div>

            {/* Card 2: Stats Bento Card */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bento-card p-6 bg-white dark:bg-[#1a1a18]"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)]">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#fbf9ef]">
                    <AnimatedCounter target={projectCount > 0 ? projectCount : 1} suffix="+" />
                  </div>
                  <div className="text-[11px] font-medium text-[#888880] mt-0.5">
                    Shipped Projects
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)]">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#5f1cfc]">
                    <AnimatedCounter target={4} suffix="+" />
                  </div>
                  <div className="text-[11px] font-medium text-[#888880] mt-0.5">
                    Years Experience
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)]">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#1a1a1a] dark:text-[#fbf9ef]">
                    99.9%
                  </div>
                  <div className="text-[11px] font-medium text-[#888880] mt-0.5">
                    Code Reliability
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)]">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#ffae00]">
                    100%
                  </div>
                  <div className="text-[11px] font-medium text-[#888880] mt-0.5">
                    Remote Worldwide
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Electric Purple "Let's Talk" Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[28px] p-6 sm:p-7 bg-[#5f1cfc] text-white shadow-[0_12px_32px_-4px_rgba(95,28,252,0.35)] flex flex-col justify-between min-h-[170px]"
            >
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase opacity-80">
                  LET'S COLLABORATE
                </span>
                <h3 className="font-heading font-extrabold text-2xl mt-1 leading-snug">
                  Have an ambitious project in mind?
                </h3>
              </div>

              <div className="mt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1a1a1a] text-xs font-bold hover:bg-[#fbf9ef] transition-colors shadow-sm"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
