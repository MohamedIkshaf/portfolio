import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Globe } from "lucide-react";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/actions/blog.actions";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Post Not Found" };

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  return (
    <div className="min-h-screen pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {blog.title}
          </h1>
          <p className="text-lg text-text-secondary mb-6">{blog.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(blog.createdAt))}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {blog.readingTime} min read
            </span>
          </div>

          <div className="mt-6 h-px bg-border-subtle" />
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {blog.content ? (
            blog.content.split("\n").map((line, i) => {
              if (line.startsWith("# ")) {
                return (
                  <h1 key={i} className="text-3xl font-bold mt-10 mb-4 text-text-primary">
                    {line.replace("# ", "")}
                  </h1>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-text-primary">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-semibold mt-8 mb-3 text-text-primary">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="text-text-secondary ml-4 mb-1">
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.trim() === "") return <br key={i} />;
              return (
                <p key={i} className="text-text-secondary leading-relaxed mb-4">
                  {line}
                </p>
              );
            })
          ) : (
            <p className="text-text-secondary">No content provided.</p>
          )}
        </div>

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-border-subtle">
          <p className="text-sm font-medium text-text-secondary mb-3">
            Share this article
          </p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-all"
              aria-label="Share on Twitter"
            >
              <Share2 size={18} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-all"
              aria-label="Share on LinkedIn"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
