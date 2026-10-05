"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  GitBranch,
  Sparkles,
  Check,
  X,
  ArrowUpRight,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";

type ProjectItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string | null;
  techStack?: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured?: boolean;
  createdAt: Date | string;
  category?: { name: string } | null;
};

const comparisons = [
  {
    typical: "Delivers code that functions, but ignores micro-interactions and mobile ergonomics.",
    withMe: "Obsesses over design fidelity, 60fps fluid transitions, and tactile user feedback.",
  },
  {
    typical: "Disorganized commit histories, loose any types, and unmaintainable spaghetti code.",
    withMe: "Strict TypeScript, modular clean architecture, and comprehensive type guarantees.",
  },
  {
    typical: "Reactive communication, vague status reports, and missed target milestones.",
    withMe: "Proactive Loom/Slack demos, transparent roadmap tracking, and reliable delivery.",
  },
  {
    typical: "Hands over the repository and disappears without setup guides or maintenance support.",
    withMe: "Detailed documentation, automated CI/CD deployments, and post-launch stability support.",
  },
];

export function ProjectsSection({ projects = [] }: { projects?: ProjectItem[] }) {
  return (
    <section id="projects" className="relative py-20 sm:py-28 bg-[#fbf9ef] dark:bg-[#121210]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-bold tracking-widest uppercase text-[#5f1cfc] mb-4 shadow-sm">
                <Sparkles size={13} className="text-[#ffae00]" />
                <span>FEATURED WORK</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#1a1a1a] dark:text-[#fbf9ef] leading-[1.05]">
                Crafted with <span className="text-[#5f1cfc]">precision</span> & code excellence.
              </h2>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.1)] dark:border-[rgba(251,249,239,0.12)] text-xs font-bold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#f5f4ea] dark:hover:bg-[#242420] transition-all shadow-sm shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>

        {/* Real Projects List */}
        {projects.length > 0 ? (
          <div className="space-y-6 mb-20">
            {projects.map((project, index) => (
              <FadeIn key={project.id || project.slug} delay={index * 0.1}>
                <div className="bento-card p-6 sm:p-10 bg-white dark:bg-[#1a1a18] relative overflow-hidden group hover:border-[#5f1cfc]/40 transition-all">
                  {/* Number Watermark */}
                  <div className="absolute top-4 right-8 font-heading font-black text-7xl sm:text-9xl text-[#1a1a1a]/[0.03] dark:text-[#fbf9ef]/[0.03] select-none pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.08)] text-[11px] font-bold tracking-wider uppercase text-[#5f1cfc]">
                          {project.category?.name || "Full Stack"}
                        </span>
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#b37700] dark:text-[#ffae00] bg-[#ffae00]/15 px-2.5 py-1 rounded-full">
                            ★ FEATURED
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-[#888880]">
                        {new Date(project.createdAt).getFullYear()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      <div className={project.coverImage ? "lg:col-span-8" : "lg:col-span-12"}>
                        <h3 className="font-heading font-black text-2xl sm:text-4xl text-[#1a1a1a] dark:text-[#fbf9ef] mb-3 group-hover:text-[#5f1cfc] transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm sm:text-base text-[#555550] dark:text-[#c5c4b8] max-w-3xl mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech stack pills */}
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 rounded-lg bg-[#fbf9ef] dark:bg-[#242420] text-xs font-mono text-[#555550] dark:text-[#c5c4b8] border border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Optional cover image thumbnail */}
                      {project.coverImage && (
                        <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] relative aspect-video bg-[#fbf9ef] dark:bg-[#242420]">
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                    </div>

                    {/* Links Row */}
                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)]">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1a1a1a] text-white text-xs font-semibold hover:bg-[#5f1cfc] transition-colors"
                        >
                          <span>Live Preview</span>
                          <ExternalLink size={13} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.1)] text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-white dark:hover:bg-[#2e2e28] transition-colors"
                        >
                          <GitBranch size={13} />
                          <span>Source Code</span>
                        </a>
                      )}

                      <Link
                        href={`/projects/${project.slug}`}
                        className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#5f1cfc] hover:underline"
                      >
                        <span>Read Case Study</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="bento-card p-12 text-center bg-white dark:bg-[#1a1a18] mb-20">
            <FolderOpen size={40} className="mx-auto text-[#888880] mb-4 opacity-50" />
            <h3 className="font-heading font-bold text-xl text-[#1a1a1a] dark:text-[#fbf9ef] mb-2">
              No Published Projects Yet
            </h3>
            <p className="text-sm text-[#555550] dark:text-[#c5c4b8] max-w-md mx-auto mb-6">
              Projects published through your admin dashboard will automatically appear here with case studies, tech stacks, and live links.
            </p>
            <Link
              href="/dashboard/projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5f1cfc] text-white text-xs font-bold shadow-sm"
            >
              <span>Manage Projects in Dashboard</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Signature Comparison Matrix */}
        <FadeIn delay={0.2}>
          <div className="bento-card p-6 sm:p-10 md:p-12 bg-white dark:bg-[#1a1a18]">
            <div className="max-w-2xl mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffae00]/15 text-[#b37700] dark:text-[#ffae00] text-xs font-bold uppercase tracking-wider mb-3">
                <span>✦ THE DIFFERENCE</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-4xl text-[#1a1a1a] dark:text-[#fbf9ef]">
                Not your typical developer.
              </h3>
              <p className="text-sm text-[#555550] dark:text-[#c5c4b8] mt-2">
                Why forward-thinking teams and startups choose to work with me.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comparisons.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)] flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3 pb-4 mb-4 border-b border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.08)]">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff352e]/10 text-[#ff352e] shrink-0 mt-0.5">
                      <X size={14} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#888880] block mb-0.5">
                        Typical Workflow
                      </span>
                      <p className="text-xs text-[#888880] line-through leading-relaxed">
                        {item.typical}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22c55e]/15 text-[#22c55e] shrink-0 mt-0.5">
                      <Check size={14} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#5f1cfc] font-bold block mb-0.5">
                        With Me
                      </span>
                      <p className="text-xs font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] leading-relaxed">
                        {item.withMe}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
