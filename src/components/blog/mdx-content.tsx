import React from "react";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  if (!content) return <p className="text-text-secondary">No content available.</p>;

  return (
    <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
      {content.split("\n").map((line, i) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={i} className="text-3xl font-extrabold text-text-primary mt-8 mb-4">
              {line.replace("# ", "")}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          const text = line.replace("## ", "");
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <h2 id={id} key={i} className="text-2xl font-bold text-text-primary mt-8 mb-3 scroll-mt-24">
              {text}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="text-xl font-semibold text-text-primary mt-6 mb-2">
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={i} className="ml-4 list-disc text-text-secondary">
              {line.replace("- ", "")}
            </li>
          );
        }
        if (line.trim() === "") return null;
        return (
          <p key={i} className="text-text-secondary">
            {line}
          </p>
        );
      })}
    </div>
  );
}
