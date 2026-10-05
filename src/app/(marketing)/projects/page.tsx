import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GitBranch, ExternalLink, Sparkles, ArrowUpRight } from "lucide-react";
import { getPublishedProjects } from "@/actions/project.actions";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of web development projects built with modern technologies.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#fbf9ef] dark:bg-[#121210]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-14">
          {/* <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-[#555550] dark:text-[#c5c4b8] hover:text-[#1a1a1a] dark:hover:text-[#fbf9ef] transition-colors mb-6 shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Back to home</span>
          </Link> */}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-bold tracking-widest uppercase text-[#5f1cfc] mb-4 shadow-sm">
            <Sparkles size={13} className="text-[#ffae00]" />
            <span>ARCHIVE & SHOWCASE</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl tracking-tight text-[#1a1a1a] dark:text-[#fbf9ef] mb-4">
            All <span className="text-[#5f1cfc]">Projects</span>.
          </h1>
          <p className="text-base sm:text-lg text-[#555550] dark:text-[#c5c4b8] max-w-2xl leading-relaxed">
            A comprehensive collection of applications, developer utilities, and experiments crafted with React, Next.js, and modern TypeScript architectures.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project: any, index: number) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block h-full"
            >
              <article className="bento-card p-6 sm:p-7 bg-white dark:bg-[#1a1a18] h-full flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-300 relative overflow-hidden">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    {project.featured ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#b37700] dark:text-[#ffae00] bg-[#ffae00]/15 px-2.5 py-1 rounded-full">
                        ★ Featured
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono font-bold text-[#5f1cfc] bg-[#5f1cfc]/10 px-2.5 py-1 rounded-md">
                        Project #{String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <span className="text-xs font-mono text-[#888880]">
                      {project.status || "COMPLETED"}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#1a1a1a] dark:text-[#fbf9ef] mb-2.5 group-hover:text-[#5f1cfc] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555550] dark:text-[#c5c4b8] mb-6 line-clamp-3 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack?.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-[#fbf9ef] dark:bg-[#242420] text-[#555550] dark:text-[#c5c4b8] border border-[rgba(26,26,26,0.06)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)] flex items-center justify-between text-xs text-[#888880]">
                    <div className="flex items-center gap-3">
                      {project.githubUrl && <GitBranch size={15} className="hover:text-[#1a1a1a]" />}
                      {project.liveUrl && <ExternalLink size={15} className="hover:text-[#1a1a1a]" />}
                    </div>

                    <span className="font-semibold text-[#5f1cfc] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      <span>View Case Study</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-[#888880] col-span-full py-16 text-center">
              No published projects yet. Check back soon!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
