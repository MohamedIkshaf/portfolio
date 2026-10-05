"use client";

import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function GlobalSearch({
  value,
  onChange,
  placeholder = "Search projects, articles, skills...",
}: SearchProps) {
  return (
    <div className="relative max-w-md w-full">
      <SearchIcon
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
      />
    </div>
  );
}
