import { MetadataRoute } from "next";
import { getPublishedProjects } from "@/actions/project.actions";
import { getPublishedBlogs } from "@/actions/blog.actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Dynamic routes from domain services
  const projects = await getPublishedProjects();
  const blogs = await getPublishedBlogs();

  const projectUrls: MetadataRoute.Sitemap = projects.map((p: any) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogUrls: MetadataRoute.Sitemap = blogs.map((b: any) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...projectUrls, ...blogUrls];
}
