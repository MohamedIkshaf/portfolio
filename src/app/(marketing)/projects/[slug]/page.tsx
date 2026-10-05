import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, GitBranch, ExternalLink, Calendar, Sparkles, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/actions/project.actions";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#fbf9ef] dark:bg-[#121210]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-[#555550] dark:text-[#c5c4b8] hover:text-[#1a1a1a] dark:hover:text-[#fbf9ef] transition-colors mb-8 shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to projects</span>
        </Link>

        {/* Hero Banner Bento */}
        <div className="bento-card p-6 sm:p-10 md:p-12 bg-white dark:bg-[#1a1a18] mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbf9ef] dark:bg-[#242420] text-xs font-mono font-bold text-[#5f1cfc] border border-[rgba(26,26,26,0.06)]">
              <span>CASE STUDY</span>
            </div>
            <span className="text-xs font-mono text-[#888880] flex items-center gap-1.5">
              <Calendar size={13} />
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
              }).format(new Date(project.createdAt))}
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#1a1a1a] dark:text-[#fbf9ef] mb-4 leading-[1.05]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#555550] dark:text-[#c5c4b8] max-w-3xl leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1a1a] text-white text-xs font-bold hover:bg-[#5f1cfc] transition-colors shadow-sm"
              >
                <span>Launch Live Demo</span>
                <ExternalLink size={13} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fbf9ef] dark:bg-[#242420] border border-[rgba(26,26,26,0.1)] text-xs font-bold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-white transition-colors"
              >
                <GitBranch size={13} />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Cover Image if present */}
        {project.coverImage && (
          <div className="bento-card overflow-hidden mb-8 bg-white dark:bg-[#1a1a18] p-2">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Tech Stack & Features (8 cols) */}
          <div className="md:col-span-8 space-y-5">
            {project.features && project.features.length > 0 && (
              <div className="bento-card p-6 sm:p-8 bg-white dark:bg-[#1a1a18]">
                <h3 className="font-heading font-bold text-xl text-[#1a1a1a] dark:text-[#fbf9ef] mb-5 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#ffae00]" />
                  <span>Key Features & Functional Deliverables</span>
                </h3>
                <div className="space-y-3">
                  {project.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#555550] dark:text-[#c5c4b8]">
                      <CheckCircle2 size={16} className="text-[#22c55e] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.architecture && (
              <div className="bento-card p-6 sm:p-8 bg-white dark:bg-[#1a1a18]">
                <h3 className="font-heading font-bold text-xl text-[#1a1a1a] dark:text-[#fbf9ef] mb-3">
                  System Architecture & Implementation
                </h3>
                <p className="text-sm text-[#555550] dark:text-[#c5c4b8] leading-relaxed whitespace-pre-line">
                  {project.architecture}
                </p>
              </div>
            )}

            {project.challenges && (
              <div className="bento-card p-6 sm:p-8 bg-white dark:bg-[#1a1a18] border-l-4 border-l-[#ffae00]">
                <h3 className="font-heading font-bold text-lg text-[#1a1a1a] dark:text-[#fbf9ef] mb-2 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-[#ffae00]" />
                  <span>Technical Challenges & Resolution</span>
                </h3>
                <p className="text-sm text-[#555550] dark:text-[#c5c4b8] leading-relaxed whitespace-pre-line">
                  {project.challenges}
                </p>
              </div>
            )}

            {project.lessons && (
              <div className="bento-card p-6 sm:p-8 bg-white dark:bg-[#1a1a18] border-l-4 border-l-[#22c55e]">
                <h3 className="font-heading font-bold text-lg text-[#1a1a1a] dark:text-[#fbf9ef] mb-2 flex items-center gap-2">
                  <Lightbulb size={18} className="text-[#22c55e]" />
                  <span>Key Takeaways & Lessons Learned</span>
                </h3>
                <p className="text-sm text-[#555550] dark:text-[#c5c4b8] leading-relaxed whitespace-pre-line">
                  {project.lessons}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar (4 cols) */}
          <div className="md:col-span-4 space-y-5">
            {project.techStack && project.techStack.length > 0 && (
              <div className="bento-card p-6 bg-white dark:bg-[#1a1a18]">
                <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#888880] mb-4">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#fbf9ef] dark:bg-[#242420] text-[#1a1a1a] dark:text-[#fbf9ef] border border-[rgba(26,26,26,0.06)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-[28px] p-6 bg-[#5f1cfc] text-white shadow-md">
              <h4 className="font-heading font-bold text-lg mb-2">
                Want a similar solution?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                I can help architect and build your product from design prototype to production scale.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1a1a1a] text-xs font-bold hover:bg-[#fbf9ef] transition-colors"
              >
                <span>Book a Call</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
