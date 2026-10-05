/**
 * Site-wide constants and configuration.
 * Centralized place for all hardcoded values.
 */

export const siteConfig = {
  name: "Portfolio",
  description:
    "Full Stack Developer Portfolio — Showcasing projects, skills, and experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og/default.png",
  author: {
    name: "Developer",
    role: "Associate Software Engineer",
    email: "hello@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    leetcode: "https://leetcode.com",
    hackerrank: "https://hackerrank.com",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const adminNavLinks = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Projects", href: "/dashboard/projects", icon: "FolderKanban" },
  { label: "Blogs", href: "/dashboard/blogs", icon: "FileText" },
  { label: "Skills", href: "/dashboard/skills", icon: "Zap" },
  { label: "Experience", href: "/dashboard/experience", icon: "Briefcase" },
  { label: "Education", href: "/dashboard/education", icon: "GraduationCap" },
  {
    label: "Certificates",
    href: "/dashboard/certificates",
    icon: "Award",
  },
  { label: "Messages", href: "/dashboard/messages", icon: "MessageSquare" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;

export const skillCategories = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "DEVOPS",
  "TOOLS",
] as const;

export const projectStatuses = ["DRAFT", "PUBLISHED"] as const;

export const socialPlatforms = [
  "GITHUB",
  "LINKEDIN",
  "EMAIL",
  "LEETCODE",
  "HACKERRANK",
  "TWITTER",
  "YOUTUBE",
  "WEBSITE",
] as const;
