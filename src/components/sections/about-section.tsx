"use client";

import Image from "next/image";
import { Briefcase, GraduationCap, Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  location?: string | null;
  startDate: Date | string;
  endDate?: Date | string | null;
  description?: string | null;
  current?: boolean;
};

type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  location?: string | null;
  startDate: Date | string;
  endDate?: Date | string | null;
  description?: string | null;
};

function formatPeriod(start: Date | string, end?: Date | string | null, current?: boolean) {
  const startYear = new Date(start).getFullYear();
  if (current) return `${startYear} — Present`;
  if (!end) return `${startYear}`;
  const endYear = new Date(end).getFullYear();
  return `${startYear} — ${endYear}`;
}

export function AboutSection({
  experiences = [],
  educations = [],
  settings,
}: {
  experiences?: ExperienceItem[];
  educations?: EducationItem[];
  settings?: any;
}) {
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-[#fbf9ef] dark:bg-[#121210]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header with Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          <FadeIn className="lg:col-span-7">
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-bold tracking-widest uppercase text-[#5f1cfc] mb-4 shadow-sm">
                <Sparkles size={13} className="text-[#ffae00]" />
                <span>ABOUT & EXPERTISE</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#1a1a1a] dark:text-[#fbf9ef] max-w-3xl leading-[1.05]">
                Turning complex vision into <span className="text-[#5f1cfc]">elegant software</span> and delightful UX.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#555550] dark:text-[#c5c4b8] max-w-2xl leading-relaxed">
                {settings?.aboutText ||
                  "I specialize in bridging the gap between rigorous engineering and refined visual design. My goal is to craft digital products that not only work seamlessly under heavy load, but feel intuitive and polished in every interaction."}
              </p>
            </div>
          </FadeIn>

          {/* Portrait Image */}
          <FadeIn delay={0.15} className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group w-64 sm:w-72 lg:w-full max-w-sm">
              {/* Decorative accent behind portrait */}
              <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-[#5f1cfc]/20 via-[#ffae00]/10 to-[#5f1cfc]/5 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-[28px] border-2 border-white/80 dark:border-[#2a2a28] shadow-2xl shadow-[#5f1cfc]/10">
                <Image
                  src="/images/about-portrait.jpg"
                  alt="Portrait"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover aspect-[4/5]"
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 384px"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a1a1a]/60 to-transparent" />
                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#ffae00] animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-[#5f1cfc]" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Real Experience Bento Card (8 Cols) */}
          <FadeIn className="lg:col-span-8">
            <div className="bento-card p-6 sm:p-9 bg-white dark:bg-[#1a1a18] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5f1cfc]/10 text-[#5f1cfc]">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-[#1a1a1a] dark:text-[#fbf9ef]">
                        Work Experience
                      </h3>
                      <span className="text-xs text-[#888880]">Track record in engineering production apps</span>
                    </div>
                  </div>
                  {experiences.length > 0 && (
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#fbf9ef] dark:bg-[#242420] text-[#888880]">
                      {experiences.length} RECORD{experiences.length > 1 ? "S" : ""}
                    </span>
                  )}
                </div>

                {experiences.length > 0 ? (
                  <div className="space-y-8">
                    {experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="group relative pl-6 border-l-2 border-[#1a1a1a]/15 dark:border-[#fbf9ef]/20 transition-all hover:border-[#5f1cfc]"
                      >
                        <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-white dark:bg-[#1a1a18] border-2 border-[#5f1cfc]" />
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <h4 className="font-heading font-bold text-lg text-[#1a1a1a] dark:text-[#fbf9ef]">
                            {exp.title}
                          </h4>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#f5f4ea] dark:bg-[#242420] text-[#555550] dark:text-[#c5c4b8]">
                            {formatPeriod(exp.startDate, exp.endDate, exp.current)}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-[#5f1cfc] mb-2">
                          {exp.company} {exp.location ? `· ${exp.location}` : ""}
                        </div>
                        {exp.description && (
                          <p className="text-sm text-[#555550] dark:text-[#c5c4b8] leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-[#888880]">
                    No experience records added yet. Add experiences in the admin dashboard.
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Education & Philosophy Cards (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Education Card */}
            <FadeIn delay={0.1}>
              <div className="bento-card p-6 sm:p-7 bg-white dark:bg-[#1a1a18]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffae00]/15 text-[#ff9500]">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#1a1a1a] dark:text-[#fbf9ef]">
                      Education
                    </h3>
                    <span className="text-xs text-[#888880]">Academic Foundation</span>
                  </div>
                </div>

                {educations.length > 0 ? (
                  educations.map((edu) => (
                    <div key={edu.id} className="space-y-2 mb-4 last:mb-0">
                      <span className="inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#f5f4ea] dark:bg-[#242420] text-[#888880]">
                        {formatPeriod(edu.startDate, edu.endDate)}
                      </span>
                      <h4 className="font-heading font-bold text-base text-[#1a1a1a] dark:text-[#fbf9ef]">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-semibold text-[#5f1cfc]">
                        {edu.institution} {edu.location ? `· ${edu.location}` : ""}
                      </p>
                      {edu.description && (
                        <p className="text-xs text-[#555550] dark:text-[#c5c4b8] pt-1 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-[#888880] py-4">
                    No education records added yet.
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Engineering Principles Card */}
            <FadeIn delay={0.2}>
              <div className="rounded-[28px] p-6 sm:p-7 bg-[#1a1a1a] text-white shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#ffae00]">
                    CORE PHILOSOPHY
                  </span>
                  <h4 className="font-heading font-extrabold text-xl mt-1 mb-3">
                    Fast. Accessible. Scalable.
                  </h4>
                  <p className="text-xs text-[#c5c4b8] leading-relaxed">
                    Great software begins with clean architecture, strict typing, and empathetic user experience. No bloatware, no shortcuts.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#888880]">
                  <span>Always learning & shipping</span>
                  <span className="text-[#ffae00]">✦ ✦ ✦</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
