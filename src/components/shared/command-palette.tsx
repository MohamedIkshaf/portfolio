"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, FolderKanban, FileText, User, Mail, Home, Sparkles } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle open on ⌘K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-3xl border border-[rgba(26,26,26,0.1)] dark:border-[rgba(251,249,239,0.12)] bg-white dark:bg-[#1a1a18] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <Command className="w-full">
          <div className="flex items-center border-b border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] px-4">
            <Search className="mr-3 h-4 w-4 text-[#888880] shrink-0" />
            <Command.Input
              placeholder="Search sections or jump to page... (Esc to exit)"
              className="w-full bg-transparent py-4 text-sm text-[#1a1a1a] dark:text-[#fbf9ef] placeholder:text-[#888880] focus:outline-none"
            />
          </div>

          <Command.List className="max-h-[320px] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-xs text-[#888880]">
              No matching pages or sections found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-[11px] font-bold tracking-wider uppercase text-[#888880] px-3 py-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#f5f4ea] dark:hover:bg-[#242420] cursor-pointer"
              >
                <Home size={16} className="text-[#5f1cfc]" /> Home Overview
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#about"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#f5f4ea] dark:hover:bg-[#242420] cursor-pointer"
              >
                <User size={16} className="text-[#ffae00]" /> About & Experience
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/projects"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#f5f4ea] dark:hover:bg-[#242420] cursor-pointer"
              >
                <FolderKanban size={16} className="text-[#5f1cfc]" /> Projects Portfolio
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/blog"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#f5f4ea] dark:hover:bg-[#242420] cursor-pointer"
              >
                <FileText size={16} className="text-[#22c55e]" /> Technical Articles
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/contact"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a1a] dark:text-[#fbf9ef] hover:bg-[#f5f4ea] dark:hover:bg-[#242420] cursor-pointer"
              >
                <Mail size={16} className="text-[#ff352e]" /> Book a Call / Contact
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-t border-[rgba(26,26,26,0.08)] dark:border-[rgba(251,249,239,0.1)] py-2.5 px-4 flex items-center justify-between text-[11px] text-[#888880] bg-[#fbf9ef]/50 dark:bg-[#161614]">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#242420] border text-[10px] font-mono">↑↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#242420] border text-[10px] font-mono">ESC</kbd>
              <span>to exit</span>
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
