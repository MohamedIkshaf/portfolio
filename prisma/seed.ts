import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // ---- Admin User ----
  const adminEmail = process.env.ADMIN_EMAIL || "admin@portfolio.dev";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin",
      hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user: ${admin.email}`);

  // ---- Site Settings ----
  await prisma.settings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Developer Portfolio",
      siteDescription:
        "Full Stack Developer Portfolio — Building modern web applications with cutting-edge technologies.",
      heroTitle: "Hi, I'm a Full Stack Developer",
      heroSubtitle: "Associate Software Engineer",
      aboutText:
        "Passionate software engineer with experience building modern web applications. I specialize in React, Next.js, TypeScript, and Node.js. I love creating elegant solutions to complex problems and am always eager to learn new technologies.",
    },
  });
  console.log("✅ Site settings");

  // ---- Social Links ----
  const socialLinks = [
    { platform: "GITHUB", url: "https://github.com", icon: "GitBranch", order: 1 },
    { platform: "LINKEDIN", url: "https://linkedin.com", icon: "Globe", order: 2 },
    { platform: "EMAIL", url: "mailto:hello@example.com", icon: "Mail", order: 3 },
    { platform: "LEETCODE", url: "https://leetcode.com", icon: "Code2", order: 4 },
    { platform: "HACKERRANK", url: "https://hackerrank.com", icon: "Terminal", order: 5 },
  ];

  for (const link of socialLinks) {
    await prisma.socialLink.upsert({
      where: { id: link.platform.toLowerCase() },
      update: { url: link.url, icon: link.icon, order: link.order },
      create: { id: link.platform.toLowerCase(), ...link },
    });
  }
  console.log("✅ Social links");

  // ---- Categories ----
  const categories = [
    { name: "Full Stack", slug: "full-stack", type: "PROJECT" as const },
    { name: "Frontend", slug: "frontend", type: "PROJECT" as const },
    { name: "Backend", slug: "backend", type: "PROJECT" as const },
    { name: "Mobile", slug: "mobile", type: "PROJECT" as const },
    { name: "Tutorial", slug: "tutorial", type: "BLOG" as const },
    { name: "Guide", slug: "guide", type: "BLOG" as const },
    { name: "Case Study", slug: "case-study", type: "BLOG" as const },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Categories");

  // ---- Tags ----
  const tags = [
    "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
    "Prisma", "Tailwind CSS", "Docker", "CI/CD", "API Design",
    "Authentication", "Performance", "SEO", "Testing", "DevOps",
  ];

  for (const tagName of tags) {
    const slug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name: tagName, slug },
    });
  }
  console.log("✅ Tags");

  // ---- Skills ----
  const skills = [
    { name: "React", icon: "react", proficiency: 90, category: "FRONTEND" as const, order: 1 },
    { name: "Next.js", icon: "nextjs", proficiency: 85, category: "FRONTEND" as const, order: 2 },
    { name: "TypeScript", icon: "typescript", proficiency: 85, category: "FRONTEND" as const, order: 3 },
    { name: "Tailwind CSS", icon: "tailwind", proficiency: 90, category: "FRONTEND" as const, order: 4 },
    { name: "Node.js", icon: "nodejs", proficiency: 85, category: "BACKEND" as const, order: 1 },
    { name: "Express", icon: "express", proficiency: 80, category: "BACKEND" as const, order: 2 },
    { name: "NestJS", icon: "nestjs", proficiency: 70, category: "BACKEND" as const, order: 3 },
    { name: "PostgreSQL", icon: "postgresql", proficiency: 80, category: "DATABASE" as const, order: 1 },
    { name: "MongoDB", icon: "mongodb", proficiency: 75, category: "DATABASE" as const, order: 2 },
    { name: "Prisma", icon: "prisma", proficiency: 85, category: "DATABASE" as const, order: 3 },
    { name: "Docker", icon: "docker", proficiency: 65, category: "DEVOPS" as const, order: 1 },
    { name: "GitHub Actions", icon: "github-actions", proficiency: 70, category: "DEVOPS" as const, order: 2 },
    { name: "Vercel", icon: "vercel", proficiency: 85, category: "DEVOPS" as const, order: 3 },
    { name: "Git", icon: "git", proficiency: 85, category: "TOOLS" as const, order: 1 },
    { name: "VS Code", icon: "vscode", proficiency: 90, category: "TOOLS" as const, order: 2 },
    { name: "Figma", icon: "figma", proficiency: 60, category: "TOOLS" as const, order: 3 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log("✅ Skills");

  // ---- Experience ----
  await prisma.experience.create({
    data: {
      title: "Associate Software Engineer",
      company: "Your Company",
      location: "Remote",
      startDate: new Date("2024-01-01"),
      description:
        "Building and maintaining web applications using React, Next.js, TypeScript, and Node.js.",
      current: true,
      order: 1,
    },
  });
  console.log("✅ Experience");

  // ---- Education ----
  await prisma.education.create({
    data: {
      degree: "Bachelor of Science in Computer Science",
      institution: "Your University",
      location: "Your City",
      startDate: new Date("2020-09-01"),
      endDate: new Date("2024-06-01"),
      description: "Focused on software engineering, data structures, algorithms, and web technologies.",
      order: 1,
    },
  });
  console.log("✅ Education");

  // ---- Sample Project ----
  const fullStackCat = await prisma.category.findUnique({
    where: { slug: "full-stack" },
  });

  await prisma.project.create({
    data: {
      title: "E-Commerce Platform",
      slug: "ecommerce-platform",
      description:
        "A modern full-stack e-commerce platform built with Next.js, featuring real-time inventory management, payment processing, and an admin dashboard.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Stripe"],
      features: [
        "Product catalog with search and filtering",
        "Shopping cart and checkout",
        "Payment processing",
        "Admin dashboard",
        "Real-time inventory",
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      status: "PUBLISHED",
      featured: true,
      categoryId: fullStackCat?.id,
      order: 1,
    },
  });
  console.log("✅ Projects");

  // ---- Sample Blog ----
  await prisma.blog.create({
    data: {
      title: "Building a Modern Portfolio with Next.js 15",
      slug: "building-modern-portfolio-nextjs-15",
      excerpt: "Learn how to create a stunning developer portfolio.",
      content: "# Building a Modern Portfolio\n\nA guide to building premium portfolios with Next.js.",
      readingTime: 8,
      published: true,
      featured: true,
    },
  });
  console.log("✅ Blogs");

  // ---- Certificate ----
  await prisma.certificate.create({
    data: {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueDate: new Date("2024-06-01"),
      credentialUrl: "https://aws.amazon.com/certification/",
      order: 1,
    },
  });
  console.log("✅ Certificates");

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
