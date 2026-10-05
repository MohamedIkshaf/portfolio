"use client";

import { ArrowRight, Clock, Calendar, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";

type BlogItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  readingTime?: number | null;
  createdAt: Date | string;
  publishedAt?: Date | string | null;
  featured?: boolean;
  category?: { name: string } | null;
  tags?: any;
};

function formatBlogDate(dateStr: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function BlogSection({ blogs = [] }: { blogs?: BlogItem[] }) {
  // If there are no published blogs yet, we can show a subtle placeholder or skip
  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="relative py-20 sm:py-28 bg-[#f5f4ea] dark:bg-[#161614] border-t border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] text-xs font-bold tracking-widest uppercase text-[#5f1cfc] mb-4 shadow-sm">
                <BookOpen size={13} className="text-[#ffae00]" />
                <span>ARTICLES & THOUGHTS</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#1a1a1a] dark:text-[#fbf9ef] leading-[1.05]">
                Insights on code, design & <span className="text-[#5f1cfc]">systems</span>.
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#1a1a18] border border-[rgba(26,26,26,0.1)] dark:border-[rgba(251,249,239,0.12)] text-xs font-bold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#fbf9ef] transition-all shadow-sm shrink-0"
            >
              <span>View All Articles</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>

        {/* Real Blogs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog, idx) => (
            <FadeIn key={blog.id || blog.slug} delay={idx * 0.1}>
              <Link href={`/blog/${blog.slug}`} className="block h-full group">
                <article className="bento-card p-6 sm:p-8 bg-white dark:bg-[#1a1a18] h-full flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#5f1cfc] bg-[#5f1cfc]/10 px-2.5 py-1 rounded-md">
                        {blog.category?.name || "Article"}
                      </span>
                      {blog.featured && (
                        <span className="text-[11px] font-bold text-[#b37700] dark:text-[#ffae00] bg-[#ffae00]/15 px-2 py-0.5 rounded-full">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1a1a1a] dark:text-[#fbf9ef] mb-3 group-hover:text-[#5f1cfc] transition-colors leading-snug">
                      {blog.title}
                    </h3>

                    {blog.excerpt && (
                      <p className="text-xs sm:text-sm text-[#555550] dark:text-[#c5c4b8] leading-relaxed mb-6 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)] flex items-center justify-between text-xs text-[#888880]">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                        <Calendar size={12} />
                        {formatBlogDate(blog.publishedAt || blog.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                        <Clock size={12} />
                        {blog.readingTime || 5} min
                      </span>
                    </div>

                    <span className="font-semibold text-[#5f1cfc] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read →
                    </span>
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
