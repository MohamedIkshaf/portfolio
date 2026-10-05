"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  GitBranch,
  Globe,
  Mail,
  Heart,
  Terminal,
} from "lucide-react";
import { navLinks } from "@/lib/constants";

export function Footer({ settings }: { settings?: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#fbf9ef] dark:bg-[#121210] border-t border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)]">
      {/* =========================================================
          SIGNATURE ZIMMY ELECTRIC PURPLE CTA BANNER
         ========================================================= */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-12 pb-16">
        <div className="rounded-[32px] p-8 sm:p-12 md:p-16 bg-[#5f1cfc] text-white shadow-[0_20px_40px_-8px_rgba(95,28,252,0.4)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-white mb-4">
              <Sparkles size={12} className="text-[#ffae00]" />
              <span>LET'S BUILD TOGETHER</span>
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
              YOUR PRODUCT DESERVES EXCEPTIONAL CODE & DESIGN.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              From conception to deployment, I build modern software that is fast, resilient, and beautiful to use.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#1a1a1a] font-heading font-extrabold text-sm tracking-wide hover:bg-[#fbf9ef] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <span>Start a Project</span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Main Footer Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-16 pb-12 border-b border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)]">
          {/* Brand info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1a1a1a] text-white shadow-sm">
                <Sparkles size={18} className="text-[#ffae00]" />
              </div>
              <span className="font-heading font-black text-xl tracking-tight text-[#1a1a1a] dark:text-[#fbf9ef]">
                DEV<span className="text-[#5f1cfc]">.</span>
              </span>
            </Link>

            <p className="text-sm text-[#555550] dark:text-[#c5c4b8] max-w-sm leading-relaxed">
              Full-Stack Software Engineer & Product Designer specializing in React, Next.js 15, TypeScript, and modern cloud architectures.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f4ea] dark:bg-[#242420] text-xs font-mono text-[#555550] dark:text-[#c5c4b8]">
              <span className="flex h-2 w-2 rounded-full bg-[#22c55e]" />
              <span>Available for select projects</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#888880] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[#1a1a1a] dark:text-[#fbf9ef] hover:text-[#5f1cfc] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Socials (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#888880] mb-4">
              Stay Connected
            </h4>
            <p className="text-xs text-[#555550] dark:text-[#c5c4b8] mb-4">
              Follow along for technical writeups, design explorations, and open-source contributions.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={settings?.githubUrl || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#5f1cfc] hover:text-white transition-all shadow-sm"
              >
                <GitBranch size={13} />
                <span>GitHub</span>
              </a>
              <a
                href={settings?.linkedinUrl || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#5f1cfc] hover:text-white transition-all shadow-sm"
              >
                <Globe size={13} />
                <span>LinkedIn</span>
              </a>
              {settings?.twitterUrl && (
                <a
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#5f1cfc] hover:text-white transition-all shadow-sm"
                >
                  <Globe size={13} />
                  <span>X (Twitter)</span>
                </a>
              )}
              {settings?.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#5f1cfc] hover:text-white transition-all shadow-sm"
                >
                  <Globe size={13} />
                  <span>YouTube</span>
                </a>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#5f1cfc] hover:text-white transition-all shadow-sm"
              >
                <Mail size={13} />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Status Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-[#888880]">
          <p>© {currentYear} Developer Portfolio. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Design by iks</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Built with <Heart size={12} className="text-[#ff352e] fill-current" /> in Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
