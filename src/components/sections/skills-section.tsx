"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import {
  Code2,
  Database,
  Sparkles,
  Layers,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    number: "01",
    title: "Full-Stack Web Development",
    description:
      "Architecting robust end-to-end applications from responsive React/Next.js frontends to resilient Node.js APIs and scalable relational database models.",
    icon: Code2,
    badge: "Core Strength",
  },
  {
    number: "02",
    title: "UI/UX & Design Systems",
    description:
      "Crafting accessible, 60fps micro-interactions, responsive layouts, and token-driven design systems inspired by Apple, Stripe, and Zimmy Designs.",
    icon: Layers,
    badge: "Design",
  },
  {
    number: "03",
    title: "Cloud & Database Architecture",
    description:
      "Designing type-safe database schemas with Prisma ORM, PostgreSQL, MongoDB, Redis caching, and automated CI/CD deployment pipelines on Vercel and AWS.",
    icon: Database,
    badge: "Infrastructure",
  },
  {
    number: "04",
    title: "Performance & SEO Optimization",
    description:
      "Pushing 100/100 Lighthouse metrics, sub-second TTFB, optimal Core Web Vitals, server-side caching, and structured schema metadata for maximum visibility.",
    icon: Zap,
    badge: "Performance",
  },
];

const categories = [
  { key: "FRONTEND", label: "Frontend" },
  { key: "BACKEND", label: "Backend" },
  { key: "DATABASE", label: "Database" },
  { key: "DEVOPS", label: "DevOps & Cloud" },
  { key: "TOOLS", label: "Tools & Workflow" },
];

type SkillItem = {
  id: string;
  name: string;
  proficiency: number;
  category: "FRONTEND" | "BACKEND" | "DATABASE" | "DEVOPS" | "TOOLS" | string;
  icon?: string | null;
  order?: number;
};

export function SkillsSection({ skills = [] }: { skills?: SkillItem[] }) {
  const [activeCategory, setActiveCategory] = useState("FRONTEND");

  // Group real skills by category
  const groupedSkills: Record<string, SkillItem[]> = categories.reduce((acc, cat) => {
    acc[cat.key] = skills.filter((s) => s.category === cat.key);
    return acc;
  }, {} as Record<string, SkillItem[]>);

  const activeSkills = groupedSkills[activeCategory] || [];

  return (
    <section id="skills" className="relative py-20 sm:py-28 bg-[#f5f4ea] dark:bg-[#161614] border-y border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col items-start mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-bold tracking-widest uppercase text-[#5f1cfc] mb-4 shadow-sm">
              <Sparkles size={13} className="text-[#ffae00]" />
              <span>CAPABILITIES & STACK</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#1a1a1a] dark:text-[#fbf9ef] max-w-3xl leading-[1.05]">
              Built for speed, crafted for <span className="text-[#5f1cfc]">longevity</span>.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#555550] dark:text-[#c5c4b8] max-w-2xl leading-relaxed">
              Every tool in my arsenal is selected with purpose. I deliver solutions that scale with zero compromise on engineering standards.
            </p>
          </div>
        </FadeIn>

        {/* Capabilities 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <FadeIn key={idx} delay={idx * 0.08}>
                <div className="bento-card p-6 sm:p-7 bg-white dark:bg-[#1a1a18] h-full flex flex-col justify-between group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-2xl font-black text-[#5f1cfc]">
                        {cap.number}
                      </span>
                      <div className="p-2 rounded-xl bg-[#fbf9ef] dark:bg-[#242420] text-[#1a1a1a] dark:text-[#fbf9ef] group-hover:bg-[#5f1cfc] group-hover:text-white transition-colors">
                        <Icon size={18} />
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#1a1a1a] dark:text-[#fbf9ef] mb-2.5">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-[#555550] dark:text-[#c5c4b8] leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#888880]">
                      {cap.badge}
                    </span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Real Skills Interactive Grid */}
        <FadeIn delay={0.2}>
          <div className="bento-card p-6 sm:p-10 bg-white dark:bg-[#1a1a18]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)]">
              <div>
                <h3 className="font-heading font-bold text-2xl text-[#1a1a1a] dark:text-[#fbf9ef]">
                  Technology Stack
                </h3>
                <p className="text-xs text-[#888880] mt-1">
                  Proficiencies and core libraries managed through the dashboard
                </p>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)]">
                {categories.map((cat) => {
                  const count = groupedSkills[cat.key]?.length || 0;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5",
                        activeCategory === cat.key
                          ? "bg-[#1a1a1a] dark:bg-[#fbf9ef] text-white dark:text-[#1a1a1a] shadow-sm"
                          : "text-[#555550] dark:text-[#c5c4b8] hover:text-[#1a1a1a] dark:hover:text-[#fbf9ef]"
                      )}
                    >
                      <span>{cat.label}</span>
                      {count > 0 && (
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.2 rounded-full font-mono",
                          activeCategory === cat.key ? "bg-white/20 text-white dark:bg-black/20 dark:text-black" : "bg-[#1a1a1a]/10 dark:bg-white/10"
                        )}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills Items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {activeSkills.length > 0 ? (
                  activeSkills.map((skill) => (
                    <div
                      key={skill.id || skill.name}
                      className="p-5 rounded-2xl bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)] flex flex-col justify-between hover:border-[#5f1cfc]/40 transition-colors"
                    >
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-heading font-bold text-sm text-[#1a1a1a] dark:text-[#fbf9ef]">
                            {skill.name}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#5f1cfc]">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>

                      <div className="h-1.5 w-full rounded-full bg-[rgba(26,26,26,0.08)] dark:bg-[rgba(251,249,239,0.1)] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-[#5f1cfc]"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center text-xs text-[#888880]">
                    No skills registered in this category yet. Add skills from the dashboard to display here.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
