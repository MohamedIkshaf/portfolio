export type Role = "ADMIN" | "USER";

export type ProjectStatus = "DRAFT" | "PUBLISHED";

export type CategoryType = "PROJECT" | "BLOG";

export type SkillCategory =
  | "FRONTEND"
  | "BACKEND"
  | "DATABASE"
  | "DEVOPS"
  | "TOOLS";

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  coverImage?: string | null;
  gallery: string[];
  techStack: string[];
  features: string[];
  architecture?: string | null;
  challenges?: string | null;
  lessons?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  videoUrl?: string | null;
  status: ProjectStatus;
  featured: boolean;
  categoryId?: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  readingTime: number;
  published: boolean;
  featured: boolean;
  categoryId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  icon?: string | null;
  proficiency: number;
  category: SkillCategory;
  order: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string | null;
  startDate: Date;
  endDate?: Date | null;
  description?: string | null;
  current: boolean;
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string | null;
  startDate: Date;
  endDate?: Date | null;
  description?: string | null;
  order: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date | null;
  credentialUrl?: string | null;
  image?: string | null;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface Settings {
  id: string;
  siteName: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  resumeUrl?: string | null;
  profileImage?: string | null;
  analyticsId?: string | null;
}
