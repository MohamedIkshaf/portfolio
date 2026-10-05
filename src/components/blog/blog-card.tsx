import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: number;
  createdAt: Date | string;
  featured?: boolean;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  readingTime,
  createdAt,
  featured,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="relative h-full rounded-2xl glass p-6 transition-all hover:shadow-glow-sm hover:-translate-y-1 border border-border-subtle">
        <div className="relative z-10 flex flex-col h-full">
          {featured && (
            <span className="self-start inline-flex items-center gap-1 text-xs font-medium text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-full mb-4">
              ⭐ Featured
            </span>
          )}

          <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:gradient-text transition-all line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-text-secondary mb-6 line-clamp-3 flex-1">
            {excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-text-tertiary">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} />
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              {readingTime} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
