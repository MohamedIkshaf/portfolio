"use client";

interface Heading {
  id: string;
  text: string;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (!headings || headings.length === 0) return null;

  return (
    <nav className="p-4 rounded-xl glass border border-border-subtle mb-8">
      <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-3">
        Table of Contents
      </p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-text-secondary hover:text-brand-400 transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
