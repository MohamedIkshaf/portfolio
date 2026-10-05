"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, ArrowUpRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-8",
        isScrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Brand Monogram */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1a1a1a] text-white shadow-sm transition-all group-hover:bg-[#5f1cfc]">
            <Sparkles size={18} className="text-[#ffae00] transition-transform group-hover:rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base tracking-tight text-[#1a1a1a] dark:text-[#fbf9ef] leading-tight">
              DEV<span className="text-[#5f1cfc]">.</span>
            </span>
            <span className="text-[11px] font-medium text-[#888880] tracking-wider uppercase">
              Engineer & Designer
            </span>
          </div>
        </Link>

        {/* Center Floating Pill Navigation (Zimmy signature pill) */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#1a1a18]/90 backdrop-blur-md border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] shadow-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200",
                  isActive
                    ? "text-[#1a1a1a] dark:text-[#fbf9ef] bg-[#f5f4ea] dark:bg-[#242420]"
                    : "text-[#555550] dark:text-[#c5c4b8] hover:text-[#1a1a1a] dark:hover:text-[#fbf9ef] hover:bg-[#fbf9ef]/80"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Quick Search */}
          <button
            onClick={() => {
              const event = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
                bubbles: true,
              });
              document.dispatchEvent(event);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium text-[#555550] dark:text-[#c5c4b8] bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] hover:border-[#1a1a1a]/30 transition-all shadow-sm"
            title="Search (⌘K)"
          >
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#f5f4ea] dark:bg-[#242420] text-[10px] font-mono text-[#888880]">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-[#555550] dark:text-[#c5c4b8] hover:text-[#1a1a1a] dark:hover:text-[#fbf9ef] transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          {/* Signature CTA Pill Button */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1a1a1a] text-white text-xs font-semibold tracking-wide hover:bg-[#5f1cfc] transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_-4px_rgba(95,28,252,0.4)]"
          >
            <span>Book a call</span>
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] text-[#555550]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2.5 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] text-[#1a1a1a] dark:text-[#fbf9ef] shadow-sm"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 rounded-3xl bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] p-5 shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-3 rounded-2xl text-sm font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#f5f4ea] dark:hover:bg-[#242420] transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 mt-2 border-t border-[rgba(26,26,26,0.08)] flex flex-col gap-2">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#5f1cfc] text-white text-sm font-semibold shadow-sm"
                >
                  <span>Book a call</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
