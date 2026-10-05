import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Sparkles, ArrowUpRight } from "lucide-react";
import { getPublishedBlogs } from "@/actions/blog.actions";

export const metadata: Metadata = {
  title: "Blog & Articles",
  description:
    "Articles about web development, software engineering, and technology.",
};

function formatBlogDate(dateStr: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

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
            <span>WRITING & ESSAYS</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl tracking-tight text-[#1a1a1a] dark:text-[#fbf9ef] mb-4">
            Technical <span className="text-[#5f1cfc]">Articles</span>.
          </h1>
          <p className="text-base sm:text-lg text-[#555550] dark:text-[#c5c4b8] max-w-2xl leading-relaxed">
            Thoughts, tutorials, and practical insights on web performance, TypeScript patterns, and cloud architecture.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog: any) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block h-full">
              <article className="bento-card p-6 sm:p-7 bg-white dark:bg-[#1a1a18] h-full flex flex-col justify-between hover:-translate-y-1.5 transition-transform duration-300">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#888880] mb-4">
                    <span className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Calendar size={13} />
                      {formatBlogDate(blog.publishedAt || blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Clock size={13} />
                      {blog.readingTime || 5} min read
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#1a1a1a] dark:text-[#fbf9ef] mb-3 group-hover:text-[#5f1cfc] transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555550] dark:text-[#c5c4b8] line-clamp-3 mb-6 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(26,26,26,0.06)] dark:border-[rgba(251,249,239,0.06)] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags && blog.tags.length > 0 ? (
                      blog.tags.map((t: any) => (
                        <span
                          key={t.id || t.name}
                          className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-[#fbf9ef] dark:bg-[#242420] text-[#555550] dark:text-[#c5c4b8]"
                        >
                          #{t.name}
                        </span>
                      ))
                    ) : (
                      <span className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-[#fbf9ef] dark:bg-[#242420] text-[#888880]">
                        #Article
                      </span>
                    )}
                  </div>

                  <span className="font-semibold text-xs text-[#5f1cfc] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>Read</span>
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </article>
            </Link>
          ))}

          {blogs.length === 0 && (
            <p className="text-sm text-[#888880] col-span-full py-16 text-center">
              No blog articles published yet. Check back soon!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
