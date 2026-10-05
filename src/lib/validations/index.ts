import { z } from "zod";

// ============================================
// AUTH
// ============================================

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ============================================
// CONTACT
// ============================================

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ============================================
// PROJECT
// ============================================

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  architecture: z.string().optional(),
  challenges: z.string().optional(),
  lessons: z.string().optional(),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  blogSlug: z.string().optional(),
  videoUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  categoryId: z.string().optional(),
  order: z.number().int().default(0),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// ============================================
// BLOG
// ============================================

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional(),
  readingTime: z.number().int().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).default([]),
});

export type BlogFormData = z.infer<typeof blogSchema>;

// ============================================
// SKILL
// ============================================

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().optional(),
  proficiency: z.number().int().min(0).max(100).default(80),
  category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "TOOLS"]),
  order: z.number().int().default(0),
});

export type SkillFormData = z.infer<typeof skillSchema>;

// ============================================
// EXPERIENCE
// ============================================

export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  current: z.boolean().default(false),
  order: z.number().int().default(0),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

// ============================================
// EDUCATION
// ============================================

export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().default(0),
});

export type EducationFormData = z.infer<typeof educationSchema>;

// ============================================
// CERTIFICATE
// ============================================

export const certificateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  credentialUrl: z.string().url().optional().or(z.literal("")),
  image: z.string().optional(),
  order: z.number().int().default(0),
});

export type CertificateFormData = z.infer<typeof certificateSchema>;

// ============================================
// SETTINGS
// ============================================

export const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteDescription: z.string().optional(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  aboutText: z.string().optional(),
  resumeUrl: z.string().optional(),
  profileImage: z.string().optional(),
  analyticsId: z.string().optional(),

  // Contact Information
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  availability: z.string().optional(),
  responseTime: z.string().optional(),

  // Social Information
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  youtubeUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

// ============================================
// CONTACT & SOCIAL SCHEMA
// ============================================

export const contactSocialSchema = z.object({
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  availability: z.string().optional(),
  responseTime: z.string().optional(),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  youtubeUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type ContactSocialFormData = z.infer<typeof contactSocialSchema>;

// ============================================
// SOCIAL LINK
// ============================================

export const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform name is required"),
  url: z.string().url("Please enter a valid URL"),
  icon: z.string().optional(),
  order: z.number().int().default(0),
});

export type SocialLinkFormData = z.infer<typeof socialLinkSchema>;

