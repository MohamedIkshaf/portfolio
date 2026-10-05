"use client";

import { useState } from "react";
import { Eye, Edit3, Bold, Italic, Code, List, Heading2 } from "lucide-react";

interface MDXEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function MDXEditor({
  value,
  onChange,
  placeholder = "Write Markdown or MDX content here...",
}: MDXEditorProps) {
  const [tab, setTab] = useState<"write" | "preview">("write");

  const insertFormatting = (prefix: string, suffix = "") => {
    onChange(`${value}${prefix}sample${suffix}`);
  };

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-50 text-xs">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertFormatting("**", "**")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900"
            title="Bold"
          >
            <Bold size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900"
            title="Italic"
          >
            <Italic size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n## ")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900"
            title="Heading"
          >
            <Heading2 size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n- ")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900"
            title="List"
          >
            <List size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("```typescript\n", "\n```")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900"
            title="Code block"
          >
            <Code size={14} />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-slate-200 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setTab("write")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
              tab === "write"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Edit3 size={12} /> Write
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
              tab === "preview"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye size={12} /> Preview
          </button>
        </div>
      </div>

      {/* Content Body */}
      {tab === "write" ? (
        <textarea
          rows={10}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 bg-white text-slate-900 text-sm font-mono focus:outline-none resize-none"
        />
      ) : (
        <div className="p-4 min-h-[220px] prose max-w-none text-sm leading-relaxed text-slate-700 bg-white">
          {value ? (
            value.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-bold mt-4 mb-2 text-slate-900">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-semibold mt-3 mb-2 text-slate-900">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="ml-4 list-disc text-slate-700">
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.trim() === "") return <br key={i} />;
              return <p key={i} className="mb-2">{line}</p>;
            })
          ) : (
            <p className="text-slate-400 italic">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
